import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import Navigation from "./Components/Navigation/Navigation.jsx";
import Home from "./Pages/Home/home.jsx";
import Journal from "./Pages/Journal/Journal.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import Ascension from "./Pages/Ascensions/Ascension.jsx";
import Auth from "./Pages/Auth/Auth.jsx";

function App() {
  const [session, setSession] = useState(null);
  const [ascensions, setAscensions] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);
  const [userStats, setUserStats] = useState({ coins: 100, diamonds: 20, exp: 0, level: 1 });
  const [dailyActivity, setDailyActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch data when session exists
  useEffect(() => {
    if (session) {
      fetchAscensions();
      fetchJournalEntries();
      fetchUserStats();
      fetchDailyActivity();
    } else {
      setAscensions([]);
      setJournalEntries([]);
      setUserStats({ coins: 100, diamonds: 20, exp: 0, level: 1 });
      setDailyActivity([]);
    }
  }, [session]);

  const fetchDailyActivity = async () => {
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);

    const { data, error } = await supabase
      .from('daily_activity')
      .select('activity_date, completed_tasks')
      .gte('activity_date', lastWeek.toISOString().split('T')[0]);

    if (error) {
      console.error('Error fetching activity:', error);
    } else {
      setDailyActivity(data);
    }
  };

  const fetchUserStats = async () => {
    const { data, error } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', session.user.id)
      .single();

    if (error && error.code === 'PGRST116') {
      // Stats don't exist yet, create them
      const { data: newData, error: insertError } = await supabase
        .from('user_stats')
        .insert([{ user_id: session.user.id }])
        .select()
        .single();
      
      if (!insertError && newData) {
        setUserStats(newData);
      }
    } else if (data) {
      setUserStats(data);
    }
  };

  const fetchAscensions = async () => {
    const { data, error } = await supabase
      .from('ascensions')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (error) {
      console.error('Error fetching ascensions:', error);
    } else {
      setAscensions(data);
    }
  };

  const fetchJournalEntries = async () => {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching journal entries:', error);
    } else {
      setJournalEntries(data);
    }
  };

  const addAscension = async (newAscension) => {
      if (!session) return;

      // Optimistic update (update UI immediately)
      const tempId = Date.now();
      const tempAscension = { ...newAscension, id: tempId, user_id: session.user.id };
      setAscensions([...ascensions, tempAscension]);

      // Insert into Supabase
      const { data, error } = await supabase
        .from('ascensions')
        .insert([
          { 
            title: newAscension.title, 
            coins: newAscension.coins, 
            diamonds: newAscension.diamonds, 
            exp: newAscension.exp,
            is_completed: false,
            user_id: session.user.id
          }
        ])
        .select();

      if (error) {
        console.error('Error adding ascension:', error);
        alert(`Error adding ascension: ${error.message}`);
        // Revert optimistic update if error
        setAscensions(ascensions);
      } else {
        // Replace temp item with real item from DB (to get the real ID)
        setAscensions(prev => prev.map(item => item.id === tempId ? data[0] : item));
      }
  };

  const deleteAscension = async (idToDelete) => {
      // Optimistic update
      const previousAscensions = [...ascensions];
      setAscensions(ascensions.filter((item) => item.id !== idToDelete));

      const { error } = await supabase
        .from('ascensions')
        .delete()
        .eq('id', idToDelete);

      if (error) {
        console.error('Error deleting ascension:', error);
        setAscensions(previousAscensions);
      }
  };

  const toggleAscensionComplete = async (id, isCompleted) => {
      // Find the ascension to get its rewards
      const ascension = ascensions.find(a => a.id === id);
      if (!ascension) return;

      // Calculate multiplier: if currently completed (true), we are unchecking (-1). If false, checking (+1).
      const multiplier = isCompleted ? -1 : 1;
      
      const newStats = {
          ...userStats,
          coins: Math.max(0, userStats.coins + (ascension.coins * multiplier)),
          diamonds: Math.max(0, userStats.diamonds + (ascension.diamonds * multiplier)),
          exp: Math.max(0, userStats.exp + (ascension.exp * multiplier))
      };

      // Optimistic update for Ascensions
      setAscensions(ascensions.map(item => 
        item.id === id ? { ...item, is_completed: !isCompleted } : item
      ));

      // Optimistic update for Stats
      setUserStats(newStats);

      // Update Ascension in DB
      const { error: ascError } = await supabase
        .from('ascensions')
        .update({ is_completed: !isCompleted })
        .eq('id', id);

      // Update Stats in DB
      const { error: statsError } = await supabase
        .from('user_stats')
        .update({ 
            coins: newStats.coins,
            diamonds: newStats.diamonds,
            exp: newStats.exp
        })
        .eq('user_id', session.user.id);

      // Update Daily Activity (Streak)
      const today = new Date().toISOString().split('T')[0];
      
      // Fetch current activity for today to update tasks list
      const { data: currentActivity } = await supabase
        .from('daily_activity')
        .select('completed_tasks')
        .eq('user_id', session.user.id)
        .eq('activity_date', today)
        .single();

      let currentTasks = currentActivity?.completed_tasks || [];

      if (!isCompleted) { // Marking as COMPLETE
          if (!currentTasks.some(t => t.id === id)) {
             currentTasks.push({ id: ascension.id, title: ascension.title, coins: ascension.coins, exp: ascension.exp });
          }
      } else { // Marking as INCOMPLETE
          currentTasks = currentTasks.filter(t => t.id !== id);
      }

      if (currentTasks.length > 0) {
          const { error } = await supabase
            .from('daily_activity')
            .upsert({ 
                user_id: session.user.id, 
                activity_date: today,
                completed_tasks: currentTasks
            });
          if (error) console.error('Error updating activity:', error);
          
          // Update local state
          setDailyActivity(prev => {
              const otherDays = prev.filter(d => d.activity_date !== today);
              return [...otherDays, { activity_date: today, completed_tasks: currentTasks }];
          });
      } else {
          // Remove streak if no tasks
          const { error } = await supabase
            .from('daily_activity')
            .delete()
            .eq('user_id', session.user.id)
            .eq('activity_date', today);
          if (error) console.error('Error deleting activity:', error);

          // Update local state
          setDailyActivity(prev => prev.filter(d => d.activity_date !== today));
      }

      if (ascError || statsError) {
        console.error('Error updating:', ascError || statsError);
        alert(`Update failed: ${(ascError?.message || statsError?.message)}`);
        // Revert optimistic updates
        setAscensions(ascensions.map(item => 
            item.id === id ? { ...item, is_completed: isCompleted } : item
        ));
        setUserStats(userStats);
      }
  };

  const addJournalEntry = async (text) => {
    if (!session) return;

    const tempId = Date.now();
    const newEntry = { id: tempId, content: text, created_at: new Date().toISOString(), user_id: session.user.id };
    setJournalEntries([newEntry, ...journalEntries]);

    const { data, error } = await supabase
      .from('journal_entries')
      .insert([{ content: text, user_id: session.user.id }])
      .select();

    if (error) {
      console.error('Error adding journal entry:', error);
      setJournalEntries(journalEntries);
    } else {
      setJournalEntries(prev => prev.map(e => e.id === tempId ? data[0] : e));
    }
  };

  const deleteJournalEntry = async (id) => {
    const prevEntries = [...journalEntries];
    setJournalEntries(journalEntries.filter(e => e.id !== id));

    const { error } = await supabase
      .from('journal_entries')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting journal entry:', error);
      setJournalEntries(prevEntries);
    }
  };

  const updateJournalEntry = async (id, text) => {
    const prevEntries = [...journalEntries];
    setJournalEntries(journalEntries.map(e => e.id === id ? { ...e, content: text } : e));

    const { error } = await supabase
      .from('journal_entries')
      .update({ content: text })
      .eq('id', id);

    if (error) {
      console.error('Error updating journal entry:', error);
      setJournalEntries(prevEntries);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-[#121212] text-white">Loading...</div>;
  }

  return (
    <BrowserRouter>
      {!session ? (
        <Auth />
      ) : (
        <>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home ascensions={ascensions} onDelete={deleteAscension} onToggle={toggleAscensionComplete} userStats={userStats} dailyActivity={dailyActivity} />} />
            <Route 
              path="/ascensions" 
              element={
                <Ascension 
                  ascensions={ascensions} 
                  onAdd={addAscension} 
                  onDelete={deleteAscension} 
                  onToggle={toggleAscensionComplete}
                />
              } 
            />
            <Route 
              path="/journal" 
              element={
                <Journal 
                  entries={journalEntries} 
                  onAdd={addJournalEntry} 
                  onDelete={deleteJournalEntry} 
                  onUpdate={updateJournalEntry}
                />
              } 
            />
            <Route path="/profile" element={<Profile session={session} userStats={userStats} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;

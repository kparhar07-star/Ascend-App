import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarDay from '../../Components/CalendarDay/CalendarDay';
import JournalInput from '../../Components/JournalInput/JournalInput';
import AscensionItem from '../../Components/AscensionItem/AscensionItem';
import UserStats from '../../Components/UserStats/UserStats';
import addImg from '../../assets/add.png';
import './home.css';

export default function Home({ ascensions, onDelete, onToggle, dailyActivity, userStats }) {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Generate current week days
  const getWeekDays = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 (Sun) - 6 (Sat)
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - currentDay); // Go back to Sunday

    const days = [];
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const dateString = date.toISOString().split('T')[0];
      const isToday = date.toDateString() === today.toDateString();
      const activity = dailyActivity?.find(a => a.activity_date === dateString);
      
      days.push({
        day: dayNames[i],
        date: date.getDate().toString(),
        fullDate: dateString,
        isToday: isToday,
        hasStreak: !!activity,
        tasks: activity?.completed_tasks || []
      });
    }
    return days;
  };

  const weekDays = getWeekDays();

  const handleDayClick = (day) => {
    if (selectedDay?.fullDate === day.fullDate) {
      setSelectedDay(null); // Deselect if clicking same day
    } else {
      setSelectedDay(day);
    }
  };

  const calculateRewards = (tasks) => {
    return tasks.reduce((acc, task) => ({
      coins: acc.coins + (task.coins || 0),
      diamonds: acc.diamonds + (task.diamonds || 0),
      exp: acc.exp + (task.exp || 0)
    }), { coins: 0, diamonds: 0, exp: 0 });
  };

  const selectedRewards = selectedDay ? calculateRewards(selectedDay.tasks) : null;

  return (
    <div className="home-container">
      <div className="home-content">
        {/* Header Section */}
        <div className="home-section">
          <div className="home-header flex justify-between items-center w-full">
            <h1 className="home-greeting">Hello Again!</h1>
          </div>
          <UserStats userStats={userStats} />
          
          {/* Streak Calendar */}
          <div className="streak-calendar">
            {weekDays.map((day, index) => (
              <div key={index} onClick={() => handleDayClick(day)} className="cursor-pointer transition-transform hover:scale-105">
                <CalendarDay 
                  day={day.day}
                  date={day.date}
                  hasStreak={day.hasStreak}
                  isToday={day.isToday}
                  isSelected={selectedDay?.fullDate === day.fullDate}
                />
              </div>
            ))}
          </div>

          {/* Rewards Summary Section */}
          {selectedDay && (
            <div className="w-full mt-4 px-2 animate-fade-in">
              <h3 className="text-white text-lg font-medium mb-3">Your Rewards:</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.8666 8.74219C12.2817 8.09108 12.5015 7.33466 12.5 6.5625C12.5 4.31875 10.6813 2.5 8.43753 2.5C7.63534 2.5 6.88753 2.7325 6.25784 3.13344C5.8388 3.15708 5.42403 3.2303 5.02222 3.35156C5.32742 3.02668 5.6774 2.74698 6.06159 2.52094C6.77688 2.09946 7.59168 1.87647 8.4219 1.875H8.43753C11.0263 1.875 13.125 3.97375 13.125 6.5625C13.125 6.60458 13.1245 6.64656 13.1235 6.68844L13.1228 6.70344C13.1008 7.4909 12.8793 8.25989 12.4791 8.93844C12.253 9.32263 11.9734 9.67261 11.6485 9.97781C11.7675 9.58313 11.8425 9.16937 11.8666 8.74219Z" fill="#FFB411"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.05375 7.08344C7.96759 6.83967 7.80796 6.62862 7.59685 6.47935C7.38574 6.33009 7.13355 6.24996 6.875 6.25V5.9375H6.25V6.25C5.91848 6.25 5.60054 6.3817 5.36612 6.61612C5.1317 6.85054 5 7.16848 5 7.5C5 7.83152 5.1317 8.14946 5.36612 8.38388C5.60054 8.6183 5.91848 8.75 6.25 8.75V10C5.97812 10 5.74656 9.82656 5.66031 9.58344C5.64752 9.54366 5.62687 9.50685 5.5996 9.4752C5.57233 9.44354 5.53899 9.41767 5.50155 9.39912C5.46411 9.38057 5.42333 9.36972 5.38162 9.36721C5.33991 9.36469 5.29812 9.37057 5.25872 9.38449C5.21933 9.39841 5.18312 9.42009 5.15225 9.44825C5.12137 9.4764 5.09646 9.51047 5.07898 9.54842C5.0615 9.58637 5.05181 9.62744 5.05049 9.66921C5.04916 9.71097 5.05622 9.75258 5.07125 9.79156C5.15741 10.0353 5.31704 10.2464 5.52815 10.3956C5.73926 10.5449 5.99145 10.625 6.25 10.625V10.9375H6.875V10.625C7.20652 10.625 7.52446 10.4933 7.75888 10.2589C7.9933 10.0245 8.125 9.70652 8.125 9.375C8.125 9.04348 7.9933 8.72554 7.75888 8.49112C7.52446 8.2567 7.20652 8.125 6.875 8.125V6.875C7.14687 6.875 7.37844 7.04844 7.46469 7.29156C7.47748 7.33134 7.49813 7.36815 7.5254 7.3998C7.55267 7.43146 7.58601 7.45733 7.62345 7.47588C7.66089 7.49443 7.70167 7.50528 7.74338 7.50779C7.78509 7.51031 7.82688 7.50443 7.86628 7.49051C7.90567 7.47659 7.94188 7.45491 7.97275 7.42675C8.00363 7.3986 8.02854 7.36453 8.04602 7.32658C8.0635 7.28863 8.07319 7.24756 8.07451 7.20579C8.07584 7.16403 8.06878 7.12242 8.05375 7.08344ZM6.25 6.875C6.08424 6.875 5.92527 6.94085 5.80806 7.05806C5.69085 7.17527 5.625 7.33424 5.625 7.5C5.625 7.66576 5.69085 7.82473 5.80806 7.94194C5.92527 8.05915 6.08424 8.125 6.25 8.125V6.875ZM6.875 10C7.04076 10 7.19973 9.93415 7.31694 9.81694C7.43415 9.69973 7.5 9.54076 7.5 9.375C7.5 9.20924 7.43415 9.05027 7.31694 8.93306C7.19973 8.81585 7.04076 8.75 6.875 8.75V10Z" fill="#FFB411"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.25 8.4375C11.25 11.0262 9.15125 13.125 6.5625 13.125C3.97375 13.125 1.875 11.0262 1.875 8.4375C1.875 5.84875 3.97375 3.75 6.5625 3.75C9.15125 3.75 11.25 5.84875 11.25 8.4375ZM10.625 8.4375C10.625 10.6813 8.80625 12.5 6.5625 12.5C4.31875 12.5 2.5 10.6813 2.5 8.4375C2.5 6.19375 4.31875 4.375 6.5625 4.375C8.80625 4.375 10.625 6.19375 10.625 8.4375Z" fill="#FFB411"/>
                    </svg>
                  </div>
                  <span className="text-white text-lg">{selectedRewards.coins} coins</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.2281 2.7875C3.34695 2.5595 3.52602 2.36845 3.74585 2.23512C3.96569 2.10179 4.21787 2.03128 4.47498 2.03125H10.5256C10.7827 2.03128 11.0349 2.10179 11.2547 2.23512C11.4746 2.36845 11.6536 2.5595 11.7725 2.7875L13.0919 5.31563C13.2216 5.5642 13.2742 5.84591 13.2426 6.12456C13.2111 6.40321 13.097 6.66607 12.915 6.87937L7.85685 12.8044C7.81285 12.8558 7.75822 12.8971 7.69672 12.9255C7.63522 12.9538 7.56831 12.9685 7.5006 12.9685C7.4329 12.9685 7.36599 12.9538 7.30449 12.9255C7.24299 12.8971 7.18836 12.8558 7.14435 12.8044L2.08623 6.87937C1.90409 6.66613 1.78987 6.40331 1.75824 6.12466C1.72661 5.84601 1.77902 5.56426 1.90873 5.31563L3.2281 2.7875ZM4.3406 2.98813L5.6456 5.16125L6.96248 2.96875H4.47498C4.42952 2.96907 4.38431 2.97559 4.3406 2.98813ZM6.47435 5.60188H8.52623L7.49998 3.89375L6.47435 5.60188ZM9.7056 6.53938L8.49498 10.6131L11.9725 6.53938H9.7056ZM6.5056 10.6131L5.2956 6.53938H3.0281L6.5056 10.6131ZM6.2731 6.53938L7.5006 10.6687L8.72748 6.53938H6.2731ZM11.2544 3.82062L10.1844 5.60188H12.1837L11.2544 3.82062ZM10.525 2.96875H8.03748L9.35435 5.16125L10.66 2.98813C10.6161 2.97553 10.5707 2.96901 10.525 2.96875ZM4.81623 5.60188L3.74623 3.82062L2.81685 5.60188H4.81623Z" fill="#00D0FF"/>
                    </svg>
                  </div>
                  <span className="text-white text-lg">{selectedRewards.diamonds} diamond{selectedRewards.diamonds !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center border border-white rounded-sm">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-white text-lg">{selectedRewards.exp} XP</span>
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <button 
                  onClick={() => setShowDetailsModal(true)} 
                  className="text-gray-400 text-sm hover:text-white transition-colors"
                >
                  Details
                </button>
              </div>
            </div>
          )}
          
          {/* Selected Day Tasks Modal */}
          {showDetailsModal && selectedDay && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowDetailsModal(false)}>
              <div className="bg-[#1E1E1E] p-6 rounded-2xl max-w-md w-full border border-gray-700 shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">
                    Activity for {new Date(selectedDay.fullDate).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                  </h3>
                  <button onClick={() => setShowDetailsModal(false)} className="text-gray-400 hover:text-white p-2">
                    ✕
                  </button>
                </div>
                
                {selectedDay.tasks && selectedDay.tasks.length > 0 ? (
                  <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                    {selectedDay.tasks.map((task, idx) => (
                      <div key={idx} className="bg-[#2A2A2A] p-4 rounded-xl flex justify-between items-center border border-gray-800">
                        <span className="text-white font-medium">{task.title}</span>
                        <div className="flex gap-3 text-xs text-gray-400">
                          {task.coins > 0 && <span className="flex items-center gap-1 text-yellow-400">+{task.coins} 🪙</span>}
                          {task.exp > 0 && <span className="flex items-center gap-1 text-blue-400">+{task.exp} XP</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-lg">No tasks completed.</p>
                    <p className="text-gray-600 text-sm mt-2">Rest days are important too!</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Ascensions Section */}
        <div className="home-section">
          <div className="section-header">
            <h2 className="section-title">Ascensions</h2>
            <button onClick={() => navigate('/ascensions')} className="add-button" aria-label="Add new ascension">
              <img src={addImg} alt="add" />
            </button>
          </div>

          <p className="ascension-quote">
            <span className="quote-normal">Action is the foundational key to all</span>{' '}
            <span className="quote-highlight">success</span>.
          </p>

          <div className="ascensions-list flex flex-col gap-4">
            {ascensions && ascensions.length > 0 ? (
              ascensions.map((ascension, index) => (
                <AscensionItem 
                  key={ascension.id || index} 
                  data={ascension} 
                  onDelete={() => onDelete(ascension.id)}
                  onToggle={() => onToggle(ascension.id, ascension.is_completed)}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No ascensions yet. Add one to get started!</p>
            )}
          </div>
        </div>

        {/* Journal Section */}

        <JournalInput />
      </div>
    </div>
  );
}

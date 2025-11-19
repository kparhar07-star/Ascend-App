import { useState } from 'react';
import CalendarDay from '../../Components/CalendarDay/CalendarDay';
import AscensionItem from '../../Components/AscensionItem/AscensionItem';
import './home.css';

// Image URLs from Figma
const imgCoins = "https://www.figma.com/api/mcp/asset/8c501c74-de50-4cfc-996c-1719498c5c21";
const imgDiamonds = "https://www.figma.com/api/mcp/asset/e86bfb14-14ee-4444-b68b-cc1c5fb140f9";
const imgAddIcon = "https://www.figma.com/api/mcp/asset/af134ace-722d-45e7-b83a-2cf79b91979c";
const imgPenIcon = "https://www.figma.com/api/mcp/asset/dae73ba2-1d33-416c-b465-e8bad71c80ad";

export default function Home() {
  const [ascensions, setAscensions] = useState([
    { id: 1, title: "Workout for 30 mins", completed: false },
    { id: 2, title: "Read for 15 mins", completed: false },
    { id: 3, title: "Work for 1 hour", completed: false },
    { id: 4, title: "Workout", completed: false },
  ]);

  const toggleAscension = (id) => {
    setAscensions(ascensions.map(a => 
      a.id === id ? { ...a, completed: !a.completed } : a
    ));
  };

  const weekDays = [
    { day: 'Su', date: '1', hasStreak: false, isToday: false },
    { day: 'Mo', date: '2', hasStreak: false, isToday: false },
    { day: 'Tu', date: '3', hasStreak: true, isToday: true },
    { day: 'We', date: '4', hasStreak: false, isToday: false },
    { day: 'Th', date: '5', hasStreak: false, isToday: false },
    { day: 'Fr', date: '6', hasStreak: false, isToday: false },
    { day: 'Sa', date: '7', hasStreak: false, isToday: false },
  ];

  return (
    <div className="home-container">
      <div className="home-content">
        {/* Header Section */}
        <div className="home-section">
          <div className="home-header">
            <h1 className="home-greeting">Hello Again!</h1>
          </div>

          {/* Wealth and XP Bar */}
          <div className="wealth-xp-container">
            <div className="wealth-display">
              <div className="wealth-item">
                <div className="wealth-icon">
                  <img src={imgCoins} alt="coins" />
                </div>
                <p className="wealth-value">100</p>
              </div>
              <div className="wealth-item">
                <div className="wealth-icon">
                  <img src={imgDiamonds} alt="diamonds" />
                </div>
                <p className="wealth-value">20</p>
              </div>
            </div>

            <div className="xp-bar">
              <div className="xp-progress">
                <p className="xp-text">900/1000</p>
              </div>
            </div>
          </div>

          {/* Streak Calendar */}
          <div className="streak-calendar">
            {weekDays.map((day, index) => (
              <CalendarDay 
                key={index}
                day={day.day}
                date={day.date}
                hasStreak={day.hasStreak}
                isToday={day.isToday}
              />
            ))}
          </div>
        </div>

        {/* Ascensions Section */}
        <div className="home-section">
          <div className="section-header">
            <h2 className="section-title">Ascensions</h2>
            <button className="add-button" aria-label="Add new ascension">
              <img src={imgAddIcon} alt="add" />
            </button>
          </div>

          <p className="ascension-quote">
            <span className="quote-normal">Action is the foundational key to all</span>{' '}
            <span className="quote-highlight">success</span>.
          </p>

          <div className="ascensions-list">
            {ascensions.map((ascension) => (
              <AscensionItem
                key={ascension.id}
                title={ascension.title}
                completed={ascension.completed}
                onToggle={() => toggleAscension(ascension.id)}
                onExpand={() => console.log('Expand', ascension.id)}
              />
            ))}
          </div>
        </div>

        {/* Journal Section */}
        <div className="home-section">
          <h2 className="section-title">Journal</h2>
          <button className="journal-button">
            <p className="journal-placeholder">Write about your day...</p>
            <div className="journal-icon">
              <img src={imgPenIcon} alt="write" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

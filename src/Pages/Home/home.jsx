import React, { useState } from 'react';
import './home.css';

// Image URLs from Figma
const imgCoins = "https://www.figma.com/api/mcp/asset/8c501c74-de50-4cfc-996c-1719498c5c21";
const imgDiamonds = "https://www.figma.com/api/mcp/asset/e86bfb14-14ee-4444-b68b-cc1c5fb140f9";
const imgFlame = "https://www.figma.com/api/mcp/asset/af99dedf-7567-4c23-b650-8987beb3ada4";
const imgAddIcon = "https://www.figma.com/api/mcp/asset/af134ace-722d-45e7-b83a-2cf79b91979c";
const imgArrowDown = "https://www.figma.com/api/mcp/asset/640b0cb3-cd3b-45ce-8eca-d0bf9d875693";
const imgPenIcon = "https://www.figma.com/api/mcp/asset/dae73ba2-1d33-416c-b465-e8bad71c80ad";
const imgCheckbox = "https://www.figma.com/api/mcp/asset/418834ed-eadf-4390-bb71-ea1fd331afea";

// Checkbox Component
function Checkbox({ checked = false, onChange }) {
  return (
    <button 
      className="checkbox-button" 
      onClick={onChange}
      aria-label="Toggle task completion"
    >
      <div className="checkbox-inner">
        {checked && <img src={imgCheckbox} alt="" />}
      </div>
    </button>
  );
}

// Calendar Day Component
function CalendarDay({ day, date, hasStreak = false, isToday = false }) {
  return (
    <div className={`calendar-day ${isToday ? 'calendar-day-today' : ''}`}>
      <div className="calendar-day-content">
        <p className="calendar-day-label">{day}</p>
        <p className="calendar-day-number">{date}</p>
      </div>
      {hasStreak && (
        <div className="calendar-flame">
          <img src={imgFlame} alt="streak" />
        </div>
      )}
    </div>
  );
}

// Ascension Item Component
function AscensionItem({ title, completed = false, onToggle, onExpand }) {
  return (
    <div className="ascension-item">
      <Checkbox checked={completed} onChange={onToggle} />
      <p className="ascension-title">{title}</p>
      <button 
        className="ascension-expand" 
        onClick={onExpand}
        aria-label="Expand task details"
      >
        <img src={imgArrowDown} alt="" />
      </button>
    </div>
  );
}

export default function Home() {
  const [ascensions, setAscensions] = useState([
    { id: 1, title: "Workout for 30 mins", completed: false },
    { id: 2, title: "Workout for 30 mins", completed: false },
    { id: 3, title: "Workout for 30 mins", completed: false },
    { id: 4, title: "Workout for 30 mins", completed: false },
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

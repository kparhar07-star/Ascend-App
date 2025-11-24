import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarDay from '../../Components/CalendarDay/CalendarDay';
import JournalInput from '../../Components/JournalInput/JournalInput';
import './home.css';

export default function Home() {
  const navigate = useNavigate();
  const imgCoins = "https://www.figma.com/api/mcp/asset/1a3e2f6e-4f3e-4d3e- ninety-four d3-3c4f5e6b7a8b";
  const imgDiamonds = "https://www.figma.com/api/mcp/asset/2b4c5d6e-7f8a-9b0c-d1e2-f3a4b5c6d7e8";
  const imgAddIcon = "https://www.figma.com/api/mcp/asset/3c4d5e6f-7a8b-9c0d-e1f2-a3b4c5d6e7f8";

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
            <button onClick={() => navigate('/ascensions')} className="add-button" aria-label="Add new ascension">
              <img src={imgAddIcon} alt="add" />
            </button>
          </div>

          <p className="ascension-quote">
            <span className="quote-normal">Action is the foundational key to all</span>{' '}
            <span className="quote-highlight">success</span>.
          </p>

          <div className="ascensions-list">
          </div>
        </div>

        {/* Journal Section */}

        <JournalInput />
      </div>
    </div>
  );
}

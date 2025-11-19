import styles from './CalendarDay.module.css';

const imgFlame = "https://www.figma.com/api/mcp/asset/af99dedf-7567-4c23-b650-8987beb3ada4";

function CalendarDay({ day, date, hasStreak = false, isToday = false }) {
  return (
    <div className={`${styles.calendarDay} ${isToday ? styles.calendarDayToday : ''}`}>
      <div className={styles.calendarDayContent}>
        <p className={styles.calendarDayLabel}>{day}</p>
        <p className={styles.calendarDayNumber}>{date}</p>
      </div>
      {hasStreak && (
        <div className={styles.calendarFlame}>
          <img src={imgFlame} alt="streak" />
        </div>
      )}
    </div>
  );
}

export default CalendarDay;

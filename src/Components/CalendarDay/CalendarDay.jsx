import styles from './CalendarDay.module.css';
import flame from '../../assets/flame.svg';

function CalendarDay({ day, date, hasStreak = false, isToday = false, isSelected = false }) {
  return (
    <div className={`${styles.calendarDay} ${isSelected ? styles.calendarDaySelected : ''} ${isToday && !isSelected ? styles.calendarDayToday : ''}`}>
      <div className={styles.calendarDayContent}>
        <p className={styles.calendarDayLabel}>{day}</p>
        <p className={styles.calendarDayNumber}>{date}</p>
      </div>
      {hasStreak && (
        <div className={styles.calendarFlame}>
          <img src={flame} alt="streak" />
        </div>
      )}
    </div>
  );
}

export default CalendarDay;

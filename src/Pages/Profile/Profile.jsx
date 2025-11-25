import styles from "./Profile.module.css";
import UserStats from "../../Components/UserStats/UserStats";

export default function Profile({ session, userStats }) {
  return (
    <div className={styles.profileContainer}>

      {/* --- SECTION A: HEADER --- */}
      <div className={styles.topRow}>
        <div className={styles.leftSection}>
          <div className={styles.avatar}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <UserStats userStats={userStats} />
        </div>

        <div className={styles.rightSection}>
          <div className={styles.userInfo}>
            <span className={styles.userIcon}>
              <svg width="30" height="30" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.0312 1.71875H2.96875C2.27839 1.71875 1.71875 2.27839 1.71875 2.96875V12.0312C1.71875 12.7216 2.27839 13.2812 2.96875 13.2812H12.0312C12.7216 13.2812 13.2812 12.7216 13.2812 12.0312V2.96875C13.2812 2.27839 12.7216 1.71875 12.0312 1.71875Z" stroke="#F5F5F3" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10.2344 6.09375C9.88213 6.09375 9.54432 5.95382 9.29525 5.70475C9.04618 5.45568 8.90625 5.11787 8.90625 4.76562C8.90625 4.41338 8.76632 4.07557 8.51725 3.8265C8.26818 3.57743 7.93037 3.4375 7.57812 3.4375H7.42188C7.06963 3.4375 6.73182 3.57743 6.48275 3.8265C6.23368 4.07557 6.09375 4.41338 6.09375 4.76562C6.09375 5.11787 5.95382 5.45568 5.70475 5.70475C5.45568 5.95382 5.11787 6.09375 4.76562 6.09375C4.41338 6.09375 4.07557 6.23368 3.8265 6.48275C3.57743 6.73182 3.4375 7.06963 3.4375 7.42188V7.57812C3.4375 7.93037 3.57743 8.26818 3.8265 8.51725C4.07557 8.76632 4.41338 8.90625 4.76562 8.90625C5.11787 8.90625 5.45568 9.04618 5.70475 9.29525C5.95382 9.54432 6.09375 9.88213 6.09375 10.2344C6.09375 10.5866 6.23368 10.9244 6.48275 11.1735C6.73182 11.4226 7.06963 11.5625 7.42188 11.5625H7.57812C7.93037 11.5625 8.26818 11.4226 8.51725 11.1735C8.76632 10.9244 8.90625 10.5866 8.90625 10.2344C8.90625 9.88213 9.04618 9.54432 9.29525 9.29525C9.54432 9.04618 9.88213 8.90625 10.2344 8.90625C10.5866 8.90625 10.9244 8.76632 11.1735 8.51725C11.4226 8.26818 11.5625 7.93037 11.5625 7.57812V7.42188C11.5625 7.06963 11.4226 6.73182 11.1735 6.48275C10.9244 6.23368 10.5866 6.09375 10.2344 6.09375Z" stroke="#F5F5F3" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10.4282 8.43916C10.1792 8.19009 10.0393 7.85231 10.0393 7.5001C10.0393 7.14789 10.1792 6.8101 10.4282 6.56103C10.6773 6.31197 10.8172 5.97418 10.8172 5.62197C10.8172 5.26976 10.6773 4.93198 10.4282 4.68291L10.3176 4.57228C10.0685 4.32325 9.73074 4.18335 9.37853 4.18335C9.02633 4.18335 8.68854 4.32325 8.43947 4.57228C8.31614 4.69564 8.16972 4.79349 8.00857 4.86025C7.84741 4.92701 7.67469 4.96138 7.50025 4.96138C7.32582 4.96138 7.15309 4.92701 6.99194 4.86025C6.83079 4.79349 6.68437 4.69564 6.56103 4.57228C6.31197 4.32325 5.97418 4.18335 5.62197 4.18335C5.26976 4.18335 4.93198 4.32325 4.68291 4.57228L4.57228 4.6826C4.32325 4.93166 4.18335 5.26945 4.18335 5.62166C4.18335 5.97387 4.32325 6.31166 4.57228 6.56072C4.69564 6.68405 4.79349 6.83048 4.86025 6.99163C4.92701 7.15278 4.96138 7.32551 4.96138 7.49994C4.96138 7.67437 4.92701 7.8471 4.86025 8.00825C4.79349 8.16941 4.69564 8.31583 4.57228 8.43916C4.32325 8.68823 4.18335 9.02601 4.18335 9.37822C4.18335 9.73043 4.32325 10.0682 4.57228 10.3173L4.6826 10.4279C4.93166 10.6769 5.26945 10.8168 5.62166 10.8168C5.97387 10.8168 6.31166 10.6769 6.56072 10.4279C6.68405 10.3046 6.83048 10.2067 6.99163 10.1399C7.15278 10.0732 7.32551 10.0388 7.49994 10.0388C7.67437 10.0388 7.8471 10.0732 8.00825 10.1399C8.16941 10.2067 8.31583 10.3046 8.43916 10.4279C8.68823 10.6769 9.02601 10.8168 9.37822 10.8168C9.73043 10.8168 10.0682 10.6769 10.3173 10.4279L10.4279 10.3176C10.6769 10.0685 10.8168 9.73074 10.8168 9.37853C10.8168 9.02633 10.6769 8.68854 10.4279 8.43947" stroke="#F5F5F3" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <p className={styles.username}>{session?.user?.email?.split('@')[0] || 'Steve'}</p>
          </div>
        </div>
      </div>

      {/* --- SECTION B: ACHIEVEMENTS --- */}
      <div className={styles.achievementsSection}>
        <div className={styles.achievementsHeader}>
          <h2 className={styles.achievementsTitle}>Achievements</h2>
          <span className={styles.progressText}>2/15</span>
        </div>

        <div className={styles.achievementsGrid}>
          {/* First two unlocked */}
          <div className={`${styles.achievementCard} ${styles.unlocked}`}>
            <span className={styles.flameIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C12 22 20 18 20 12C20 6 12 2 12 2C12 2 4 6 4 12C4 18 12 22 12 22Z" stroke="#FFB411" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 18C14 18 15 16 15 14C15 12 13 11 12 11C11 11 9 12 9 14C9 16 10 18 12 18Z" fill="#FFB411"/>
              </svg>
            </span>
          </div>

          <div className={`${styles.achievementCard} ${styles.unlocked}`}>
            <span className={styles.trophyIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 21H16M12 17V21M17 8C19 8 20 9 20 11C20 13 19 14 17 14M7 8C5 8 4 9 4 11C4 13 5 14 7 14M7 4H17C18.1046 4 19 4.89543 19 6V10C19 13.866 15.866 17 12 17C8.13401 17 5 13.866 5 10V6C5 4.89543 5.89543 4 7 4Z" stroke="#00D0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>

          {/* Locked ones */}
          {Array.from({ length: 13 }).map((_, i) => (
            <div key={i} className={styles.achievementCard}>
              <span className={styles.lockIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" fill="white"/>
                  <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="16.5" r="1.5" fill="black"/>
                </svg>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

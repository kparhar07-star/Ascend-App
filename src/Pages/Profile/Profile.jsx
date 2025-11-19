import styles from "./Profile.module.css";

export default function Profile() {
  return (
    <div className={styles.profileContainer}>

      {/* --- SECTION A: HEADER --- */}
      <div className={styles.topRow}>
        <div className={styles.leftSection}>
          <div className={styles.avatar}>
            <span className="text-4xl">👤</span>
          </div>

          <div className={styles.statsContainer}>
            <div className={styles.statRow}>
              <span className={styles.coin}>🪙</span>
              <span>100</span>

              <span className={styles.gem}>💠</span>
              <span>20</span>
            </div>
          </div>
        </div>

        <div className={styles.rightSection}>
          <p className={styles.username}>Steve</p>

          <div className={styles.xpContainer}>
            <div className={styles.xpBar}>
              <div className={styles.xpFill}></div>
            </div>
            <span className={styles.xpText}>900/1000</span>
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
            <span className={styles.flameIcon}>🔥</span>
          </div>

          <div className={`${styles.achievementCard} ${styles.unlocked}`}>
            <span className={styles.trophyIcon}>🏆</span>
          </div>

          {/* Locked ones */}
          {Array.from({ length: 13 }).map((_, i) => (
            <div key={i} className={styles.achievementCard}>
              <span className={styles.lockIcon}>🔒</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

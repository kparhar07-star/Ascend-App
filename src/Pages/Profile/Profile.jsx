import { supabase } from "../../supabaseClient";
import styles from "./Profile.module.css";

export default function Profile({ session, userStats }) {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

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
              <span>{userStats?.coins || 0}</span>

              <span className={styles.gem}>💠</span>
              <span>{userStats?.diamonds || 0}</span>
            </div>
          </div>
        </div>

        <div className={styles.rightSection}>
          <p className={styles.username}>{session?.user?.email || 'User'}</p>

          <div className={styles.xpContainer}>
            <div className={styles.xpBar}>
              <div className={styles.xpFill} style={{ width: `${Math.min(100, ((userStats?.exp || 0) / 1000) * 100)}%` }}></div>
            </div>
            <span className={styles.xpText}>{userStats?.exp || 0}/1000</span>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center mt-4">
        <button 
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
        >
          Sign Out
        </button>
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

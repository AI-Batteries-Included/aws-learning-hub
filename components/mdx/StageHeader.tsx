import styles from './StageHeader.module.css'

interface StageHeaderProps {
  icon: string
  bakeryTitle: string
  techTitle: string
}

export default function StageHeader({ icon, bakeryTitle, techTitle }: StageHeaderProps) {
  return (
    <div className={styles.stageHeader}>
      <div className={styles.iconContainer}>
        <span className={styles.stageIcon}>{icon}</span>
      </div>
      
      <div className={styles.titleContainer}>
        <div className={styles.titlePair}>
          <div className={styles.bakeryTitle}>
            <span className={styles.titleIcon}>🥧</span>
            <span className={styles.titleText}>{bakeryTitle}</span>
          </div>
          
          <div className={styles.arrow}>↓</div>
          
          <div className={styles.techTitle}>
            <span className={styles.titleIcon}>💻</span>
            <span className={styles.titleText}>{techTitle}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
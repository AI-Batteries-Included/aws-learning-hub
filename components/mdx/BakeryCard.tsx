import styles from './BakeryCard.module.css'

interface BakeryCardProps {
  bakeryContent: string
  techContent: string
}

export default function BakeryCard({ bakeryContent, techContent }: BakeryCardProps) {
  return (
    <div className={styles.bakeryCard}>
      <div className={styles.cardSection}>
        <div className={styles.cardHeader}>
          <span className={styles.icon}>🥧</span>
          <h4 className={styles.cardTitle}>Bakery Story</h4>
        </div>
        <p className={styles.cardContent}>{bakeryContent}</p>
      </div>
      
      <div className={styles.cardSection}>
        <div className={styles.cardHeader}>
          <span className={styles.icon}>💻</span>
          <h4 className={styles.cardTitle}>Tech Parallel</h4>
        </div>
        <p className={styles.cardContent}>{techContent}</p>
      </div>
    </div>
  )
}
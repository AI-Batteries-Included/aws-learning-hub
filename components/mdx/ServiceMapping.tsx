import styles from './ServiceMapping.module.css'

interface ServiceMappingProps {
  service: string
  bakeryFunction: string
  icon?: string
  description: string
  technicalDetails?: string
  useCases?: string[]
}

export default function ServiceMapping({ 
  service, 
  bakeryFunction, 
  icon = "⚙️", 
  description, 
  technicalDetails,
  useCases 
}: ServiceMappingProps) {
  return (
    <div className={styles.serviceMapping}>
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <span className={styles.serviceIcon}>{icon}</span>
        </div>
        
        <div className={styles.titleContainer}>
          <h4 className={styles.serviceName}>{service}</h4>
          <p className={styles.bakeryFunction}>{bakeryFunction}</p>
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.description}>
          <p>{description}</p>
        </div>
        
        {technicalDetails && (
          <div className={styles.technicalDetails}>
            <h5 className={styles.sectionTitle}>Technical Details:</h5>
            <p>{technicalDetails}</p>
          </div>
        )}
        
        {useCases && useCases.length > 0 && (
          <div className={styles.useCases}>
            <h5 className={styles.sectionTitle}>Common Use Cases:</h5>
            <ul className={styles.useCaseList}>
              {useCases.map((useCase, index) => (
                <li key={index} className={styles.useCaseItem}>{useCase}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
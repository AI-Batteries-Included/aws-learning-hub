export const metadata = {
  title: 'S3 Storage - AWS Learning Hub',
  description: 'Learn Amazon S3 object storage and file management'
};

export default function S3Storage() {
  return (
    <div className="container">
      <section className="hero-section">
        <h1 className="hero-title">Amazon S3 Storage</h1>
        <p className="hero-subtitle">
          Master object storage with Amazon S3 - the foundation of most AWS architectures.
        </p>
      </section>

      <section className="content-section">
        <h2 className="section-title">Core Concepts</h2>
        <div className="component-grid">
          <div className="component-item">
            <h3>Buckets</h3>
            <p>Container for objects with globally unique names</p>
          </div>
          <div className="component-item">
            <h3>Objects</h3>
            <p>Files and metadata stored in buckets</p>
          </div>
          <div className="component-item">
            <h3>Storage Classes</h3>
            <p>Different tiers for cost optimization</p>
          </div>
          <div className="component-item">
            <h3>Access Control</h3>
            <p>Permissions and security policies</p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-title">Common Use Cases</h2>
        <ul className="feature-list">
          <li className="feature-item">Static website hosting</li>
          <li className="feature-item">Data backup and archival</li>
          <li className="feature-item">Content distribution</li>
          <li className="feature-item">Data lakes and analytics</li>
          <li className="feature-item">Application data storage</li>
        </ul>
      </section>
    </div>
  );
}
export const metadata = {
  title: 'CloudFront - AWS Learning Hub',
  description: 'Learn content delivery with Amazon CloudFront CDN'
};

export default function CloudFront() {
  return (
    <div className="container">
      <section className="hero-section">
        <h1 className="hero-title">Amazon CloudFront</h1>
        <p className="hero-subtitle">
          Accelerate content delivery worldwide with Amazon&apos;s global content delivery network.
        </p>
      </section>

      <section className="content-section">
        <h2 className="section-title">CDN Concepts</h2>
        <div className="component-grid">
          <div className="component-item">
            <h3>Distributions</h3>
            <p>CDN configuration for content delivery</p>
          </div>
          <div className="component-item">
            <h3>Edge Locations</h3>
            <p>Global cache servers for fast delivery</p>
          </div>
          <div className="component-item">
            <h3>Origins</h3>
            <p>Source servers (S3, ALB, custom)</p>
          </div>
          <div className="component-item">
            <h3>Cache Behaviors</h3>
            <p>Rules for how content is cached</p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-title">Key Features</h2>
        <ul className="feature-list">
          <li className="feature-item">Global edge network</li>
          <li className="feature-item">SSL/TLS certificates</li>
          <li className="feature-item">Custom error pages</li>
          <li className="feature-item">Lambda@Edge functions</li>
          <li className="feature-item">Real-time metrics</li>
        </ul>
      </section>
    </div>
  );
}
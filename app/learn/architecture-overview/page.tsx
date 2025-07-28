export const metadata = {
  title: 'Architecture Overview - AWS Learning Hub',
  description: 'Understanding AWS architectural patterns and design principles'
};

export default function ArchitectureOverview() {
  return (
    <div className="container">
      <section className="hero-section">
        <h1 className="hero-title">Architecture Overview</h1>
        <p className="hero-subtitle">
          Learn the fundamental architectural patterns and design principles that guide successful AWS implementations.
        </p>
      </section>

      <section className="content-section">
        <h2 className="section-title">Well-Architected Framework</h2>
        <p className="section-text">
          AWS provides a framework of best practices to help you build secure, high-performing, resilient, and efficient infrastructure.
        </p>
        <div className="component-grid">
          <div className="component-item">
            <h3>Operational Excellence</h3>
            <p>Run and monitor systems to deliver business value</p>
          </div>
          <div className="component-item">
            <h3>Security</h3>
            <p>Protect information and systems</p>
          </div>
          <div className="component-item">
            <h3>Reliability</h3>
            <p>Ensure workloads perform intended functions</p>
          </div>
          <div className="component-item">
            <h3>Performance Efficiency</h3>
            <p>Use computing resources efficiently</p>
          </div>
          <div className="component-item">
            <h3>Cost Optimization</h3>
            <p>Achieve the lowest price point for workloads</p>
          </div>
          <div className="component-item">
            <h3>Sustainability</h3>
            <p>Minimize environmental impact</p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-title">Common Patterns</h2>
        <ul className="feature-list">
          <li className="feature-item">Three-tier architecture (Web, Application, Database)</li>
          <li className="feature-item">Microservices with serverless functions</li>
          <li className="feature-item">Event-driven architectures</li>
          <li className="feature-item">Multi-region deployments</li>
          <li className="feature-item">Infrastructure as Code (IaC)</li>
        </ul>
      </section>
    </div>
  );
}
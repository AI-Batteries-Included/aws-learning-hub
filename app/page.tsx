export default function Home() {
  return (
    <div className="container">
      <section className="hero-section">
        <h1 className="hero-title">AWS Learning Hub</h1>
        <p className="hero-subtitle">
          Your comprehensive resource for learning Amazon Web Services through structured learning paths, practical examples, and best practices.
        </p>
      </section>

      <section className="content-section">
        <h2 className="section-title">Learning Foundation</h2>
        <p className="section-text">
          Start with the fundamentals and build a solid foundation for your AWS journey.
        </p>
        <ul className="feature-list">
          <li className="feature-item">Environment Setup & Development Tools</li>
          <li className="feature-item">GitHub Fundamentals & Version Control</li>
          <li className="feature-item">AWS Basics & Core Concepts</li>
          <li className="feature-item">VS Code & Claude Code Configuration</li>
          <li className="feature-item">Architecture Overview & Best Practices</li>
        </ul>
      </section>
      
      <section className="content-section">
        <h2 className="section-title">AWS Components</h2>
        <p className="section-text">
          Deep dive into specific AWS services with practical examples and real-world implementations.
        </p>
        <div className="component-grid">
          <div className="component-item">
            <h3>Storage & CDN</h3>
            <p>S3, CloudFront</p>
          </div>
          <div className="component-item">
            <h3>Compute & Functions</h3>
            <p>Lambda, Serverless</p>
          </div>
          <div className="component-item">
            <h3>Networking & DNS</h3>
            <p>Route 53, VPC</p>
          </div>
          <div className="component-item">
            <h3>Security & IAM</h3>
            <p>Identity, Access Management</p>
          </div>
          <div className="component-item">
            <h3>Infrastructure</h3>
            <p>CloudFormation, IaC</p>
          </div>
          <div className="component-item">
            <h3>Communication</h3>
            <p>SES, Messaging</p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-title">Templates & Resources</h2>
        <p className="section-text">
          Download practical templates, checklists, and resources to accelerate your AWS development.
        </p>
        <ul className="path-list">
          <li className="path-item">
            <div className="path-title">CloudFormation Templates</div>
            <div className="path-description">
              Ready-to-use infrastructure templates for common AWS architectures
            </div>
          </li>
          <li className="path-item">
            <div className="path-title">Quick Reference Guides</div>
            <div className="path-description">
              Checklists and reference materials for AWS services and best practices
            </div>
          </li>
          <li className="path-item">
            <div className="path-title">Sample Code & Examples</div>
            <div className="path-description">
              Working code examples and configuration files for various AWS scenarios
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
}

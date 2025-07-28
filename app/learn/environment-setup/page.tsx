export const metadata = {
  title: 'Environment Setup - AWS Learning Hub',
  description: 'Set up your development environment for AWS projects'
};

export default function EnvironmentSetup() {
  return (
    <div className="container">
      <section className="hero-section">
        <h1 className="hero-title">Environment Setup</h1>
        <p className="hero-subtitle">
          Configure your development environment with the essential tools for AWS development.
        </p>
      </section>

      <section className="content-section">
        <h2 className="section-title">Prerequisites</h2>
        <p className="section-text">
          Before diving into AWS development, you&apos;ll need to set up your local environment with the right tools and configurations.
        </p>
        <ul className="feature-list">
          <li className="feature-item">AWS CLI installation and configuration</li>
          <li className="feature-item">Node.js and npm setup</li>
          <li className="feature-item">Git and version control</li>
          <li className="feature-item">IDE configuration (VS Code recommended)</li>
          <li className="feature-item">AWS account setup and credentials</li>
        </ul>
      </section>

      <section className="content-section">
        <h2 className="section-title">Development Tools</h2>
        <div className="component-grid">
          <div className="component-item">
            <h3>AWS CLI</h3>
            <p>Command-line interface for AWS services</p>
          </div>
          <div className="component-item">
            <h3>AWS SAM CLI</h3>
            <p>Serverless application development framework</p>
          </div>
          <div className="component-item">
            <h3>Docker</h3>
            <p>Containerization for local testing</p>
          </div>
          <div className="component-item">
            <h3>Postman</h3>
            <p>API testing and development</p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-title">Next Steps</h2>
        <p className="section-text">
          Once your environment is configured, continue with the Architecture Overview to understand AWS design patterns.
        </p>
      </section>
    </div>
  );
}
export const metadata = {
  title: 'Setup Guide - AWS Learning Hub',
  description: 'Complete setup guide for AWS development environment and account configuration'
};

export default function SetupGuide() {
  return (
    <div className="container">
      <section className="hero-section">
        <h1 className="hero-title">Setup Guide</h1>
        <p className="hero-subtitle">
          Complete step-by-step guide to set up your AWS account, development environment, and essential tools.
        </p>
      </section>

      <section className="content-section">
        <h2 className="section-title">AWS Account Setup</h2>
        <ul className="feature-list">
          <li className="feature-item">Create AWS account and enable billing</li>
          <li className="feature-item">Set up root account MFA</li>
          <li className="feature-item">Create IAM user for development</li>
          <li className="feature-item">Configure billing alerts</li>
          <li className="feature-item">Understand free tier limits</li>
        </ul>
      </section>

      <section className="content-section">
        <h2 className="section-title">Development Environment</h2>
        <div className="component-grid">
          <div className="component-item">
            <h3>AWS CLI</h3>
            <p>Install and configure AWS command line</p>
          </div>
          <div className="component-item">
            <h3>VS Code</h3>
            <p>Set up IDE with AWS extensions</p>
          </div>
          <div className="component-item">
            <h3>Node.js</h3>
            <p>JavaScript runtime for Lambda development</p>
          </div>
          <div className="component-item">
            <h3>Git</h3>
            <p>Version control setup</p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-title">Security Best Practices</h2>
        <ul className="feature-list">
          <li className="feature-item">Use AWS profiles for different environments</li>
          <li className="feature-item">Never commit AWS credentials to code</li>
          <li className="feature-item">Enable CloudTrail for audit logging</li>
          <li className="feature-item">Set up AWS Config for compliance</li>
          <li className="feature-item">Use least privilege IAM policies</li>
        </ul>
      </section>
    </div>
  );
}
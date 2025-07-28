export const metadata = {
  title: 'CloudFormation - AWS Learning Hub',
  description: 'Learn Infrastructure as Code with AWS CloudFormation'
};

export default function CloudFormation() {
  return (
    <div className="container">
      <section className="hero-section">
        <h1 className="hero-title">AWS CloudFormation</h1>
        <p className="hero-subtitle">
          Define and provision AWS infrastructure using code with CloudFormation templates and best practices.
        </p>
      </section>

      <section className="content-section">
        <h2 className="section-title">IaC Concepts</h2>
        <div className="component-grid">
          <div className="component-item">
            <h3>Templates</h3>
            <p>JSON/YAML files defining resources</p>
          </div>
          <div className="component-item">
            <h3>Stacks</h3>
            <p>Deployed instances of templates</p>
          </div>
          <div className="component-item">
            <h3>Parameters</h3>
            <p>Input values for template customization</p>
          </div>
          <div className="component-item">
            <h3>Outputs</h3>
            <p>Values returned from stack creation</p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-title">Advanced Features</h2>
        <ul className="feature-list">
          <li className="feature-item">Cross-stack references</li>
          <li className="feature-item">Nested stacks</li>
          <li className="feature-item">Stack sets for multi-account</li>
          <li className="feature-item">Change sets for safe updates</li>
          <li className="feature-item">Custom resources with Lambda</li>
        </ul>
      </section>
    </div>
  );
}
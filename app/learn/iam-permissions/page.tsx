export const metadata = {
  title: 'IAM Permissions - AWS Learning Hub',
  description: 'Learn identity and access management with AWS IAM'
};

export default function IAMPermissions() {
  return (
    <div className="container">
      <section className="hero-section">
        <h1 className="hero-title">AWS IAM Permissions</h1>
        <p className="hero-subtitle">
          Secure your AWS resources with proper identity and access management policies and best practices.
        </p>
      </section>

      <section className="content-section">
        <h2 className="section-title">IAM Components</h2>
        <div className="component-grid">
          <div className="component-item">
            <h3>Users</h3>
            <p>Individual identities with credentials</p>
          </div>
          <div className="component-item">
            <h3>Groups</h3>
            <p>Collection of users with shared permissions</p>
          </div>
          <div className="component-item">
            <h3>Roles</h3>
            <p>Temporary credentials for services</p>
          </div>
          <div className="component-item">
            <h3>Policies</h3>
            <p>JSON documents defining permissions</p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-title">Security Principles</h2>
        <ul className="feature-list">
          <li className="feature-item">Principle of least privilege</li>
          <li className="feature-item">Use roles instead of users for services</li>
          <li className="feature-item">Enable MFA for sensitive operations</li>
          <li className="feature-item">Regular access reviews and cleanup</li>
          <li className="feature-item">Use AWS managed policies when possible</li>
        </ul>
      </section>
    </div>
  );
}
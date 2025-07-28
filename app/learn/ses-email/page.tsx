export const metadata = {
  title: 'SES Email - AWS Learning Hub',
  description: 'Learn email delivery with Amazon Simple Email Service'
};

export default function SESEmail() {
  return (
    <div className="container">
      <section className="hero-section">
        <h1 className="hero-title">Amazon SES Email</h1>
        <p className="hero-subtitle">
          Send transactional and marketing emails reliably with Amazon Simple Email Service.
        </p>
      </section>

      <section className="content-section">
        <h2 className="section-title">Email Services</h2>
        <div className="component-grid">
          <div className="component-item">
            <h3>Sending</h3>
            <p>SMTP and API-based email delivery</p>
          </div>
          <div className="component-item">
            <h3>Receiving</h3>
            <p>Process incoming emails with rules</p>
          </div>
          <div className="component-item">
            <h3>Templates</h3>
            <p>Reusable email templates</p>
          </div>
          <div className="component-item">
            <h3>Configuration Sets</h3>
            <p>Track metrics and manage sending</p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-title">Best Practices</h2>
        <ul className="feature-list">
          <li className="feature-item">Domain verification and DKIM</li>
          <li className="feature-item">Bounce and complaint handling</li>
          <li className="feature-item">Reputation monitoring</li>
          <li className="feature-item">List management</li>
          <li className="feature-item">Testing and sandbox mode</li>
        </ul>
      </section>
    </div>
  );
}
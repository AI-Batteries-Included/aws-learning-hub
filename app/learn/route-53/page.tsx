export const metadata = {
  title: 'Route 53 - AWS Learning Hub',
  description: 'Learn DNS management and domain routing with Amazon Route 53'
};

export default function Route53() {
  return (
    <div className="container">
      <section className="hero-section">
        <h1 className="hero-title">Amazon Route 53</h1>
        <p className="hero-subtitle">
          Configure DNS management and intelligent routing with Amazon&apos;s highly available domain name system.
        </p>
      </section>

      <section className="content-section">
        <h2 className="section-title">DNS Fundamentals</h2>
        <div className="component-grid">
          <div className="component-item">
            <h3>Hosted Zones</h3>
            <p>Container for DNS records for a domain</p>
          </div>
          <div className="component-item">
            <h3>Record Types</h3>
            <p>A, AAAA, CNAME, MX, and other DNS records</p>
          </div>
          <div className="component-item">
            <h3>Health Checks</h3>
            <p>Monitor endpoint health for failover</p>
          </div>
          <div className="component-item">
            <h3>Routing Policies</h3>
            <p>Simple, weighted, latency-based routing</p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-title">Advanced Features</h2>
        <ul className="feature-list">
          <li className="feature-item">Domain registration</li>
          <li className="feature-item">Traffic flow visual editor</li>
          <li className="feature-item">DNS failover</li>
          <li className="feature-item">Geolocation routing</li>
          <li className="feature-item">Private DNS for VPCs</li>
        </ul>
      </section>
    </div>
  );
}
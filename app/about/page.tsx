export const metadata = {
  title: 'About - AWS Learning Hub',
  description: 'Learn about the AWS Learning Hub mission and approach to AWS education'
};

export default function About() {
  return (
    <div className="container">
      <section className="hero-section">
        <h1 className="hero-title">About AWS Learning Hub</h1>
        <p className="hero-subtitle">
          Our mission is to make AWS learning accessible, practical, and effective for developers at all levels.
        </p>
      </section>

      <section className="content-section">
        <h2 className="section-title">Our Approach</h2>
        <p className="section-text">
          We believe in learning by doing. Our content focuses on practical, hands-on examples that you can implement in real projects.
        </p>
        <ul className="feature-list">
          <li className="feature-item">Structured learning paths from beginner to advanced</li>
          <li className="feature-item">Real-world examples and use cases</li>
          <li className="feature-item">Best practices based on AWS Well-Architected Framework</li>
          <li className="feature-item">Step-by-step tutorials with working code</li>
          <li className="feature-item">Templates and resources for immediate use</li>
        </ul>
      </section>

      <section className="content-section">
        <h2 className="section-title">What Makes Us Different</h2>
        <div className="component-grid">
          <div className="component-item">
            <h3>Practical Focus</h3>
            <p>Every lesson includes working examples you can use in real projects</p>
          </div>
          <div className="component-item">
            <h3>Modern Tools</h3>
            <p>Learn with the latest development tools including VS Code and Claude Code</p>
          </div>
          <div className="component-item">
            <h3>Structured Learning</h3>
            <p>Progressive curriculum that builds knowledge systematically</p>
          </div>
          <div className="component-item">
            <h3>Best Practices</h3>
            <p>Learn the right way from the start with industry-standard approaches</p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-title">Content Organization</h2>
        <p className="section-text">
          Our content is organized into three main categories to support your learning journey:
        </p>
        <ul className="path-list">
          <li className="path-item">
            <div className="path-title">Foundation</div>
            <div className="path-description">
              Essential setup, tools, and fundamental concepts you need before diving into AWS services
            </div>
          </li>
          <li className="path-item">
            <div className="path-title">Components</div>
            <div className="path-description">
              Deep dives into specific AWS services with practical examples and implementation guides
            </div>
          </li>
          <li className="path-item">
            <div className="path-title">Templates</div>
            <div className="path-description">
              Ready-to-use templates, checklists, and downloadable resources for your projects
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
}
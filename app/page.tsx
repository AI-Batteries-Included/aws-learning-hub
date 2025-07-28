export default function Home() {
  return (
    <div className="container">
      <header className="header">
        <h1 className="title">AWS Learning Hub</h1>
        <p className="subtitle">
          Your comprehensive resource for learning Amazon Web Services through structured learning paths, practical examples, and best practices.
        </p>
      </header>

      <main>
        <section className="content-section">
          <h2 className="section-title">What You&apos;ll Find Here</h2>
          <p className="section-text">
            Our platform provides everything you need to master AWS services, from basic concepts to advanced architectural patterns.
          </p>
          <ul className="feature-list">
            <li className="feature-item">Step-by-step tutorials for AWS services</li>
            <li className="feature-item">Best practices and architectural patterns</li>
            <li className="feature-item">Real-world examples and use cases</li>
            <li className="feature-item">Learning paths for different skill levels</li>
          </ul>
        </section>
        
        <section className="content-section">
          <h2 className="section-title">Getting Started</h2>
          <p className="section-text">
            Choose your learning path based on your experience level and goals:
          </p>
          <ul className="path-list">
            <li className="path-item">
              <div className="path-title">Beginners</div>
              <div className="path-description">
                Start with AWS fundamentals and core services like EC2, S3, and IAM
              </div>
            </li>
            <li className="path-item">
              <div className="path-title">Intermediate</div>
              <div className="path-description">
                Dive into specific service deep-dives and architectural patterns
              </div>
            </li>
            <li className="path-item">
              <div className="path-title">Advanced</div>
              <div className="path-description">
                Explore complex architectures, optimization techniques, and enterprise patterns
              </div>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

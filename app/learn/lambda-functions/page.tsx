export const metadata = {
  title: 'Lambda Functions - AWS Learning Hub',
  description: 'Learn serverless computing with AWS Lambda'
};

export default function LambdaFunctions() {
  return (
    <div className="container">
      <section className="hero-section">
        <h1 className="hero-title">AWS Lambda Functions</h1>
        <p className="hero-subtitle">
          Build and run applications without managing servers using AWS&apos;s serverless compute platform.
        </p>
      </section>

      <section className="content-section">
        <h2 className="section-title">Serverless Concepts</h2>
        <div className="component-grid">
          <div className="component-item">
            <h3>Functions</h3>
            <p>Code that runs in response to events</p>
          </div>
          <div className="component-item">
            <h3>Event Sources</h3>
            <p>Triggers that invoke your functions</p>
          </div>
          <div className="component-item">
            <h3>Runtime</h3>
            <p>Execution environment for your code</p>
          </div>
          <div className="component-item">
            <h3>Layers</h3>
            <p>Shared code and dependencies</p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-title">Common Patterns</h2>
        <ul className="feature-list">
          <li className="feature-item">API backends with API Gateway</li>
          <li className="feature-item">File processing with S3 triggers</li>
          <li className="feature-item">Scheduled tasks with EventBridge</li>
          <li className="feature-item">Stream processing with Kinesis</li>
          <li className="feature-item">Database triggers with DynamoDB</li>
        </ul>
      </section>
    </div>
  );
}
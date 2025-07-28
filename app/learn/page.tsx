export const metadata = {
  title: 'Learn - AWS Learning Hub',
  description: 'Comprehensive AWS learning resources organized by foundation and components'
};

export default function LearnHub() {
  return (
    <div className="container">
      <section className="hero-section">
        <h1 className="hero-title">Learn AWS</h1>
        <p className="hero-subtitle">
          Master Amazon Web Services through structured learning paths, from foundational concepts to advanced components.
        </p>
      </section>

      <section className="content-section">
        <h2 className="section-title">Foundation</h2>
        <p className="section-text">
          Start with the essentials. Build a solid foundation before diving into specific AWS services.
        </p>
        <div className="component-grid">
          <div className="component-item">
            <h3>Environment Setup</h3>
            <p>Configure your development environment for AWS projects</p>
          </div>
          <div className="component-item">
            <h3>Architecture Overview</h3>
            <p>Understand AWS architectural patterns and best practices</p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-title">Core Components</h2>
        <p className="section-text">
          Deep dive into the essential AWS services that power modern cloud applications.
        </p>
        <div className="component-grid">
          <div className="component-item">
            <h3>S3 Storage</h3>
            <p>Object storage and file management</p>
          </div>
          <div className="component-item">
            <h3>Route 53</h3>
            <p>DNS management and domain routing</p>
          </div>
          <div className="component-item">
            <h3>CloudFront</h3>
            <p>Content delivery network (CDN)</p>
          </div>
          <div className="component-item">
            <h3>Lambda Functions</h3>
            <p>Serverless computing platform</p>
          </div>
          <div className="component-item">
            <h3>SES Email</h3>
            <p>Simple Email Service for sending emails</p>
          </div>
          <div className="component-item">
            <h3>IAM Permissions</h3>
            <p>Identity and access management</p>
          </div>
          <div className="component-item">
            <h3>CloudFormation</h3>
            <p>Infrastructure as Code templates</p>
          </div>
        </div>
      </section>
    </div>
  );
}
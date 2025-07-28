export const metadata = {
  title: 'Templates - AWS Learning Hub',
  description: 'Download CloudFormation templates and code examples for AWS projects'
};

export default function Templates() {
  return (
    <div className="container">
      <section className="hero-section">
        <h1 className="hero-title">Templates & Resources</h1>
        <p className="hero-subtitle">
          Ready-to-use CloudFormation templates, code examples, and resources to accelerate your AWS development.
        </p>
      </section>

      <section className="content-section">
        <h2 className="section-title">CloudFormation Templates</h2>
        <div className="component-grid">
          <div className="component-item">
            <h3>Static Website</h3>
            <p>S3 + CloudFront + Route 53 setup</p>
          </div>
          <div className="component-item">
            <h3>Serverless API</h3>
            <p>Lambda + API Gateway + DynamoDB</p>
          </div>
          <div className="component-item">
            <h3>Email System</h3>
            <p>SES + Lambda for transactional emails</p>
          </div>
          <div className="component-item">
            <h3>IAM Roles</h3>
            <p>Common role templates for services</p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-title">Quick Reference</h2>
        <ul className="feature-list">
          <li className="feature-item">AWS CLI command cheat sheet</li>
          <li className="feature-item">Common IAM policy examples</li>
          <li className="feature-item">CloudFormation resource reference</li>
          <li className="feature-item">Lambda function templates</li>
          <li className="feature-item">S3 bucket policy examples</li>
        </ul>
      </section>

      <section className="content-section">
        <h2 className="section-title">Code Examples</h2>
        <p className="section-text">
          Working code examples in multiple languages for common AWS integration patterns.
        </p>
      </section>
    </div>
  );
}
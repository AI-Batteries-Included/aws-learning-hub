import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>AWS Learning Hub</h3>
            <p>Your comprehensive resource for learning Amazon Web Services.</p>
          </div>
          <div className="footer-section">
            <h4>Learning</h4>
            <ul>
              <li><Link href="/learn">All Courses</Link></li>
              <li><Link href="/setup-guide">Environment Setup</Link></li>
              <li><Link href="/learn/s3-storage">S3 Storage</Link></li>
              <li><Link href="/learn/lambda-functions">Lambda Functions</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><Link href="/templates">Templates</Link></li>
              <li><Link href="/setup-guide">Setup Guide</Link></li>
              <li><Link href="/test-mdx">MDX Demo</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><span style={{opacity: 0.5, cursor: 'not-allowed'}}>Community (Coming Soon)</span></li>
              <li><span style={{opacity: 0.5, cursor: 'not-allowed'}}>AWS Cost Calculator (Coming Soon)</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 AWS Learning Hub. Educational content for learning purposes.</p>
        </div>
      </div>
    </footer>
  );
}
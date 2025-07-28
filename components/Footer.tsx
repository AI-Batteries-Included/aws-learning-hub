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
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><Link href="/test-mdx">MDX Demo</Link></li>
              <li><a href="#foundation">Foundation</a></li>
              <li><a href="#components">Components</a></li>
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
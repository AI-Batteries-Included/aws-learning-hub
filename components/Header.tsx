import Link from 'next/link';

export default function Header() {
  return (
    <header className="financial-header">
      <div className="header-container">
        {/* Logo */}
        <Link href="/" className="header-logo">
          <h1>AWS Learning Hub</h1>
        </Link>

        {/* Action Buttons */}
        <div className="header-actions">
          <Link href="/about" className="action-btn outline">
            ABOUT
          </Link>
          <Link href="/learn" className="action-btn primary">
            START LEARNING
          </Link>
          <Link href="/contact" className="action-btn text">
            CONTACT
          </Link>
        </div>
      </div>
    </header>
  );
}
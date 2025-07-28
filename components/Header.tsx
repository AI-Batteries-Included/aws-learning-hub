import Link from 'next/link';

export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <div className="header-content">
          <Link href="/" className="logo">
            <h1>AWS Learning Hub</h1>
          </Link>
          <nav className="main-nav">
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
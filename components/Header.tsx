import Link from 'next/link';
import MainNav from './Navigation/MainNav';

export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <div className="header-content">
          <Link href="/" className="logo">
            <h1>AWS Learning Hub</h1>
          </Link>
          <MainNav />
        </div>
      </div>
    </header>
  );
}
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Navigation/Sidebar';
import Breadcrumb from './Breadcrumb';
import { ProgressProvider } from './progress/ProgressContext';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ProgressProvider>
      <div className="financial-layout">
        <Header />
        <div className="layout-container">
          <Sidebar />
          <main className="content">
            <Breadcrumb />
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </ProgressProvider>
  );
}
import { ReactNode } from 'react';

interface MDXPageTemplateProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function MDXPageTemplate({ title, subtitle, children }: MDXPageTemplateProps) {
  return (
    <div className="container">
      <section className="hero-section">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
      </section>
      
      <section className="content-section">
        <div className="mdx-content">
          {children}
        </div>
      </section>
    </div>
  );
}
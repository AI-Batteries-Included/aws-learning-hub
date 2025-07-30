import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Prerequisite {
  title: string;
  href: string;
  completed?: boolean;
}

interface NextStep {
  title: string;
  href: string;
  description: string;
}

interface ComponentPageTemplateProps {
  title: string;
  subtitle: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  prerequisites?: Prerequisite[];
  nextSteps?: NextStep[];
  category: string;
  awsServices: string[];
  infographicPath?: string;
  infographicAlt?: string;
  children: ReactNode;
}

export default function ComponentPageTemplate({
  title,
  subtitle,
  difficulty,
  estimatedTime,
  prerequisites = [],
  nextSteps = [],
  category,
  awsServices,
  infographicPath,
  infographicAlt,
  children
}: ComponentPageTemplateProps) {
  
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return '#10b981'; // green
      case 'intermediate': return '#f59e0b'; // amber
      case 'advanced': return '#ef4444'; // red
      default: return '#6b7280'; // gray
    }
  };

  return (
    <div className="container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="component-meta">
          <div className="meta-badges">
            <span className="category-badge">{category}</span>
            <span 
              className="difficulty-badge" 
              style={{ backgroundColor: getDifficultyColor(difficulty), color: 'white' }}
            >
              {difficulty}
            </span>
            <span className="time-badge">⏱️ {estimatedTime}</span>
          </div>
          <div className="aws-services">
            <span className="services-label">AWS Services:</span>
            {awsServices.map((service, index) => (
              <span key={index} className="service-tag">{service}</span>
            ))}
          </div>
        </div>
        
        {/* Infographic Section */}
        {infographicPath && (
          <div className="infographic-section">
            <img
              src={infographicPath}
              alt={infographicAlt || `${title} Architecture Diagram`}
              className="component-infographic"
              style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
            />
          </div>
        )}
        
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
      </section>

      {/* Prerequisites Section */}
      {prerequisites.length > 0 && (
        <section className="prerequisites-section">
          <h2 className="section-title">📋 Prerequisites</h2>
          <p className="section-text">
            Complete these foundation topics before starting this component guide:
          </p>
          <div className="prerequisites-grid">
            {prerequisites.map((prereq, index) => (
              <Link key={index} href={prereq.href} className="prerequisite-card">
                <div className="prereq-status">
                  {prereq.completed ? (
                    <span className="prereq-completed">✅</span>
                  ) : (
                    <span className="prereq-pending">📝</span>
                  )}
                </div>
                <div className="prereq-content">
                  <h3 className="prereq-title">{prereq.title}</h3>
                  <span className="prereq-action">
                    {prereq.completed ? 'Review' : 'Start here'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="content-section">
        <div className="mdx-content component-content">
          {children}
        </div>
      </section>

      {/* Next Steps Section */}
      {nextSteps.length > 0 && (
        <section className="next-steps-section">
          <h2 className="section-title">🚀 What&apos;s Next?</h2>
          <p className="section-text">
            Continue your learning journey with these related components:
          </p>
          <div className="next-steps-grid">
            {nextSteps.map((step, index) => (
              <Link key={index} href={step.href} className="next-step-card">
                <h3 className="next-step-title">{step.title}</h3>
                <p className="next-step-description">{step.description}</p>
                <span className="next-step-arrow">→</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface FoundationCardProps {
  title: string;
  description: string;
  href: string;
  icon?: ReactNode;
  className?: string;
}

export default function FoundationCard({
  title,
  description,
  href,
  icon,
  className = ''
}: FoundationCardProps) {
  
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      // Navigate to the href
      window.location.href = href;
    }
  };

  return (
    <Link
      href={href}
      className={`foundation-card ${className}`}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`Navigate to ${title}: ${description}`}
    >
      <div className="foundation-card-content">
        {icon && (
          <div className="foundation-card-icon">
            {icon}
          </div>
        )}
        <h3 className="foundation-card-title">{title}</h3>
        <p className="foundation-card-description">{description}</p>
        <div className="foundation-card-arrow">→</div>
      </div>
    </Link>
  );
}
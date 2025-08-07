'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Sidebar() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['main', 'paths']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-content">
        {/* Main Navigation Section */}
        <div className="sidebar-section">
          <button 
            className="sidebar-section-header"
            onClick={() => toggleSection('main')}
          >
            <span>Main Navigation</span>
            <span className={`sidebar-arrow ${expandedSections.includes('main') ? 'expanded' : ''}`}>▼</span>
          </button>
          {expandedSections.includes('main') && (
            <ul className="sidebar-list">
              <li>
                <Link href="/" className="sidebar-link">
                  <span className="sidebar-icon">🏠</span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/templates" className="sidebar-link">
                  <span className="sidebar-icon">📄</span>
                  <span>Templates</span>
                </Link>
              </li>
              <li>
                <Link href="/setup-guide" className="sidebar-link">
                  <span className="sidebar-icon">⚙️</span>
                  <span>Setup Guide</span>
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* Learning Paths Section */}
        <div className="sidebar-section">
          <button 
            className="sidebar-section-header"
            onClick={() => toggleSection('paths')}
          >
            <span>Learning Paths</span>
            <span className={`sidebar-arrow ${expandedSections.includes('paths') ? 'expanded' : ''}`}>▼</span>
          </button>
          {expandedSections.includes('paths') && (
            <ul className="sidebar-list">
              <li>
                <Link href="/learn" className="sidebar-link">
                  <span className="sidebar-icon">📚</span>
                  <span>Understanding AWS from Zero</span>
                </Link>
              </li>
              <li>
                <Link href="/learn/aws-basics" className="sidebar-link">
                  <span className="sidebar-icon">🔰</span>
                  <span>Using AWS Products</span>
                </Link>
              </li>
              <li>
                <Link href="/learn/architecture-overview" className="sidebar-link">
                  <span className="sidebar-icon">🏗️</span>
                  <span>Architecture</span>
                </Link>
              </li>
              <li>
                <Link href="/learn/aws-services" className="sidebar-link">
                  <span className="sidebar-icon">☁️</span>
                  <span>AWS Services</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
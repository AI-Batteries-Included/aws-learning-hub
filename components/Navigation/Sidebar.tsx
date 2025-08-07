'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Sidebar() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['main', 'services']);

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
                <Link href="/learn/environment-setup" className="sidebar-link">
                  <span className="sidebar-icon">🛠️</span>
                  <span>Environment Setup</span>
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* AWS Product Guides Section */}
        <div className="sidebar-section">
          <button 
            className="sidebar-section-header"
            onClick={() => toggleSection('services')}
          >
            <span>AWS Product Guides</span>
            <span className={`sidebar-arrow ${expandedSections.includes('services') ? 'expanded' : ''}`}>▼</span>
          </button>
          {expandedSections.includes('services') && (
            <ul className="sidebar-list">
              <li>
                <Link href="/learn/aws-services" className="sidebar-link">
                  <span className="sidebar-icon">☁️</span>
                  <span>AWS Services</span>
                </Link>
              </li>
              <li>
                <Link href="/learn/s3-storage" className="sidebar-link">
                  <span className="sidebar-icon">🪣</span>
                  <span>S3 Storage</span>
                </Link>
              </li>
              <li>
                <Link href="/learn/lambda-functions" className="sidebar-link">
                  <span className="sidebar-icon">⚡</span>
                  <span>Lambda Functions</span>
                </Link>
              </li>
              <li>
                <Link href="/learn/cloudformation" className="sidebar-link">
                  <span className="sidebar-icon">📋</span>
                  <span>CloudFormation</span>
                </Link>
              </li>
              <li>
                <Link href="/learn/iam-permissions" className="sidebar-link">
                  <span className="sidebar-icon">🔐</span>
                  <span>IAM Permissions</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
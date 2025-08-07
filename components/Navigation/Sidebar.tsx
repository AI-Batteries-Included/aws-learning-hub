'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useProgressOptional } from '../progress/ProgressContext';
import { ProgressDashboard } from '../progress/ProgressDashboard';

export default function Sidebar() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['main', 'services', 'progress']);
  const progress = useProgressOptional(); // Optional to avoid requiring ProgressProvider everywhere

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  // Map pages to their progress data
  const pageProgressMap = {
    '/learn': 'learn-introduction',
    '/learn/aws-basics': 'aws-basics-introduction', 
    '/learn/architecture-overview': 'architecture-overview',
    '/learn/environment-setup': 'environment-setup-introduction',
    '/learn/aws-services': 'aws-services-introduction',
    '/learn/s3-storage': 's3-storage-introduction',
    '/learn/lambda-functions': 'lambda-functions-introduction',
    '/learn/cloudformation': 'cloudformation-introduction',
    '/learn/iam-permissions': 'iam-permissions-introduction',
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-content">
        {/* Progress Overview Section */}
        {progress && (
          <div className="sidebar-section">
            <button 
              className="sidebar-section-header"
              onClick={() => toggleSection('progress')}
            >
              <span>Your Progress</span>
              <span className={`sidebar-arrow ${expandedSections.includes('progress') ? 'expanded' : ''}`}>▼</span>
            </button>
            {expandedSections.includes('progress') && (
              <div className="sidebar-progress-section">
                <ProgressDashboard compact={true} showAchievements={false} showSections={false} />
                <Link href="/progress" className="sidebar-link mt-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md font-mono text-sm">
                  📊&nbsp;&nbsp;&nbsp;&nbsp;View Detailed Analytics
                </Link>
              </div>
            )}
          </div>
        )}

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
                <SidebarLinkWithProgress 
                  href="/learn" 
                  pageId={pageProgressMap['/learn']}
                  icon="📚" 
                  text="AWS from Zero"
                  progress={progress}
                />
              </li>
              <li>
                <SidebarLinkWithProgress 
                  href="/learn/aws-basics" 
                  pageId={pageProgressMap['/learn/aws-basics']}
                  icon="🔰" 
                  text="Using AWS Products"
                  progress={progress}
                />
              </li>
              <li>
                <SidebarLinkWithProgress 
                  href="/learn/architecture-overview" 
                  pageId={pageProgressMap['/learn/architecture-overview']}
                  icon="🏗️" 
                  text="Architecture"
                  progress={progress}
                />
              </li>
              <li>
                <SidebarLinkWithProgress 
                  href="/learn/environment-setup" 
                  pageId={pageProgressMap['/learn/environment-setup']}
                  icon="🛠️" 
                  text="Environment Setup"
                  progress={progress}
                />
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
                <SidebarLinkWithProgress 
                  href="/learn/aws-services" 
                  pageId={pageProgressMap['/learn/aws-services']}
                  icon="☁️" 
                  text="AWS Services"
                  progress={progress}
                />
              </li>
              <li>
                <SidebarLinkWithProgress 
                  href="/learn/s3-storage" 
                  pageId={pageProgressMap['/learn/s3-storage']}
                  icon="🪣" 
                  text="S3 Storage"
                  progress={progress}
                />
              </li>
              <li>
                <SidebarLinkWithProgress 
                  href="/learn/lambda-functions" 
                  pageId={pageProgressMap['/learn/lambda-functions']}
                  icon="⚡" 
                  text="Lambda Functions"
                  progress={progress}
                />
              </li>
              <li>
                <SidebarLinkWithProgress 
                  href="/learn/cloudformation" 
                  pageId={pageProgressMap['/learn/cloudformation']}
                  icon="📋" 
                  text="CloudFormation"
                  progress={progress}
                />
              </li>
              <li>
                <SidebarLinkWithProgress 
                  href="/learn/iam-permissions" 
                  pageId={pageProgressMap['/learn/iam-permissions']}
                  icon="🔐" 
                  text="IAM Permissions"
                  progress={progress}
                />
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

/**
 * Sidebar link with progress indicator
 */
interface SidebarLinkWithProgressProps {
  href: string;
  pageId: string;
  icon: string;
  text: string;
  progress: {
    getPageProgress: (pageId: string) => {
      completed?: boolean;
      inProgress?: boolean;
      visitCount?: number;
    } | null;
  } | null;
}

function SidebarLinkWithProgress({ 
  href, 
  pageId, 
  icon, 
  text, 
  progress 
}: SidebarLinkWithProgressProps) {
  if (!progress) {
    // Fallback to regular link if no progress context
    return (
      <Link href={href} className="sidebar-link">
        <span className="sidebar-icon">{icon}</span>
        <span>{text}</span>
      </Link>
    );
  }

  const pageProgress = progress.getPageProgress(pageId);
  const isCompleted = pageProgress?.completed || false;
  const isInProgress = pageProgress?.inProgress || false;
  const visitCount = pageProgress?.visitCount || 0;

  return (
    <Link href={href} className={`sidebar-link ${isCompleted ? 'completed' : isInProgress ? 'in-progress' : ''}`}>
      <span className="sidebar-icon">{icon}</span>
      <span className="flex-1">{text}</span>
      <span className="sidebar-progress-indicator">
        {isCompleted && (
          <span className="text-green-500 text-xs" title="Completed">✓</span>
        )}
        {!isCompleted && isInProgress && (
          <span className="text-blue-500 text-xs" title="In Progress">●</span>
        )}
        {!isCompleted && !isInProgress && visitCount > 0 && (
          <span className="text-gray-400 text-xs" title="Visited">○</span>
        )}
      </span>
    </Link>
  );
}
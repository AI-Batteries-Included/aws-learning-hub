'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import DropdownMenu from './DropdownMenu';
import MobileNav from './MobileNav';

export default function MainNav() {
  const pathname = usePathname();
  const [isLearnDropdownOpen, setIsLearnDropdownOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const learnDropdownSections = [
    {
      title: 'Foundation',
      items: [
        {
          title: 'AWS Basics',
          href: '/learn/aws-basics',
          description: 'Core concepts'
        },
        {
          title: 'Environment Setup',
          href: '/learn/environment-setup',
          description: 'Dev setup'
        },
        {
          title: 'VS Code Setup',
          href: '/learn/vscode-setup',
          description: 'VS Code config'
        },
        {
          title: 'GitHub Fundamentals',
          href: '/learn/github-fundamentals',
          description: 'Version control'
        },
        {
          title: 'Claude Code Setup',
          href: '/learn/claude-code-setup',
          description: 'AI assistance'
        },
        {
          title: 'Architecture Overview',
          href: '/learn/architecture-overview',
          description: 'Architecture'
        }
      ]
    },
    {
      title: 'Core Components',
      items: [
        {
          title: 'S3 Storage',
          href: '/learn/s3-storage',
          description: 'Object storage'
        },
        {
          title: 'Route 53',
          href: '/learn/route-53',
          description: 'DNS routing'
        },
        {
          title: 'CloudFront',
          href: '/learn/cloudfront',
          description: 'CDN'
        },
        {
          title: 'Lambda Functions',
          href: '/learn/lambda-functions',
          description: 'Serverless'
        },
        {
          title: 'SES Email',
          href: '/learn/ses-email',
          description: 'Email service'
        },
        {
          title: 'IAM Permissions',
          href: '/learn/iam-permissions',
          description: 'Access control'
        },
        {
          title: 'CloudFormation',
          href: '/learn/cloudformation',
          description: 'IaC templates'
        }
      ]
    }
  ];

  const mobileNavigationItems = [
    { title: 'Home', href: '/' },
    {
      title: 'Learn',
      children: [
        ...learnDropdownSections[0].items,
        ...learnDropdownSections[1].items
      ]
    },
    { title: 'Templates', href: '/templates' },
    { title: 'Setup Guide', href: '/setup-guide' },
    { title: 'About', href: '/about' },
    { title: 'Contact', href: '/contact' }
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className="main-nav">
        <div className="nav-desktop">
          <ul className="nav-list">
            <li>
              <Link
                href="/"
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/templates"
                className={`nav-link ${isActive('/templates') ? 'active' : ''}`}
              >
                Templates
              </Link>
            </li>
            <li>
              <DropdownMenu
                trigger="Learn"
                sections={learnDropdownSections}
                isOpen={isLearnDropdownOpen}
                onToggle={() => setIsLearnDropdownOpen(!isLearnDropdownOpen)}
                onClose={() => setIsLearnDropdownOpen(false)}
              />
            </li>
            <li>
              <Link
                href="/setup-guide"
                className={`nav-link ${isActive('/setup-guide') ? 'active' : ''}`}
              >
                Setup Guide
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`nav-link ${isActive('/about') ? 'active' : ''}`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <button
          className="mobile-nav-trigger"
          onClick={() => setIsMobileNavOpen(true)}
          aria-label="Open menu"
        >
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </button>
      </nav>

      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        navigationItems={mobileNavigationItems}
      />
    </>
  );
}
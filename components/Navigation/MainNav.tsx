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
          title: 'Environment Setup',
          href: '/learn/environment-setup',
          description: 'Set up your development environment'
        },
        {
          title: 'Architecture Overview',
          href: '/learn/architecture-overview',
          description: 'Understanding AWS architectural patterns'
        }
      ]
    },
    {
      title: 'Core Components',
      items: [
        {
          title: 'S3 Storage',
          href: '/learn/s3-storage',
          description: 'Object storage and file management'
        },
        {
          title: 'Route 53',
          href: '/learn/route-53',
          description: 'DNS management and domain routing'
        },
        {
          title: 'CloudFront',
          href: '/learn/cloudfront',
          description: 'Content delivery network (CDN)'
        },
        {
          title: 'Lambda Functions',
          href: '/learn/lambda-functions',
          description: 'Serverless computing platform'
        },
        {
          title: 'SES Email',
          href: '/learn/ses-email',
          description: 'Simple Email Service for sending emails'
        },
        {
          title: 'IAM Permissions',
          href: '/learn/iam-permissions',
          description: 'Identity and access management'
        },
        {
          title: 'CloudFormation',
          href: '/learn/cloudformation',
          description: 'Infrastructure as Code templates'
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
                href="/templates"
                className={`nav-link ${isActive('/templates') ? 'active' : ''}`}
              >
                Templates
              </Link>
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
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumb() {
  const pathname = usePathname();
  
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ];

    let currentPath = '';
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      
      // Convert path segments to readable labels
      let label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      // Special cases for better labeling
      if (segment === 'learn') label = 'Learning Hub';
      if (segment === 'setup-guide') label = 'Setup Guide';
      if (segment === 'aws-basics') label = 'AWS Basics';
      if (segment === 'architecture-overview') label = 'Architecture Overview';
      if (segment === 'environment-setup') label = 'Environment Setup';
      if (segment === 'claude-code-setup') label = 'Claude Code Setup';
      if (segment === 'github-fundamentals') label = 'GitHub Fundamentals';
      if (segment === 'vscode-setup') label = 'VSCode Setup';
      if (segment === 's3-storage') label = 'S3 Storage';
      if (segment === 'lambda-functions') label = 'Lambda Functions';
      if (segment === 'iam-permissions') label = 'IAM Permissions';
      if (segment === 'ses-email') label = 'SES Email';
      if (segment === 'route-53') label = 'Route 53';
      
      breadcrumbs.push({
        label,
        href: currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="breadcrumb-nav" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        {breadcrumbs.map((item, index) => (
          <li key={item.href} className="breadcrumb-item">
            {index < breadcrumbs.length - 1 ? (
              <>
                <Link href={item.href} className="breadcrumb-link">
                  {item.label}
                </Link>
                <span className="breadcrumb-separator">›</span>
              </>
            ) : (
              <span className="breadcrumb-current" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
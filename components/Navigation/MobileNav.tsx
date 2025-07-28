'use client';

import Link from 'next/link';
import { useState } from 'react';

interface NavigationItem {
  title: string;
  href?: string;
  children?: NavigationItem[];
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: NavigationItem[];
}

export default function MobileNav({ isOpen, onClose, navigationItems }: MobileNavProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (title: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedItems(newExpanded);
  };

  const handleLinkClick = () => {
    onClose();
    setExpandedItems(new Set());
  };

  if (!isOpen) return null;

  return (
    <div className="mobile-nav-overlay">
      <div className="mobile-nav">
        <div className="mobile-nav-header">
          <span className="mobile-nav-title">Menu</span>
          <button 
            className="mobile-nav-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        
        <nav className="mobile-nav-content">
          <ul className="mobile-nav-list">
            {navigationItems.map((item, index) => (
              <li key={index} className="mobile-nav-item">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="mobile-nav-link"
                    onClick={handleLinkClick}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <>
                    <button
                      className={`mobile-nav-toggle ${expandedItems.has(item.title) ? 'expanded' : ''}`}
                      onClick={() => toggleExpanded(item.title)}
                      aria-expanded={expandedItems.has(item.title)}
                    >
                      {item.title}
                      <span className="mobile-nav-arrow">▼</span>
                    </button>
                    {expandedItems.has(item.title) && item.children && (
                      <ul className="mobile-nav-submenu">
                        {item.children.map((child, childIndex) => (
                          <li key={childIndex}>
                            <Link
                              href={child.href || '#'}
                              className="mobile-nav-sublink"
                              onClick={handleLinkClick}
                            >
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
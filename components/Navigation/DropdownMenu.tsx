'use client';

import Link from 'next/link';
import { useRef, useEffect } from 'react';

interface DropdownItem {
  title: string;
  href: string;
  description?: string;
}

interface DropdownSection {
  title: string;
  items: DropdownItem[];
}

interface DropdownMenuProps {
  trigger: string;
  sections: DropdownSection[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function DropdownMenu({
  trigger,
  sections,
  isOpen,
  onToggle,
  onClose
}: DropdownMenuProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        className={`dropdown-trigger ${isOpen ? 'active' : ''}`}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {trigger}
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      
      {isOpen && (
        <div className="dropdown-menu" role="menu">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="dropdown-section">
              <div className="dropdown-section-title">{section.title}</div>
              <ul className="dropdown-items">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link
                      href={item.href}
                      className="dropdown-item"
                      onClick={onClose}
                      role="menuitem"
                    >
                      <div className="dropdown-item-title">{item.title}</div>
                      {item.description && (
                        <div className="dropdown-item-description">{item.description}</div>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
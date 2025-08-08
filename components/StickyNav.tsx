'use client';

import { useState, useEffect } from 'react';

interface NavItem {
  id: string;
  label: string;
}

interface StickyNavProps {
  items: NavItem[];
}

export default function StickyNav({ items }: StickyNavProps) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(items[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky-nav">
      <div className="sticky-nav-container">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
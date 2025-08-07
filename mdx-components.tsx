import type { MDXComponents } from 'mdx/types';
import BakeryCard from '@/components/mdx/BakeryCard';
import StageHeader from '@/components/mdx/StageHeader';
import ServiceMapping from '@/components/mdx/ServiceMapping';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--accent)' }}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '0.75rem', marginTop: '2rem' }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '1.5rem' }}>
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p style={{ marginBottom: '1rem', lineHeight: '1.7', color: 'var(--foreground)' }}>
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
        {children}
      </ul>
    ),
    li: ({ children }) => (
      <li style={{ marginBottom: '0.5rem' }}>
        {children}
      </li>
    ),
    code: ({ children }) => (
      <code style={{ 
        backgroundColor: 'var(--code-bg)', 
        padding: '0.2rem 0.4rem', 
        borderRadius: '4px', 
        fontSize: '0.9rem',
        fontFamily: 'monospace'
      }}>
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre style={{ 
        backgroundColor: 'var(--code-bg)', 
        padding: '1rem', 
        borderRadius: '8px', 
        overflow: 'auto',
        marginBottom: '1rem',
        border: '1px solid var(--border)'
      }}>
        {children}
      </pre>
    ),
    // Custom bakery analogy components
    BakeryCard,
    StageHeader,
    ServiceMapping,
    ...components,
  };
}
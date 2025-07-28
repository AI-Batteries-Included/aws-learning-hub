'use client';

import { useState } from 'react';

export default function TestComponent() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      padding: '1.5rem',
      margin: '1rem 0',
      backgroundColor: 'var(--section-bg)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      textAlign: 'center'
    }}>
      <h3 style={{ 
        color: 'var(--accent)', 
        marginBottom: '1rem',
        fontSize: '1.25rem' 
      }}>
        Interactive React Component in MDX
      </h3>
      <p style={{ 
        marginBottom: '1rem',
        color: 'var(--foreground)'
      }}>
        This is a React component embedded in MDX content. Click count: <strong>{count}</strong>
      </p>
      <button
        onClick={() => setCount(count + 1)}
        style={{
          backgroundColor: 'var(--accent)',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1rem',
          transition: 'background-color 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-hover)'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--accent)'}
      >
        Click me!
      </button>
    </div>
  );
}
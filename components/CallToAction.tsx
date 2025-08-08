'use client';

import { useState } from 'react';
import { useScrollAnimation } from './hooks/useScrollAnimation';

export default function CallToAction() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Email submitted:', email);
    setEmail('');
    setIsSubmitting(false);
    alert('Thank you for joining! Check your email for next steps.');
  };

  return (
    <div 
      ref={ref}
      className={`cta-section ${isVisible ? 'visible' : ''}`}
    >
      <div className="cta-container">
        <div className="cta-content">
          <h2 className="cta-title">
            Let&apos;s Make Your Website Happen in a Day
          </h2>
          <p className="cta-subtitle">
            Join us for access to one-on-one consultations, weekly development tutorials, 
            and comprehensive classes to help you get your website off the ground within a day.
          </p>
          
          <form onSubmit={handleSubmit} className="cta-form">
            <div className="form-group">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="email-input"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                {isSubmitting ? 'Joining...' : 'Join Now'}
              </button>
            </div>
          </form>

          <div className="cta-benefits">
            <div className="benefit">
              <span className="benefit-icon">✓</span>
              <span>Free Account</span>
            </div>
            <div className="benefit">
              <span className="benefit-icon">✓</span>
              <span>Hands-on Tutorials</span>
            </div>
            <div className="benefit">
              <span className="benefit-icon">✓</span>
              <span>Expert Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
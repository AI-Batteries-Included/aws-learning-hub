'use client';

import FoundationCard from '../../components/FoundationCard';
import { PageCompletionTracker } from '../../components/progress/PageCompletionTracker';

// Note: metadata export removed due to 'use client' directive
// This page is now client-side rendered for progress tracking

export default function LearnHub() {
  return (
    <div className="container">
      <section className="hero-section">
        <h1 className="hero-title">Learn AWS</h1>
        <p className="hero-subtitle">
          Master Amazon Web Services through structured learning paths, from foundational concepts to advanced components.
        </p>
      </section>

      <section className="content-section">
        <h2 className="section-title">Foundation</h2>
        <p className="section-text">
          Start with the essentials. Build a solid foundation before diving into specific AWS services.
        </p>
        <div className="component-grid">
          <FoundationCard
            title="AWS Bakery Analogy"
            description="Learn AWS through the story of a baker scaling from home kitchen to global distribution"
            href="/learn/aws-bakery-analogy"
            icon="🥖"
          />
          <FoundationCard
            title="Complete Setup Guide"
            description="Configure your AWS account and development environment"
            href="/setup-guide"
            icon="⚙️"
          />
          <FoundationCard
            title="Architecture Overview"
            description="Understand AWS architectural patterns and best practices"
            href="/learn/architecture-overview"
            icon="🏗️"
          />
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-title">Core Components</h2>
        <p className="section-text">
          Deep dive into the essential AWS services that power modern cloud applications.
        </p>
        <div className="component-grid">
          <div className="component-item">
            <h3>S3 Storage</h3>
            <p>Object storage and file management</p>
          </div>
          <div className="component-item">
            <h3>Route 53</h3>
            <p>DNS management and domain routing</p>
          </div>
          <div className="component-item">
            <h3>CloudFront</h3>
            <p>Content delivery network (CDN)</p>
          </div>
          <div className="component-item">
            <h3>Lambda Functions</h3>
            <p>Serverless computing platform</p>
          </div>
          <div className="component-item">
            <h3>SES Email</h3>
            <p>Simple Email Service for sending emails</p>
          </div>
          <div className="component-item">
            <h3>IAM Permissions</h3>
            <p>Identity and access management</p>
          </div>
          <div className="component-item">
            <h3>CloudFormation</h3>
            <p>Infrastructure as Code templates</p>
          </div>
        </div>
      </section>

      {/* Progress Completion Tracker */}
      <section className="completion-tracker-section mt-12 pt-8 border-t border-gray-200">
        <PageCompletionTracker
          pageId="learn-introduction"
          path="/learn"
          title="Learn AWS"
          className="max-w-2xl mx-auto"
          scrollThreshold={70}
          timeThreshold={20}
        />
      </section>
    </div>
  );
}
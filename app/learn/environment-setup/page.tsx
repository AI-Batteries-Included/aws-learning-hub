import ComponentPageTemplate from '../../../components/ComponentPageTemplate';
import EnvironmentSetupContent from '../../../content/foundation/environment-setup.mdx';

export const metadata = {
  title: 'Environment Setup - AWS Learning Hub',
  description: 'Set up your development environment with all the essential tools for AWS development'
};

export default function EnvironmentSetup() {
  return (
    <ComponentPageTemplate
      title="Environment Setup"
      subtitle="Configure your development environment with all the essential tools for AWS development."
      difficulty="beginner"
      estimatedTime="45 minutes"
      category="Foundation"
      awsServices={['AWS CLI', 'SAM CLI', 'CloudFormation']}
      infographicPath="/images/infographics/environment-setup-simple.svg"
      infographicAlt="Development Environment Setup Guide"
      prerequisites={[
        {
          title: 'AWS Basics',
          href: '/learn/aws-basics',
          completed: false
        }
      ]}
      nextSteps={[
        {
          title: 'VS Code Setup',
          href: '/learn/vscode-setup',
          description: 'Configure VS Code for AWS development'
        },
        {
          title: 'GitHub Fundamentals',
          href: '/learn/github-fundamentals',
          description: 'Learn version control basics'
        }
      ]}
    >
      <EnvironmentSetupContent />
    </ComponentPageTemplate>
  );
}
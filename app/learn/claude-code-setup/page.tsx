import ComponentPageTemplate from '../../../components/ComponentPageTemplate';
import ClaudeCodeSetupContent from '../../../content/foundation/claude-code-setup.mdx';

export const metadata = {
  title: 'Claude Code Setup - AWS Learning Hub',
  description: 'Set up and optimize Claude Code for accelerated AWS development with AI-powered assistance and best practices'
};

export default function ClaudeCodeSetup() {
  return (
    <ComponentPageTemplate
      title="Claude Code Setup"
      subtitle="Set up and optimize Claude Code for accelerated AWS development with AI-powered assistance and best practices."
      difficulty="beginner"
      estimatedTime="20 minutes"
      category="Development Tools"
      awsServices={['Claude API', 'AWS SDK', 'AWS CLI']}
      infographicPath="/images/infographics/claude-simple.svg"
      infographicAlt="Claude Code Setup CLI Interface and Capabilities"
      prerequisites={[
        {
          title: 'Environment Setup',
          href: '/setup-guide',
          completed: false
        },
        {
          title: 'VS Code Setup',
          href: '/learn/vscode-setup',
          completed: false
        }
      ]}
      nextSteps={[
        {
          title: 'S3 Storage',
          href: '/learn/s3-storage',
          description: 'Start building with AWS services'
        },
        {
          title: 'Architecture Overview',
          href: '/learn/architecture-overview',
          description: 'Learn AWS design patterns'
        }
      ]}
    >
      <ClaudeCodeSetupContent />
    </ComponentPageTemplate>
  );
}
import ComponentPageTemplate from '../../../components/ComponentPageTemplate';
import VSCodeSetupContent from '../../../content/foundation/vscode-setup.mdx';

export const metadata = {
  title: 'VS Code Setup - AWS Learning Hub',
  description: 'Configure Visual Studio Code for an optimal AWS development experience with essential extensions and workflows'
};

export default function VSCodeSetup() {
  return (
    <ComponentPageTemplate
      title="VS Code Setup"
      subtitle="Configure Visual Studio Code for an optimal AWS development experience with essential extensions and workflows."
      difficulty="beginner"
      estimatedTime="25 minutes"
      category="Development Tools"
      awsServices={['AWS Toolkit', 'CloudFormation', 'SAM CLI']}
      infographicPath="/images/infographics/vscode-simple.svg"
      infographicAlt="VS Code Setup Interface and Essential Extensions"
      prerequisites={[
        {
          title: 'Environment Setup',
          href: '/setup-guide',
          completed: false
        }
      ]}
      nextSteps={[
        {
          title: 'Claude Code Setup',
          href: '/learn/claude-code-setup',
          description: 'Add AI-powered coding assistant'
        },
        {
          title: 'GitHub Fundamentals',
          href: '/learn/github-fundamentals',
          description: 'Learn version control integration'
        }
      ]}
    >
      <VSCodeSetupContent />
    </ComponentPageTemplate>
  );
}
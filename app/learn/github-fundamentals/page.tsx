import ComponentPageTemplate from '../../../components/ComponentPageTemplate';
import GitHubFundamentalsContent from '../../../content/foundation/github-fundamentals.mdx';

export const metadata = {
  title: 'GitHub Fundamentals - AWS Learning Hub',
  description: 'Master essential GitHub skills for AWS development workflows including version control, collaboration, and CI/CD integration'
};

export default function GitHubFundamentals() {
  return (
    <ComponentPageTemplate
      title="GitHub Fundamentals"
      subtitle="Master essential GitHub skills for AWS development workflows including version control, collaboration, and CI/CD integration."
      difficulty="beginner"
      estimatedTime="35 minutes"
      category="Development Tools"
      awsServices={['CodeCommit', 'CodePipeline', 'CodeBuild']}
      infographicPath="/images/infographics/github-simple.svg"
      infographicAlt="GitHub Fundamentals Git Workflow and Collaboration"
      prerequisites={[
        {
          title: 'Environment Setup',
          href: '/setup-guide',
          completed: false
        }
      ]}
      nextSteps={[
        {
          title: 'VS Code Setup',
          href: '/learn/vscode-setup',
          description: 'Configure VS Code for Git integration'
        },
        {
          title: 'Claude Code Setup',
          href: '/learn/claude-code-setup',
          description: 'Set up AI-powered development tools'
        }
      ]}
    >
      <GitHubFundamentalsContent />
    </ComponentPageTemplate>
  );
}
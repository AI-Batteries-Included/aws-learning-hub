import MDXPageTemplate from '../../../components/MDXPageTemplate';
import ClaudeCodeSetupContent from '../../../content/foundation/claude-code-setup.mdx';

export const metadata = {
  title: 'Claude Code Setup - AWS Learning Hub',
  description: 'Set up and optimize Claude Code for accelerated AWS development with AI-powered assistance and best practices'
};

export default function ClaudeCodeSetup() {
  return (
    <MDXPageTemplate 
      title="Claude Code Setup"
      subtitle="Set up and optimize Claude Code for accelerated AWS development with AI-powered assistance and best practices."
    >
      <ClaudeCodeSetupContent />
    </MDXPageTemplate>
  );
}
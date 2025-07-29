import MDXPageTemplate from '../../../components/MDXPageTemplate';
import EnvironmentSetupContent from '../../../content/foundation/environment-setup.mdx';

export const metadata = {
  title: 'Environment Setup - AWS Learning Hub',
  description: 'Set up your development environment with all the essential tools for AWS development'
};

export default function EnvironmentSetup() {
  return (
    <MDXPageTemplate 
      title="Environment Setup"
      subtitle="Configure your development environment with all the essential tools for AWS development."
    >
      <EnvironmentSetupContent />
    </MDXPageTemplate>
  );
}
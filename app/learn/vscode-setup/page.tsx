import MDXPageTemplate from '../../../components/MDXPageTemplate';
import VSCodeSetupContent from '../../../content/foundation/vscode-setup.mdx';

export const metadata = {
  title: 'VS Code Setup - AWS Learning Hub',
  description: 'Configure Visual Studio Code for an optimal AWS development experience with essential extensions and workflows'
};

export default function VSCodeSetup() {
  return (
    <MDXPageTemplate 
      title="VS Code Setup"
      subtitle="Configure Visual Studio Code for an optimal AWS development experience with essential extensions and workflows."
    >
      <VSCodeSetupContent />
    </MDXPageTemplate>
  );
}
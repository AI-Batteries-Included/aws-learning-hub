import MDXPageTemplate from '../../../components/MDXPageTemplate';
import GitHubFundamentalsContent from '../../../content/foundation/github-fundamentals.mdx';

export const metadata = {
  title: 'GitHub Fundamentals - AWS Learning Hub',
  description: 'Master essential GitHub skills for AWS development workflows including version control, collaboration, and CI/CD integration'
};

export default function GitHubFundamentals() {
  return (
    <MDXPageTemplate 
      title="GitHub Fundamentals"
      subtitle="Master essential GitHub skills for AWS development workflows including version control, collaboration, and CI/CD integration."
    >
      <GitHubFundamentalsContent />
    </MDXPageTemplate>
  );
}
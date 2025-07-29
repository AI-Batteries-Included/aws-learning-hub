import MDXPageTemplate from '../../../components/MDXPageTemplate';
import ArchitectureOverviewContent from '../../../content/foundation/architecture-overview.mdx';

export const metadata = {
  title: 'Architecture Overview - AWS Learning Hub',
  description: 'Learn fundamental AWS architectural patterns and design principles from the Well-Architected Framework'
};

export default function ArchitectureOverview() {
  return (
    <MDXPageTemplate 
      title="Architecture Overview"
      subtitle="Learn the fundamental architectural patterns and design principles that guide successful AWS implementations."
    >
      <ArchitectureOverviewContent />
    </MDXPageTemplate>
  );
}
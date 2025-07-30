import ComponentPageTemplate from '../../../components/ComponentPageTemplate';
import ArchitectureOverviewContent from '../../../content/foundation/architecture-overview.mdx';

export const metadata = {
  title: 'Architecture Overview - AWS Learning Hub',
  description: 'Learn fundamental AWS architectural patterns and design principles from the Well-Architected Framework'
};

export default function ArchitectureOverview() {
  return (
    <ComponentPageTemplate
      title="Architecture Overview"
      subtitle="Learn the fundamental architectural patterns and design principles that guide successful AWS implementations."
      difficulty="beginner"
      estimatedTime="40 minutes"
      category="Foundation"
      awsServices={['Well-Architected Tool', 'CloudFormation', 'CloudWatch']}
      infographicPath="/images/infographics/architecture-simple.svg"
      infographicAlt="AWS Architecture Overview and Well-Architected Pillars"
      prerequisites={[
        {
          title: 'AWS Basics',
          href: '/learn/aws-basics',
          completed: false
        }
      ]}
      nextSteps={[
        {
          title: 'S3 Storage',
          href: '/learn/s3-storage',
          description: 'Start with fundamental storage architecture'
        },
        {
          title: 'Lambda Functions',
          href: '/learn/lambda-functions',
          description: 'Learn serverless compute patterns'
        }
      ]}
    >
      <ArchitectureOverviewContent />
    </ComponentPageTemplate>
  );
}
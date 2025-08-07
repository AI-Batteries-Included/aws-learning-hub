import ComponentPageTemplate from '../../../components/ComponentPageTemplate';
import AWSBasicsContent from '../../../content/foundation/aws-basics.mdx';

export const metadata = {
  title: 'AWS Basics - AWS Learning Hub',
  description: 'Master fundamental AWS concepts and core services that form the foundation of cloud computing'
};

export default function AWSBasics() {
  return (
    <ComponentPageTemplate
      title="AWS Basics"
      subtitle="Master the fundamental concepts and core services that form the foundation of Amazon Web Services."
      difficulty="beginner"
      estimatedTime="30 minutes"
      category="Foundation"
      awsServices={['AWS Console', 'IAM', 'Billing']}
      infographicPath="/images/infographics/aws-basics-simple.svg"
      infographicAlt="AWS Fundamentals Overview Diagram"
      prerequisites={[]}
      nextSteps={[
        {
          title: 'Environment Setup',
          href: '/setup-guide',
          description: 'Configure your development environment'
        },
        {
          title: 'Architecture Overview',
          href: '/learn/architecture-overview',
          description: 'Learn AWS architecture patterns'
        }
      ]}
    >
      <AWSBasicsContent />
    </ComponentPageTemplate>
  );
}
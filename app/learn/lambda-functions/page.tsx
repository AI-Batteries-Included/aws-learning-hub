import ComponentPageTemplate from '../../../components/ComponentPageTemplate';
import LambdaContent from '../../../content/components/lambda-optimized.mdx';

export const metadata = {
  title: 'AWS Lambda Functions - AWS Learning Hub',
  description: 'Master serverless computing with AWS Lambda - build and run applications without managing servers. Learn function development, event triggers, and optimization techniques.'
};

export default function LambdaFunctions() {
  return (
    <ComponentPageTemplate
      title="AWS Lambda Functions"
      subtitle="Master serverless computing with AWS Lambda - build and run applications without managing servers. Learn function development, event triggers, and optimization techniques."
      difficulty="intermediate"
      estimatedTime="60 minutes"
      category="Compute"
      awsServices={['Lambda', 'API Gateway', 'S3', 'DynamoDB', 'CloudWatch', 'IAM']}
      infographicPath="/images/infographics/lambda-simple.svg"
      infographicAlt="AWS Lambda Functions Architecture and Event Triggers"
      prerequisites={[
        {
          title: 'AWS Basics',
          href: '/learn/aws-basics',
          completed: false
        },
        {
          title: 'Environment Setup',
          href: '/setup-guide',
          completed: false
        },
        {
          title: 'S3 Storage',
          href: '/learn/s3-storage',
          completed: false
        }
      ]}
      nextSteps={[
        {
          title: 'Back to AWS Services',
          href: '/learn/aws-services',
          description: 'Explore other AWS services and their use cases'
        },
        {
          title: 'S3 Storage',
          href: '/learn/s3-storage',
          description: 'Process S3 events with Lambda functions'
        },
        {
          title: 'CloudFormation',
          href: '/learn/cloudformation',
          description: 'Deploy Lambda infrastructure as code'
        },
        {
          title: 'IAM Permissions',
          href: '/learn/iam-permissions',
          description: 'Secure your Lambda functions with proper permissions'
        }
      ]}
    >
      <LambdaContent />
    </ComponentPageTemplate>
  );
}
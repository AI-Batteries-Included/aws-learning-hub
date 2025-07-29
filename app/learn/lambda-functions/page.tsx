import ComponentPageTemplate from '../../../components/ComponentPageTemplate';
import LambdaContent from '../../../content/components/lambda.mdx';

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
      prerequisites={[
        {
          title: 'AWS Basics',
          href: '/learn/aws-basics',
          completed: false
        },
        {
          title: 'Environment Setup',
          href: '/learn/environment-setup',
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
          title: 'API Gateway',
          href: '/learn/api-gateway',
          description: 'Create REST APIs that trigger your Lambda functions'
        },
        {
          title: 'DynamoDB',
          href: '/learn/dynamodb',
          description: 'Add serverless databases to your Lambda applications'
        },
        {
          title: 'CloudFormation',
          href: '/learn/cloudformation',
          description: 'Deploy Lambda infrastructure as code'
        }
      ]}
    >
      <LambdaContent />
    </ComponentPageTemplate>
  );
}
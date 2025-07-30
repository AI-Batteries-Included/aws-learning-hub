import ComponentPageTemplate from '../../../components/ComponentPageTemplate';
import CloudFormationContent from '../../../content/components/cloudformation.mdx';

export const metadata = {
  title: 'AWS CloudFormation - AWS Learning Hub',
  description: 'Master Infrastructure as Code with AWS CloudFormation. Learn to define, deploy, and manage AWS resources using templates, stacks, and automation best practices.'
};

export default function CloudFormation() {
  return (
    <ComponentPageTemplate
      title="AWS CloudFormation"
      subtitle="Master Infrastructure as Code with AWS CloudFormation. Learn to define, deploy, and manage AWS resources using templates, stacks, and automation best practices."
      difficulty="advanced"
      estimatedTime="70 minutes"
      category="Infrastructure"
      awsServices={['CloudFormation', 'IAM', 'S3', 'Lambda', 'API Gateway', 'CloudWatch']}
      prerequisites={[
        {
          title: 'AWS Basics',
          href: '/learn/aws-basics',
          completed: false
        },
        {
          title: 'IAM Permissions',
          href: '/learn/iam-permissions',
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
          title: 'Lambda Functions',
          href: '/learn/lambda-functions',
          description: 'Deploy serverless functions with CloudFormation'
        },
        {
          title: 'API Gateway',
          href: '/learn/api-gateway',
          description: 'Create REST APIs using infrastructure as code'
        },
        {
          title: 'CI/CD Pipeline',
          href: '/learn/cicd-pipeline',
          description: 'Automate CloudFormation deployments'
        }
      ]}
    >
      <CloudFormationContent />
    </ComponentPageTemplate>
  );
}
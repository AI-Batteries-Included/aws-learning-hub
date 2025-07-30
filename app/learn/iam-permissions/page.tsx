import ComponentPageTemplate from '../../../components/ComponentPageTemplate';
import IAMContent from '../../../content/components/iam-optimized.mdx';

export const metadata = {
  title: 'AWS IAM Permissions - AWS Learning Hub',
  description: 'Secure your AWS resources with proper identity and access management policies and best practices. Learn users, roles, policies, and security patterns.'
};

export default function IAMPermissions() {
  return (
    <ComponentPageTemplate
      title="AWS IAM Permissions"
      subtitle="Secure your AWS resources with proper identity and access management policies and best practices. Learn users, roles, policies, and security patterns."
      difficulty="intermediate"
      estimatedTime="50 minutes"
      category="Security"
      awsServices={['IAM', 'CloudTrail', 'Access Analyzer', 'Secrets Manager', 'STS']}
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
        }
      ]}
      nextSteps={[
        {
          title: 'CloudTrail Logging',
          href: '/learn/cloudtrail-logging',
          description: 'Monitor and audit all API calls and user activity'
        },
        {
          title: 'Secrets Manager',
          href: '/learn/secrets-manager',
          description: 'Securely store and rotate database credentials'
        },
        {
          title: 'CloudFormation',
          href: '/learn/cloudformation',
          description: 'Deploy IAM infrastructure as code'
        }
      ]}
    >
      <IAMContent />
    </ComponentPageTemplate>
  );
}
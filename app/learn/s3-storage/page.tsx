import ComponentPageTemplate from '../../../components/ComponentPageTemplate';
import S3StorageContent from '../../../content/components/s3.mdx';

export const metadata = {
  title: 'Amazon S3 Storage - AWS Learning Hub',
  description: 'Master Amazon S3 object storage - the foundation of most AWS architectures. Learn storage classes, security, and best practices.'
};

export default function S3Storage() {
  return (
    <ComponentPageTemplate
      title="Amazon S3 Storage"
      subtitle="Master Amazon S3 object storage - the foundation of most AWS architectures. Learn how to store, secure, and manage data at scale."
      difficulty="beginner"
      estimatedTime="45 minutes"
      category="Storage"
      awsServices={['S3', 'IAM', 'CloudFront', 'KMS']}
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
          title: 'CloudFront CDN',
          href: '/learn/cloudfront',
          description: 'Learn to distribute S3 content globally with CloudFront'
        },
        {
          title: 'Lambda Functions',
          href: '/learn/lambda-functions',
          description: 'Process S3 events with serverless functions'
        },
        {
          title: 'IAM Permissions',
          href: '/learn/iam-permissions',
          description: 'Secure your S3 buckets with proper access controls'
        }
      ]}
    >
      <S3StorageContent />
    </ComponentPageTemplate>
  );
}
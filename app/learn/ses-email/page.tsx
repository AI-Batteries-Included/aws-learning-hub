import ComponentPageTemplate from '../../../components/ComponentPageTemplate';
import SESContent from '../../../content/components/ses-optimized.mdx';

export const metadata = {
  title: 'Amazon SES Email - AWS Learning Hub',
  description: 'Send transactional and marketing emails reliably with Amazon Simple Email Service. Learn domain verification, email templates, and delivery optimization.'
};

export default function SESEmail() {
  return (
    <ComponentPageTemplate
      title="Amazon SES Email"
      subtitle="Send transactional and marketing emails reliably with Amazon Simple Email Service. Learn domain verification, email templates, and delivery optimization."
      difficulty="intermediate"
      estimatedTime="45 minutes"
      category="Application Services"
      awsServices={['SES', 'Route 53', 'Lambda', 'S3', 'CloudWatch', 'SNS']}
      infographicPath="/images/infographics/ses-simple.svg"
      infographicAlt="Amazon SES Email Service Architecture and Delivery Flow"
      prerequisites={[
        {
          title: 'AWS Basics',
          href: '/learn/aws-basics',
          completed: false
        },
        {
          title: 'Route 53 DNS',
          href: '/learn/route-53',
          completed: false
        }
      ]}
      nextSteps={[
        {
          title: 'Lambda Functions',
          href: '/learn/lambda-functions',
          description: 'Process emails with serverless functions'
        },
        {
          title: 'SNS Notifications',
          href: '/learn/sns-notifications',
          description: 'Combine email with SMS and push notifications'
        },
        {
          title: 'CloudFormation',
          href: '/learn/cloudformation',
          description: 'Deploy email infrastructure as code'
        }
      ]}
    >
      <SESContent />
    </ComponentPageTemplate>
  );
}
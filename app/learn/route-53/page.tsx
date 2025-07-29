import ComponentPageTemplate from '../../../components/ComponentPageTemplate';
import Route53Content from '../../../content/components/route53.mdx';

export const metadata = {
  title: 'Amazon Route 53 DNS - AWS Learning Hub',
  description: 'Configure DNS management and intelligent routing with Amazon\'s highly available domain name system. Learn how to register domains, manage DNS records, and implement advanced routing policies.'
};

export default function Route53() {
  return (
    <ComponentPageTemplate
      title="Amazon Route 53 DNS"
      subtitle="Configure DNS management and intelligent routing with Amazon's highly available domain name system. Learn how to register domains, manage DNS records, and implement advanced routing policies."
      difficulty="intermediate"
      estimatedTime="55 minutes"
      category="Networking"
      awsServices={['Route 53', 'CloudFront', 'Application Load Balancer', 'S3', 'CloudWatch']}
      prerequisites={[
        {
          title: 'AWS Basics',
          href: '/learn/aws-basics',
          completed: false
        },
        {
          title: 'CloudFront CDN',
          href: '/learn/cloudfront',
          completed: false
        }
      ]}
      nextSteps={[
        {
          title: 'Certificate Manager',
          href: '/learn/certificate-manager',
          description: 'Secure your domains with SSL/TLS certificates'
        },
        {
          title: 'Application Load Balancer',
          href: '/learn/application-load-balancer',
          description: 'Route traffic to multiple targets with health checks'
        },
        {
          title: 'CloudFormation',
          href: '/learn/cloudformation',
          description: 'Deploy DNS infrastructure as code'
        }
      ]}
    >
      <Route53Content />
    </ComponentPageTemplate>
  );
}
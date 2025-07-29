import ComponentPageTemplate from '../../../components/ComponentPageTemplate';
import CloudFrontContent from '../../../content/components/cloudfront.mdx';

export const metadata = {
  title: 'Amazon CloudFront CDN - AWS Learning Hub',
  description: 'Accelerate content delivery worldwide with Amazon\'s global content delivery network. Learn how to distribute static and dynamic content with low latency and high performance.'
};

export default function CloudFront() {
  return (
    <ComponentPageTemplate
      title="Amazon CloudFront CDN"
      subtitle="Accelerate content delivery worldwide with Amazon's global content delivery network. Learn how to distribute static and dynamic content with low latency and high performance."
      difficulty="intermediate"
      estimatedTime="50 minutes"
      category="Networking"
      awsServices={['CloudFront', 'S3', 'Route 53', 'Certificate Manager', 'WAF']}
      prerequisites={[
        {
          title: 'S3 Storage',
          href: '/learn/s3-storage',
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
          title: 'Route 53 DNS',
          href: '/learn/route-53',
          description: 'Set up custom domains and DNS routing for your CDN'
        },
        {
          title: 'Lambda Functions',
          href: '/learn/lambda-functions',
          description: 'Add edge computing with Lambda@Edge functions'
        },
        {
          title: 'Certificate Manager',
          href: '/learn/certificate-manager',
          description: 'Secure your CDN with SSL/TLS certificates'
        }
      ]}
    >
      <CloudFrontContent />
    </ComponentPageTemplate>
  );
}
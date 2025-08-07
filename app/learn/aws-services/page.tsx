import { Metadata } from 'next'
import MDXPageTemplate from '@/components/MDXPageTemplate'
import AWSServicesContent from '@/content/foundation/aws-services-overview.mdx'

export const metadata: Metadata = {
  title: 'AWS Services Overview - AWS Learning Hub',
  description: 'Comprehensive guide to AWS services including storage, compute, networking, security, and infrastructure services with detailed explanations and use cases.',
}

export default function AWSServices() {
  return (
    <MDXPageTemplate
      title="AWS Services Overview"
      subtitle="Explore the comprehensive suite of AWS services that power modern cloud applications, from storage and compute to security and infrastructure."
    >
      <AWSServicesContent />
    </MDXPageTemplate>
  )
}
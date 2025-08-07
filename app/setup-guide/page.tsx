import { Metadata } from 'next'
import MDXPageTemplate from '@/components/MDXPageTemplate'
import SetupGuideContent from '@/content/foundation/setup-guide.mdx'

export const metadata: Metadata = {
  title: 'Complete AWS Setup Guide - AWS Learning Hub',
  description: 'Comprehensive step-by-step guide to set up your AWS account, development environment, and essential tools for AWS development.',
}

export default function SetupGuide() {
  return (
    <MDXPageTemplate
      title="Complete AWS Setup Guide"
      subtitle="Your comprehensive resource for setting up AWS account, development environment, and essential tools from zero to ready."
    >
      <SetupGuideContent />
    </MDXPageTemplate>
  )
}
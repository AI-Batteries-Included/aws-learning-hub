import { Metadata } from 'next'
import MDXPageTemplate from '@/components/MDXPageTemplate'
import Stage1Content from '@/content/foundation/aws-bakery-stage-1.mdx'

export const metadata: Metadata = {
  title: 'Stage 1: Home Kitchen - AWS Bakery Analogy',
  description: 'Learn about local development through Sarah\'s home kitchen experiments with peach cobbler recipes.',
}

export default function Stage1() {
  return (
    <MDXPageTemplate
      title="Stage 1: Home Kitchen"
      subtitle="Conceptualizing the Website (Local Development)"
    >
      <Stage1Content />
    </MDXPageTemplate>
  )
}
import { Metadata } from 'next'
import MDXPageTemplate from '@/components/MDXPageTemplate'
import Stage2Content from '@/content/foundation/aws-bakery-stage-2.mdx'

export const metadata: Metadata = {
  title: 'Stage 2: Recipe Library - AWS Bakery Analogy',
  description: 'Learn about version control and GitHub through Sarah\'s experience with the town library storage system.',
}

export default function Stage2() {
  return (
    <MDXPageTemplate
      title="Stage 2: Recipe Library"
      subtitle="Recipe Kits and Version Control"
    >
      <Stage2Content />
    </MDXPageTemplate>
  )
}
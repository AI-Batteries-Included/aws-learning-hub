import { Metadata } from 'next'
import MDXPageTemplate from '@/components/MDXPageTemplate'
import Stage4Content from '@/content/foundation/aws-bakery-stage-4.mdx'

export const metadata: Metadata = {
  title: 'Stage 4: Commercial Partnership - AWS Bakery Analogy',
  description: 'Learn about AWS cloud services through Sarah\'s partnership with a commercial bakery chain for global distribution.',
}

export default function Stage4() {
  return (
    <MDXPageTemplate
      title="Stage 4: Commercial Partnership"
      subtitle="AWS Cloud Services"
    >
      <Stage4Content />
    </MDXPageTemplate>
  )
}
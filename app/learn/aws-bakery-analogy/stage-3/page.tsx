import { Metadata } from 'next'
import MDXPageTemplate from '@/components/MDXPageTemplate'
import Stage3Content from '@/content/foundation/aws-bakery-stage-3.mdx'

export const metadata: Metadata = {
  title: 'Stage 3: Home Distribution - AWS Bakery Analogy',
  description: 'Learn about home server challenges and scaling limitations through Sarah\'s home kitchen distribution struggles.',
}

export default function Stage3() {
  return (
    <MDXPageTemplate
      title="Stage 3: Home Distribution"
      subtitle="Home Kitchen Struggles"
    >
      <Stage3Content />
    </MDXPageTemplate>
  )
}
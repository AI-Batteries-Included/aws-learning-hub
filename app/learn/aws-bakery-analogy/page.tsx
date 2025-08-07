import { Metadata } from 'next'
import MDXPageTemplate from '@/components/MDXPageTemplate'
import BakeryAnalogyOverview from '@/content/foundation/aws-bakery-analogy-overview.mdx'

export const metadata: Metadata = {
  title: 'From Kitchen to Cloud: A Baker\'s Guide to AWS',
  description: 'Learn AWS services through the engaging story of Sarah, a small-town baker who scales her peach cobbler business from a home kitchen to global distribution using cloud services.',
}

export default function AWSBakeryAnalogy() {
  return (
    <MDXPageTemplate
      title="From Kitchen to Cloud: A Baker's Guide to AWS"
      subtitle="Learn AWS services through the engaging story of Sarah, a baker who scales her peach cobbler business from a home kitchen to global distribution using cloud services."
    >
      <BakeryAnalogyOverview />
    </MDXPageTemplate>
  )
}
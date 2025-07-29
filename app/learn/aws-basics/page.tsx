import MDXPageTemplate from '../../../components/MDXPageTemplate';
import AWSBasicsContent from '../../../content/foundation/aws-basics.mdx';

export const metadata = {
  title: 'AWS Basics - AWS Learning Hub',
  description: 'Master fundamental AWS concepts and core services that form the foundation of cloud computing'
};

export default function AWSBasics() {
  return (
    <MDXPageTemplate 
      title="AWS Basics"
      subtitle="Master the fundamental concepts and core services that form the foundation of Amazon Web Services."
    >
      <AWSBasicsContent />
    </MDXPageTemplate>
  );
}
export const metadata = {
  title: 'Contact - AWS Learning Hub',
  description: 'Get in touch with the AWS Learning Hub team for questions and feedback'
};

export default function Contact() {
  return (
    <div className="container">
      <section className="hero-section">
        <h1 className="hero-title">Contact Us</h1>
        <p className="hero-subtitle">
          Have questions, suggestions, or feedback? We&apos;d love to hear from you.
        </p>
      </section>

      <section className="content-section">
        <h2 className="section-title">Get in Touch</h2>
        <p className="section-text">
          Whether you have questions about our content, suggestions for new topics, or feedback on existing materials, we&apos;re here to help.
        </p>
        
        <div className="component-grid">
          <div className="component-item">
            <h3>General Questions</h3>
            <p>Questions about content, learning paths, or getting started with AWS</p>
          </div>
          <div className="component-item">
            <h3>Content Suggestions</h3>
            <p>Ideas for new topics, services to cover, or improvements to existing content</p>
          </div>
          <div className="component-item">
            <h3>Technical Issues</h3>
            <p>Problems with code examples, broken links, or technical difficulties</p>
          </div>
          <div className="component-item">
            <h3>Feedback</h3>
            <p>Share your learning experience and help us improve our content</p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-title">Ways to Connect</h2>
        <ul className="path-list">
          <li className="path-item">
            <div className="path-title">Email</div>
            <div className="path-description">
              Send us an email with your questions or feedback (contact information will be added soon)
            </div>
          </li>
          <li className="path-item">
            <div className="path-title">GitHub</div>
            <div className="path-description">
              Report issues, suggest improvements, or contribute to our open-source content
            </div>
          </li>
          <li className="path-item">
            <div className="path-title">Community</div>
            <div className="path-description">
              Join our learning community to connect with other AWS learners and practitioners
            </div>
          </li>
        </ul>
      </section>

      <section className="content-section">
        <h2 className="section-title">Response Time</h2>
        <p className="section-text">
          We strive to respond to all inquiries within 2-3 business days. For urgent technical issues, please include detailed information about your environment and the specific problem you&apos;re experiencing.
        </p>
      </section>
    </div>
  );
}
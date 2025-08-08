'use client';

import ScrollSection from '@/components/ScrollSection';
import CollapsibleSection from '@/components/CollapsibleSection';
import StickyNav from '@/components/StickyNav';
import CallToAction from '@/components/CallToAction';
import { useAutoCollapseManager } from '@/components/hooks/useAutoCollapseManager';
import './animations.css';

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'overview', label: 'Overview' },
  { id: 'stage-1', label: 'Stage 1' },
  { id: 'stage-2', label: 'Stage 2' },
  { id: 'stage-3', label: 'Stage 3' },
  { id: 'stage-4', label: 'Stage 4' },
  { id: 'join', label: 'Join Us' },
];

const collapsibleSectionIds = ['overview', 'stage-1', 'stage-2', 'stage-3', 'stage-4'];

export default function Home() {
  const {
    isSectionExpanded,
    expandSection,
    collapseSection
  } = useAutoCollapseManager({
    sectionIds: collapsibleSectionIds,
    threshold: 0.4,
    rootMargin: '-20% 0px -20% 0px',
    enabled: true
  });

  return (
    <div className="single-page-app">
      <StickyNav items={navItems} />
      
      {/* Hero Section */}
      <ScrollSection id="hero" className="hero-section hero-gradient" background="white">
        <div className="hero-gradient-box">
          <div className="hero-content">
            <h1 className="hero-title">From Kitchen to Cloud</h1>
            <p className="hero-subtitle">
              A Baker&apos;s Guide to AWS
            </p>
            <p className="hero-description">
              Using AWS to build and host your website can be daunting at first, especially as a complete beginner.
              <br /><br />
              We&apos;ll put you in the shoes of an ambitious baker with a new recipe idea -- and in no time, we&apos;ll show you just how simple AWS makes our webdev journey.
            </p>
          </div>
        </div>
      </ScrollSection>

      {/* Overview Section */}
      <CollapsibleSection 
        id="overview" 
        title="The Journey Begins" 
        animation="fade-in" 
        background="white"
        defaultExpanded={true}
        highlightColor="blue"
        enableCollapse={false}
        autoCollapseExpanded={isSectionExpanded('overview')}
        onAutoCollapseToggle={(expanded: boolean) => expanded ? expandSection('overview') : collapseSection('overview')}
      >
        <div className="text-container">
          <div className="main-text-box">
            <p>As a new web developer with an idea for a website, you&apos;re like a baker with an idea for a great peach cobbler.</p>
            <p>Just as you aren&apos;t the first person to make a website, the baker isn&apos;t the first person to ever make a cobbler – we have vast amounts of knowledge to reference to develop our ideas.</p>
            <p>Your website, like a recipe kit for peach cobbler, begins as a set of ideas and concepts rather than a fully-explored and sophisticated set of instructions.</p>
            <p>Here, we think about the creation process and what we want on display. What components do we need to make our end product more than usable, but enjoyable? Just as the baker ponders between a more French or Southern-style recipe, we as the developer will consider what libraries of CSS elements we&apos;ll draw from. Sliced vs. cubed peaches would result in a subtle difference in the baker&apos;s end product – so would something like a dropdown menu vs. static lists.</p>
          </div>
        </div>
        <div className="svg-container">
          <div className="svg-placeholder">
            <svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="300" height="200" fill="#f7fafc" stroke="#e2e8f0" strokeWidth="2" rx="8"/>
              <text x="150" y="100" textAnchor="middle" dominantBaseline="middle" fill="#718096" fontSize="16">
                SVG Content
              </text>
            </svg>
          </div>
        </div>
      </CollapsibleSection>

      {/* Stage 1: Home Kitchen */}
      <CollapsibleSection 
        id="stage-1" 
        title="Stage 1: Home Kitchen" 
        subtitle="Local Development"
        animation="fade-up" 
        background="gradient-2"
        defaultExpanded={true}
        highlightColor="purple"
        enableCollapse={false}
        autoCollapseExpanded={isSectionExpanded('stage-1')}
        onAutoCollapseToggle={(expanded: boolean) => expanded ? expandSection('stage-1') : collapseSection('stage-1')}
      >
        <div className="text-container">
          <div className="main-text-box">
            <p>Once you have your ideas gathered, we refine them into code – a standardized method that gives anyone with the right tools the ability to view our final product.</p>
            <p>In our case, we have a package of code that we can use to compile a viewable website.</p>
            <p>In the baker&apos;s case, they have a package of a recipe and ingredients that they can use to assemble a peach cobbler.</p>
          </div>
        </div>
        <div className="svg-container">
          <div className="svg-placeholder">
            <svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="300" height="200" fill="#f7fafc" stroke="#e2e8f0" strokeWidth="2" rx="8"/>
              <text x="150" y="100" textAnchor="middle" dominantBaseline="middle" fill="#718096" fontSize="16">
                SVG Content
              </text>
            </svg>
          </div>
        </div>
        <div className="text-container">
          <div className="main-text-box">
            <p>In both cases, we took our rough ideas and turned them into standardized, actionable language: others can look at the code/recipe kit and know &quot;aha, this will produce x&quot; and be able to replicate it for themselves, provided they can access this information.</p>
          </div>
        </div>
      </CollapsibleSection>

      {/* Stage 2: Recipe Library */}
      <CollapsibleSection 
        id="stage-2" 
        title="Stage 2: Recipe Library" 
        subtitle="Version Control"
        animation="fade-up" 
        delay={100} 
        background="light"
        defaultExpanded={true}
        highlightColor="green"
        enableCollapse={false}
        autoCollapseExpanded={isSectionExpanded('stage-2')}
        onAutoCollapseToggle={(expanded: boolean) => expanded ? expandSection('stage-2') : collapseSection('stage-2')}
      >
        <div className="text-container">
          <div className="main-text-box">
            <p>In both cases, access to our code/recipe kit is what limits others from enjoying the fruits of our labor.</p>
            <p>The baker learns about a free program: their local Library accepts copies of their recipe, even storing the ingredients someone else would need to make it on their own. Here, the Library isn&apos;t making your cobbler, displaying it, or advertising it – they&apos;re simply storing the latest version of the recipe kit that you&apos;ve provided, keeping track of the changes you&apos;ve made to it, and freely giving the recipe kit to anyone who requests it.</p>
          </div>
        </div>
        <div className="svg-container">
          <div className="svg-placeholder">
            <svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="300" height="200" fill="#f7fafc" stroke="#e2e8f0" strokeWidth="2" rx="8"/>
              <text x="150" y="100" textAnchor="middle" dominantBaseline="middle" fill="#718096" fontSize="16">
                SVG Content
              </text>
            </svg>
          </div>
        </div>
        <div className="text-container">
          <div className="main-text-box">
            <p>For developers, the Library is like GitHub. We can take the code that compiles our webpage locally, upload it to GitHub, and use its branch features to test and implement any changes we make. GitHub, like the Library, will store our packaged data as long as we keep them updated – and, if we allow it, give those who request it the ability to download our code.</p>
            <p>Whether it&apos;s the Library or GitHub, even though we&apos;ve distributed the parts that make up our product, we still haven&apos;t made the website/cobbler available as a finished product. The Library doesn&apos;t have ovens and food displays, and GitHub won&apos;t compile and host a live version of your website.</p>
          </div>
        </div>
      </CollapsibleSection>

      {/* Stage 3: Home Distribution */}
      <CollapsibleSection 
        id="stage-3" 
        title="Stage 3: Home Distribution" 
        subtitle="Static Hosting"
        animation="fade-up" 
        delay={200} 
        background="gradient-3"
        defaultExpanded={true}
        highlightColor="orange"
        enableCollapse={false}
        autoCollapseExpanded={isSectionExpanded('stage-3')}
        onAutoCollapseToggle={(expanded: boolean) => expanded ? expandSection('stage-3') : collapseSection('stage-3')}
      >
        <div className="text-container">
          <div className="main-text-box">
            <p>The baker, while ambitious, would rather not use their home to make and display their finished peach cobblers – they lack the experience at such a scale, their home appliances aren&apos;t meant for periods of high volume, and they&apos;d need to be on the clock much more often than they are now to ensure there aren&apos;t prolonged outages.</p>
          </div>
        </div>
        <div className="svg-container">
          <div className="svg-placeholder">
            <svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="300" height="200" fill="#f7fafc" stroke="#e2e8f0" strokeWidth="2" rx="8"/>
              <text x="150" y="100" textAnchor="middle" dominantBaseline="middle" fill="#718096" fontSize="16">
                SVG Content
              </text>
            </svg>
          </div>
        </div>
        <div className="text-container">
          <div className="main-text-box">
            <p>This mirrors our position here as a developer: we could use our own time, effort, and tools to host our website live on the Internet, but we would have great difficulty scaling it. Additionally, we&apos;d like to limit our technical focus to making changes on the website – after all, many of us are using the website to help promote our business (which demands its own attention!). Consider then that our baker&apos;s passion is for devising delicious desserts – and not in the art of managing an effective bakery at scale.</p>
          </div>
        </div>
      </CollapsibleSection>

      {/* Stage 4: Commercial Partnership */}
      <CollapsibleSection 
        id="stage-4" 
        title="Stage 4: Commercial Partnership" 
        subtitle="AWS Services"
        animation="fade-up" 
        delay={300} 
        background="white"
        defaultExpanded={true}
        highlightColor="blue"
        enableCollapse={false}
        autoCollapseExpanded={isSectionExpanded('stage-4')}
        onAutoCollapseToggle={(expanded: boolean) => expanded ? expandSection('stage-4') : collapseSection('stage-4')}
      >
        <div className="text-container">
          <div className="main-text-box">
            <p>The baker decides to contract with a big chain of bakeries (who we&apos;ll refer to as the Bakery) to produce and display their cobblers – in our case as developers, we use Amazon Web Services (AWS for short).</p>
            <p>The Bakery has factory-sized plants that scale their production according to our baker&apos;s needs. It has massive pantries, arrays of precise ovens, and even a test kitchen to ensure new recipes are viable before pushing to production. On top of all of this, the Bakery is able to offer our local baker competitive rates incurred based on the resources they actually use – not simply a 24/7 rate.</p>
            <p>Furthermore, the Bakery has a ton of storefront locations across the country along with a capable in-house delivery system. This means that the Bakery is able to quickly and consistently deliver fresh cobblers as close to a customer as possible – reducing the amount of strain on both the client and the Bakery.</p>
          </div>
        </div>
        <div className="svg-container">
          <div className="svg-placeholder">
            <svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="300" height="200" fill="#f7fafc" stroke="#e2e8f0" strokeWidth="2" rx="8"/>
              <text x="150" y="100" textAnchor="middle" dominantBaseline="middle" fill="#718096" fontSize="16">
                SVG Content
              </text>
            </svg>
          </div>
        </div>
        <div className="text-container">
          <div className="main-text-box">
            <p><strong>Industrial kitchens (AWS Elastic Compute Cloud):</strong> the Bakery has kitchens with massive capacity, and they&apos;ll scale how much of the kitchen is in use to process your cobbler and only charge you accordingly</p>
            <p><strong>Commercial pantry (S3 Storage):</strong> the Bakery has huge amounts of space distributed between each of their locations, allowing you to store your recipe along with all the ingredients needed to create it</p>
            <p><strong>Order processing and communications (RDS &amp; SES):</strong> the Bakery has its own platforms to ensure your audience gets delivered exactly what they requested, can communicate with you as you set forth, and so on</p>
            <p><strong>Localized, 24/7 storefronts (Content Delivery Network, Edge Servers):</strong> the Bakery has storefronts across the entire region that can quickly receive your finished cobblers, ensuring that your audience will always have access to freshest version of your product</p>
          </div>
        </div>
      </CollapsibleSection>

      {/* Call to Action */}
      <section id="join">
        <CallToAction />
      </section>
    </div>
  );
}
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
        <p>This is where we&apos;ll introduce the bakery analogy and set the stage for learning AWS through familiar concepts.</p>
        <p>Content will be added here...</p>
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
        <p>Learn about local development through the lens of experimenting with recipes in your home kitchen.</p>
        <p>Content will be added here...</p>
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
        <p>Discover how version control is like maintaining a recipe library with different versions and variations.</p>
        <p>Content will be added here...</p>
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
        <p>Understand static hosting by comparing it to distributing your baked goods from home.</p>
        <p>Content will be added here...</p>
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
        <p>Explore how AWS services work together like a commercial bakery partnership for scaling your business.</p>
        <p>Content will be added here...</p>
      </CollapsibleSection>

      {/* Call to Action */}
      <section id="join">
        <CallToAction />
      </section>
    </div>
  );
}
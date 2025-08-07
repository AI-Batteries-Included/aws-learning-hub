// Epic 3D: Progress Tracking System - TypeScript Interfaces

export interface PageProgress {
  /** Unique page identifier */
  pageId: string;
  /** Page URL path */
  path: string;
  /** Page display title */
  title: string;
  /** Completion status */
  completed: boolean;
  /** In progress status (started but not completed) */
  inProgress: boolean;
  /** Date when page was first visited */
  firstVisited?: Date;
  /** Date when page was completed */
  completedAt?: Date;
  /** Total time spent on page in milliseconds */
  timeSpent: number;
  /** Maximum scroll depth achieved (0-100%) */
  maxScrollDepth: number;
  /** Number of times page was visited */
  visitCount: number;
  /** Last visit timestamp */
  lastVisited?: Date;
}

export interface SectionProgress {
  /** Section identifier */
  sectionId: string;
  /** Section display name */
  sectionName: string;
  /** Array of page IDs in this section */
  pageIds: string[];
  /** Number of completed pages in section */
  completedCount: number;
  /** Total number of pages in section */
  totalCount: number;
  /** Completion percentage (0-100) */
  completionPercentage: number;
  /** Average time spent per page in section */
  averageTimePerPage: number;
}

export interface LearningStreak {
  /** Current streak length in days */
  currentStreak: number;
  /** Longest streak achieved */
  longestStreak: number;
  /** Date of last activity */
  lastActivityDate?: Date;
  /** Total number of learning days */
  totalActiveDays: number;
}

export interface Achievement {
  /** Achievement unique identifier */
  id: string;
  /** Achievement title */
  title: string;
  /** Achievement description */
  description: string;
  /** Achievement icon/emoji */
  icon: string;
  /** Date when achievement was unlocked */
  unlockedAt?: Date;
  /** Whether achievement is unlocked */
  unlocked: boolean;
  /** Achievement category */
  category: 'completion' | 'streak' | 'speed' | 'exploration';
}

export interface ProgressStats {
  /** Overall completion percentage (0-100) */
  overallCompletion: number;
  /** Total pages completed */
  pagesCompleted: number;
  /** Total pages available */
  totalPages: number;
  /** Total time invested in milliseconds */
  totalTimeInvested: number;
  /** Average time per completed page */
  averageTimePerPage: number;
  /** Current learning streak */
  learningStreak: LearningStreak;
  /** Date when learning journey started */
  startDate?: Date;
  /** Estimated completion date based on current pace */
  estimatedCompletionDate?: Date;
  /** Strongest topic areas (most time invested) */
  strongestAreas: string[];
  /** Most recent activity */
  lastActivity?: Date;
}

export interface UserProgress {
  /** Schema version for data migration */
  version: number;
  /** User's progress statistics */
  stats: ProgressStats;
  /** Progress data for individual pages */
  pages: Record<string, PageProgress>;
  /** Progress data for sections */
  sections: Record<string, SectionProgress>;
  /** Unlocked achievements */
  achievements: Achievement[];
  /** User preferences */
  preferences: {
    /** Show completion animations */
    showAnimations: boolean;
    /** Auto-mark pages complete */
    autoComplete: boolean;
    /** Minimum time threshold for auto-completion (ms) */
    autoCompleteTimeThreshold: number;
    /** Minimum scroll threshold for auto-completion (%) */
    autoCompleteScrollThreshold: number;
  };
  /** Data creation timestamp */
  createdAt: Date;
  /** Data last modified timestamp */
  updatedAt: Date;
}

export interface ProgressUpdate {
  /** Page being updated */
  pageId: string;
  /** Update data */
  updates: Partial<PageProgress>;
  /** Timestamp of update */
  timestamp: Date;
}

export interface ProgressExport {
  /** Export metadata */
  metadata: {
    exportDate: Date;
    version: number;
    totalPages: number;
    totalSections: number;
  };
  /** User progress data */
  progress: UserProgress;
}

// Progress Event Types for hooks and context
export type ProgressEventType = 
  | 'page-visited'
  | 'page-completed' 
  | 'page-progress-updated'
  | 'achievement-unlocked'
  | 'streak-updated'
  | 'data-reset'
  | 'data-imported';

export interface ProgressEvent {
  type: ProgressEventType;
  payload: any;
  timestamp: Date;
}

// Default progress data structure
export const DEFAULT_USER_PROGRESS: UserProgress = {
  version: 1,
  stats: {
    overallCompletion: 0,
    pagesCompleted: 0,
    totalPages: 29,
    totalTimeInvested: 0,
    averageTimePerPage: 0,
    learningStreak: {
      currentStreak: 0,
      longestStreak: 0,
      totalActiveDays: 0,
    },
    strongestAreas: [],
  },
  pages: {},
  sections: {},
  achievements: [],
  preferences: {
    showAnimations: true,
    autoComplete: true,
    autoCompleteTimeThreshold: 30000, // 30 seconds
    autoCompleteScrollThreshold: 80,   // 80%
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Available achievements configuration
export const AVAILABLE_ACHIEVEMENTS: Omit<Achievement, 'unlockedAt' | 'unlocked'>[] = [
  {
    id: 'first-page',
    title: 'First Steps',
    description: 'Complete your first page',
    icon: '🎯',
    category: 'completion',
  },
  {
    id: 'quarter-complete',
    title: 'Quarter Master',
    description: 'Complete 25% of all pages',
    icon: '🔥',
    category: 'completion',
  },
  {
    id: 'half-complete',
    title: 'Halfway Hero',
    description: 'Complete 50% of all pages',
    icon: '⚡',
    category: 'completion',
  },
  {
    id: 'three-quarter-complete',
    title: 'Almost There',
    description: 'Complete 75% of all pages',
    icon: '🚀',
    category: 'completion',
  },
  {
    id: 'all-complete',
    title: 'AWS Master',
    description: 'Complete all 29 pages',
    icon: '👑',
    category: 'completion',
  },
  {
    id: 'week-streak',
    title: 'Weekly Warrior',
    description: 'Learn for 7 days in a row',
    icon: '📅',
    category: 'streak',
  },
  {
    id: 'month-streak',
    title: 'Monthly Master',
    description: 'Learn for 30 days in a row',
    icon: '🗓️',
    category: 'streak',
  },
  {
    id: 'speed-demon',
    title: 'Speed Demon',
    description: 'Complete 5 pages in one session',
    icon: '💨',
    category: 'speed',
  },
  {
    id: 'explorer',
    title: 'Explorer',
    description: 'Visit all sections of the learning hub',
    icon: '🧭',
    category: 'exploration',
  },
];

// Learning paths and sections configuration
export const LEARNING_SECTIONS = {
  'main-navigation': {
    id: 'main-navigation',
    name: 'Main Navigation',
    pages: [
      { id: 'home', path: '/', title: 'Home' },
      { id: 'understanding-aws', path: '/learn', title: 'Understanding AWS from Zero' },
      { id: 'aws-basics', path: '/learn/aws-basics', title: 'Using AWS Products' },
      { id: 'architecture', path: '/learn/architecture-overview', title: 'Architecture' },
      { id: 'environment-setup', path: '/learn/environment-setup', title: 'Environment Setup' },
    ],
  },
  'aws-product-guides': {
    id: 'aws-product-guides',
    name: 'AWS Product Guides',
    pages: [
      { id: 'aws-services', path: '/learn/aws-services', title: 'AWS Services' },
      { id: 's3-storage', path: '/learn/s3-storage', title: 'S3 Storage' },
      { id: 'lambda-functions', path: '/learn/lambda-functions', title: 'Lambda Functions' },
      { id: 'cloudformation', path: '/learn/cloudformation', title: 'CloudFormation' },
      { id: 'iam-permissions', path: '/learn/iam-permissions', title: 'IAM Permissions' },
      { id: 'cloudfront', path: '/learn/cloudfront', title: 'CloudFront' },
      { id: 'route-53', path: '/learn/route-53', title: 'Route 53' },
      { id: 'ses-email', path: '/learn/ses-email', title: 'SES Email' },
      { id: 'github-fundamentals', path: '/learn/github-fundamentals', title: 'GitHub Fundamentals' },
      { id: 'vscode-setup', path: '/learn/vscode-setup', title: 'VSCode Setup' },
      { id: 'claude-code-setup', path: '/learn/claude-code-setup', title: 'Claude Code Setup' },
    ],
  },
  'bakery-analogy': {
    id: 'bakery-analogy',
    name: 'AWS Bakery Analogy',
    pages: [
      { id: 'bakery-overview', path: '/learn/aws-bakery-analogy', title: 'Bakery Overview' },
      { id: 'bakery-stage-1', path: '/learn/aws-bakery-analogy/stage-1', title: 'Stage 1: Home Kitchen' },
      { id: 'bakery-stage-2', path: '/learn/aws-bakery-analogy/stage-2', title: 'Stage 2: Recipe Library' },
      { id: 'bakery-stage-3', path: '/learn/aws-bakery-analogy/stage-3', title: 'Stage 3: Home Distribution' },
      { id: 'bakery-stage-4', path: '/learn/aws-bakery-analogy/stage-4', title: 'Stage 4: Commercial Partnership' },
    ],
  },
  'other-pages': {
    id: 'other-pages',
    name: 'Other Pages',
    pages: [
      { id: 'setup-guide', path: '/setup-guide', title: 'Setup Guide' },
      { id: 'templates', path: '/templates', title: 'Templates' },
      { id: 'about', path: '/about', title: 'About' },
      { id: 'contact', path: '/contact', title: 'Contact' },
    ],
  },
} as const;
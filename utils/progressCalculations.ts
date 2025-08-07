// Epic 3D: Progress Tracking System - Progress Calculations

import { 
  UserProgress, 
  PageProgress, 
  SectionProgress, 
  LearningStreak, 
  ProgressStats,
  Achievement,
  AVAILABLE_ACHIEVEMENTS,
  LEARNING_SECTIONS
} from './progressTypes';

/**
 * Calculate overall completion percentage
 */
export function calculateOverallCompletion(pages: Record<string, PageProgress>): number {
  // Calculate total pages from LEARNING_SECTIONS (all available pages)
  const totalPagesInSystem = Object.keys(LEARNING_SECTIONS).reduce((total, sectionId) => {
    const section = LEARNING_SECTIONS[sectionId as keyof typeof LEARNING_SECTIONS];
    return total + section.pages.length;
  }, 0);
  
  if (totalPagesInSystem === 0) return 0;
  
  const completedPages = Object.values(pages).filter(page => page.completed).length;
  return Math.round((completedPages / totalPagesInSystem) * 100);
}

/**
 * Calculate section progress
 */
export function calculateSectionProgress(
  sectionId: string, 
  pages: Record<string, PageProgress>
): SectionProgress {
  const section = LEARNING_SECTIONS[sectionId as keyof typeof LEARNING_SECTIONS];
  
  if (!section) {
    return {
      sectionId,
      sectionName: 'Unknown Section',
      pageIds: [],
      completedCount: 0,
      totalCount: 0,
      completionPercentage: 0,
      averageTimePerPage: 0,
    };
  }

  const sectionPages = section.pages.map(p => p.id);
  const sectionPageData = sectionPages
    .map(pageId => pages[pageId])
    .filter(Boolean); // Filter out undefined pages

  const completedCount = sectionPageData.filter(page => page.completed).length;
  const totalCount = sectionPages.length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  
  const totalTime = sectionPageData.reduce((sum, page) => sum + page.timeSpent, 0);
  const averageTimePerPage = sectionPageData.length > 0 ? totalTime / sectionPageData.length : 0;

  return {
    sectionId,
    sectionName: section.name,
    pageIds: sectionPages,
    completedCount,
    totalCount,
    completionPercentage,
    averageTimePerPage,
  };
}

/**
 * Calculate all section progress
 */
export function calculateAllSectionProgress(pages: Record<string, PageProgress>): Record<string, SectionProgress> {
  const sections: Record<string, SectionProgress> = {};
  
  Object.keys(LEARNING_SECTIONS).forEach(sectionId => {
    sections[sectionId] = calculateSectionProgress(sectionId, pages);
  });
  
  return sections;
}

/**
 * Calculate learning streak
 */
export function calculateLearningStreak(pages: Record<string, PageProgress>): LearningStreak {
  const pageArray = Object.values(pages);
  
  if (pageArray.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      totalActiveDays: 0,
    };
  }

  // Get all activity dates (completions and visits)
  const activityDates: Date[] = [];
  
  pageArray.forEach(page => {
    if (page.completedAt) {
      activityDates.push(page.completedAt);
    }
    if (page.lastVisited) {
      activityDates.push(page.lastVisited);
    }
  });

  if (activityDates.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      totalActiveDays: 0,
    };
  }

  // Sort dates and get unique days
  const uniqueDays = Array.from(new Set(
    activityDates.map(date => date.toDateString())
  )).map(dateStr => new Date(dateStr)).sort((a, b) => a.getTime() - b.getTime());

  // Calculate streaks
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 1;
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Check if there's recent activity for current streak
  const lastActivityDate = uniqueDays[uniqueDays.length - 1];
  const lastActivityDateStr = lastActivityDate.toDateString();
  const todayStr = today.toDateString();
  const yesterdayStr = yesterday.toDateString();

  if (lastActivityDateStr === todayStr || lastActivityDateStr === yesterdayStr) {
    // Start calculating current streak from the most recent activity
    currentStreak = 1;
    
    for (let i = uniqueDays.length - 2; i >= 0; i--) {
      const currentDate = uniqueDays[i + 1];
      const previousDate = uniqueDays[i];
      const dayDiff = Math.floor((currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (dayDiff === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  // Calculate longest streak
  for (let i = 1; i < uniqueDays.length; i++) {
    const currentDate = uniqueDays[i];
    const previousDate = uniqueDays[i - 1];
    const dayDiff = Math.floor((currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (dayDiff === 1) {
      tempStreak++;
    } else {
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 1;
    }
  }
  longestStreak = Math.max(longestStreak, tempStreak);

  return {
    currentStreak,
    longestStreak,
    lastActivityDate: lastActivityDate,
    totalActiveDays: uniqueDays.length,
  };
}

/**
 * Calculate estimated completion date based on current pace
 */
export function calculateEstimatedCompletion(progress: UserProgress): Date | undefined {
  const { stats, pages } = progress;
  
  if (stats.pagesCompleted === 0) return undefined;
  
  const remainingPages = stats.totalPages - stats.pagesCompleted;
  if (remainingPages === 0) return new Date(); // Already completed
  
  // Calculate average time between page completions
  const completedPages = Object.values(pages).filter(page => page.completed);
  const completionDates = completedPages
    .map(page => page.completedAt)
    .filter(Boolean)
    .sort((a, b) => a!.getTime() - b!.getTime());
  
  if (completionDates.length < 2) return undefined;
  
  // Calculate average days between completions
  let totalDaysBetween = 0;
  for (let i = 1; i < completionDates.length; i++) {
    const daysDiff = (completionDates[i]!.getTime() - completionDates[i - 1]!.getTime()) / (1000 * 60 * 60 * 24);
    totalDaysBetween += daysDiff;
  }
  
  const averageDaysBetween = totalDaysBetween / (completionDates.length - 1);
  const daysToCompletion = averageDaysBetween * remainingPages;
  
  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + Math.ceil(daysToCompletion));
  
  return estimatedDate;
}

/**
 * Calculate strongest topic areas based on time invested
 */
export function calculateStrongestAreas(
  pages: Record<string, PageProgress>, 
  sections: Record<string, SectionProgress>
): string[] {
  const sectionTimes = Object.values(sections)
    .map(section => ({
      name: section.sectionName,
      averageTime: section.averageTimePerPage,
    }))
    .filter(section => section.averageTime > 0)
    .sort((a, b) => b.averageTime - a.averageTime)
    .slice(0, 3)
    .map(section => section.name);

  return sectionTimes;
}

/**
 * Update progress statistics
 */
export function updateProgressStats(progress: UserProgress): ProgressStats {
  const { pages } = progress;
  const sections = calculateAllSectionProgress(pages);
  
  const completedPages = Object.values(pages).filter(page => page.completed);
  const totalTimeInvested = Object.values(pages).reduce((sum, page) => sum + page.timeSpent, 0);
  const averageTimePerPage = completedPages.length > 0 ? totalTimeInvested / completedPages.length : 0;
  
  const learningStreak = calculateLearningStreak(pages);
  const overallCompletion = calculateOverallCompletion(pages);
  const strongestAreas = calculateStrongestAreas(pages, sections);
  const estimatedCompletionDate = calculateEstimatedCompletion(progress);
  
  // Find the earliest page activity for start date
  const allDates = Object.values(pages)
    .flatMap(page => [page.firstVisited, page.completedAt].filter(Boolean))
    .sort((a, b) => a!.getTime() - b!.getTime());
  
  const startDate = allDates.length > 0 ? allDates[0] : progress.stats.startDate;
  
  // Find the most recent activity
  const recentDates = Object.values(pages)
    .flatMap(page => [page.lastVisited, page.completedAt].filter(Boolean))
    .sort((a, b) => b!.getTime() - a!.getTime());
  
  const lastActivity = recentDates.length > 0 ? recentDates[0] : progress.stats.lastActivity;

  return {
    overallCompletion,
    pagesCompleted: completedPages.length,
    totalPages: Object.keys(LEARNING_SECTIONS).reduce((total, sectionId) => {
      const section = LEARNING_SECTIONS[sectionId as keyof typeof LEARNING_SECTIONS];
      return total + section.pages.length;
    }, 0),
    totalTimeInvested,
    averageTimePerPage,
    learningStreak,
    startDate,
    estimatedCompletionDate,
    strongestAreas,
    lastActivity,
  };
}

/**
 * Check and unlock achievements based on current progress
 */
export function checkAchievements(progress: UserProgress): Achievement[] {
  const { stats, pages } = progress;
  const unlockedAchievements: Achievement[] = [...progress.achievements];
  const newAchievements: Achievement[] = [];
  
  // Helper function to check if achievement is already unlocked
  const isUnlocked = (achievementId: string) => 
    unlockedAchievements.some(a => a.id === achievementId);
  
  AVAILABLE_ACHIEVEMENTS.forEach(achievementTemplate => {
    if (isUnlocked(achievementTemplate.id)) return;
    
    let shouldUnlock = false;
    
    switch (achievementTemplate.id) {
      case 'first-page':
        shouldUnlock = stats.pagesCompleted >= 1;
        break;
      case 'quarter-complete':
        shouldUnlock = stats.overallCompletion >= 25;
        break;
      case 'half-complete':
        shouldUnlock = stats.overallCompletion >= 50;
        break;
      case 'three-quarter-complete':
        shouldUnlock = stats.overallCompletion >= 75;
        break;
      case 'all-complete':
        shouldUnlock = stats.overallCompletion >= 100;
        break;
      case 'week-streak':
        shouldUnlock = stats.learningStreak.currentStreak >= 7;
        break;
      case 'month-streak':
        shouldUnlock = stats.learningStreak.currentStreak >= 30;
        break;
      case 'speed-demon':
        // Check if 5 pages completed in one day
        const completionDates = Object.values(pages)
          .filter(page => page.completed && page.completedAt)
          .map(page => page.completedAt!.toDateString());
        const dateCounts = completionDates.reduce((acc, date) => {
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        shouldUnlock = Object.values(dateCounts).some(count => count >= 5);
        break;
      case 'explorer':
        // Check if visited all sections (at least one page from each)
        const sectionsVisited = Object.keys(LEARNING_SECTIONS).filter(sectionId => {
          const section = LEARNING_SECTIONS[sectionId as keyof typeof LEARNING_SECTIONS];
          return section.pages.some(page => pages[page.id]?.visitCount > 0);
        });
        shouldUnlock = sectionsVisited.length === Object.keys(LEARNING_SECTIONS).length;
        break;
    }
    
    if (shouldUnlock) {
      const newAchievement: Achievement = {
        ...achievementTemplate,
        unlocked: true,
        unlockedAt: new Date(),
      };
      newAchievements.push(newAchievement);
    }
  });
  
  return [...unlockedAchievements, ...newAchievements];
}

/**
 * Create or update a page progress entry
 */
export function createPageProgress(
  pageId: string, 
  path: string, 
  title: string, 
  existingProgress?: PageProgress
): PageProgress {
  const now = new Date();
  
  if (existingProgress) {
    return {
      ...existingProgress,
      lastVisited: now,
      visitCount: existingProgress.visitCount + 1,
    };
  }
  
  return {
    pageId,
    path,
    title,
    completed: false,
    inProgress: false,
    firstVisited: now,
    timeSpent: 0,
    maxScrollDepth: 0,
    visitCount: 1,
    lastVisited: now,
  };
}

/**
 * Update page progress with new data
 */
export function updatePageProgress(
  existingProgress: PageProgress,
  updates: {
    timeSpent?: number;
    scrollDepth?: number;
    completed?: boolean;
    inProgress?: boolean;
  }
): PageProgress {
  const updatedProgress = { ...existingProgress };
  
  if (updates.timeSpent !== undefined) {
    updatedProgress.timeSpent += updates.timeSpent;
  }
  
  if (updates.scrollDepth !== undefined) {
    updatedProgress.maxScrollDepth = Math.max(
      updatedProgress.maxScrollDepth, 
      updates.scrollDepth
    );
  }
  
  if (updates.inProgress !== undefined) {
    updatedProgress.inProgress = updates.inProgress;
  }
  
  if (updates.completed !== undefined && updates.completed && !updatedProgress.completed) {
    updatedProgress.completed = true;
    updatedProgress.completedAt = new Date();
    updatedProgress.inProgress = false;
  }
  
  return updatedProgress;
}

/**
 * Get recommended next pages based on current progress
 */
export function getRecommendedPages(
  progress: UserProgress, 
  currentPageId?: string
): Array<{ pageId: string; path: string; title: string; reason: string }> {
  const { pages, sections } = progress;
  const recommendations: Array<{ pageId: string; path: string; title: string; reason: string }> = [];
  
  // Find incomplete pages in the current section first
  if (currentPageId && pages[currentPageId]) {
    const currentPage = pages[currentPageId];
    const currentSection = Object.values(sections).find(section => 
      section.pageIds.includes(currentPageId)
    );
    
    if (currentSection) {
      const incompletePagesInSection = currentSection.pageIds
        .filter(pageId => !pages[pageId]?.completed)
        .filter(pageId => pageId !== currentPageId);
      
      if (incompletePagesInSection.length > 0) {
        const nextPageId = incompletePagesInSection[0];
        const sectionInfo = Object.values(LEARNING_SECTIONS).find(s => 
          s.pages.some(p => p.id === nextPageId)
        );
        const pageInfo = sectionInfo?.pages.find(p => p.id === nextPageId);
        
        if (pageInfo) {
          recommendations.push({
            pageId: nextPageId,
            path: pageInfo.path,
            title: pageInfo.title,
            reason: `Continue in ${currentSection.sectionName}`,
          });
        }
      }
    }
  }
  
  // Find pages with highest progress but not completed
  const inProgressPages = Object.values(pages)
    .filter(page => page.inProgress && !page.completed)
    .sort((a, b) => b.maxScrollDepth - a.maxScrollDepth)
    .slice(0, 2);
  
  inProgressPages.forEach(page => {
    if (!recommendations.some(r => r.pageId === page.pageId)) {
      recommendations.push({
        pageId: page.pageId,
        path: page.path,
        title: page.title,
        reason: 'Resume in progress',
      });
    }
  });
  
  // Find prerequisites for incomplete advanced pages
  const allPages: any[] = [];
  Object.values(LEARNING_SECTIONS).forEach(section => {
    allPages.push(...section.pages);
  });
  
  const basicPages = allPages.filter(page => 
    page.path.includes('/learn/aws-basics') || 
    page.path === '/learn' ||
    page.path.includes('/learn/architecture-overview')
  );
  
  const incompleteBasicPages = basicPages.filter(page => !pages[page.id]?.completed);
  
  incompleteBasicPages.forEach(page => {
    if (!recommendations.some(r => r.pageId === page.id)) {
      recommendations.push({
        pageId: page.id,
        path: page.path,
        title: page.title,
        reason: 'Foundation topic',
      });
    }
  });
  
  return recommendations.slice(0, 3); // Return top 3 recommendations
}

/**
 * Format time duration for display
 */
export function formatDuration(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  } else if (minutes > 0) {
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  } else {
    return `${seconds}s`;
  }
}

/**
 * Format completion percentage for display
 */
export function formatPercentage(percentage: number): string {
  return `${Math.round(percentage)}%`;
}
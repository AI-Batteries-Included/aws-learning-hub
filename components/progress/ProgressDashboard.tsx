// Epic 3D: Progress Tracking System - Progress Dashboard Component

'use client';

import React from 'react';
import { useOverallProgress, useSectionProgress, useAchievements } from './ProgressContext';
import { LEARNING_SECTIONS } from '../../utils/progressTypes';

export interface ProgressDashboardProps {
  /** Compact view for sidebar display */
  compact?: boolean;
  /** Show achievements section */
  showAchievements?: boolean;
  /** Show section breakdown */
  showSections?: boolean;
  /** Custom className for styling */
  className?: string;
}

export function ProgressDashboard({
  compact = false,
  showAchievements = true,
  showSections = true,
  className = '',
}: ProgressDashboardProps) {
  const {
    overallCompletion,
    pagesCompleted,
    totalPages,
    totalTimeInvested,
    learningStreak,
    strongestAreas,
    lastActivity,
  } = useOverallProgress();

  const {
    achievements,
    unlockedAchievements,
    totalAchievements,
    achievementProgress,
    recentAchievements,
  } = useAchievements();

  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const formatLastActivity = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Recently';
    }
  };

  if (compact) {
    return (
      <div className={`progress-dashboard-compact ${className}`}>
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${overallCompletion}%` }}
            />
          </div>
          
          <div className="space-y-1 text-sm text-gray-700 font-mono">
            <div>📊&nbsp;&nbsp;&nbsp;&nbsp;<span className="font-medium text-blue-600">{overallCompletion}% Complete</span></div>
            <div>📄&nbsp;&nbsp;&nbsp;&nbsp;{pagesCompleted} of {totalPages} pages</div>
            <div>⏱️&nbsp;&nbsp;&nbsp;&nbsp;{formatTime(totalTimeInvested)} invested</div>
          </div>
        </div>

        {learningStreak.currentStreak > 0 && (
          <div className="mb-3 p-2 bg-orange-50 rounded-lg">
            <div className="text-sm font-mono">🔥&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-700">{learningStreak.currentStreak} day streak!</span></div>
          </div>
        )}

        {showAchievements && recentAchievements.length > 0 && (
          <div className="mb-3">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Achievements</h4>
            <div className="space-y-1">
              {recentAchievements.slice(0, 2).map(achievement => (
                <div key={achievement.id} className="flex items-center text-xs text-gray-600">
                  <span className="mr-2">{achievement.icon}</span>
                  <span>{achievement.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`progress-dashboard ${className}`}>
      {/* Overall Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-gray-800">Learning Progress</h2>
          <div className="text-right">
            <div className="text-4xl font-bold text-blue-600">{overallCompletion}%</div>
            <div className="text-sm text-gray-500">Complete</div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${overallCompletion}%` }}
          />
        </div>
        
        <div className="progress-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          {/* Completion Box */}
          <div className="metric-box group relative overflow-hidden bg-black/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/20">
            <div className="metric-icon text-3xl mb-3">📊</div>
            <div className="metric-value text-4xl font-bold text-white mb-2">{overallCompletion}%</div>
            <div className="metric-label text-sm font-medium text-white/70 uppercase tracking-wider">Complete</div>
            <div className="metric-progress-bar mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${overallCompletion}%` }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          {/* Pages Box */}
          <div className="metric-box group relative overflow-hidden bg-black/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/20">
            <div className="metric-icon text-3xl mb-3">📄</div>
            <div className="metric-value text-4xl font-bold text-white mb-2">{pagesCompleted}</div>
            <div className="metric-label text-sm font-medium text-white/70 uppercase tracking-wider">Pages Completed</div>
            <div className="metric-sublabel text-xs text-white/50 mt-1">of {totalPages} total</div>
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          {/* Time Invested Box */}
          <div className="metric-box group relative overflow-hidden bg-black/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/20">
            <div className="metric-icon text-3xl mb-3">⏱️</div>
            <div className="metric-value text-4xl font-bold text-white mb-2">{formatTime(totalTimeInvested)}</div>
            <div className="metric-label text-sm font-medium text-white/70 uppercase tracking-wider">Time Invested</div>
            <div className="metric-sublabel text-xs text-white/50 mt-1">Learning time</div>
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          {/* Streak Box */}
          <div className="metric-box streak-box group relative overflow-hidden bg-black/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/20">
            <div className="metric-icon text-3xl mb-3">🔥</div>
            <div className="metric-value text-4xl font-bold text-white mb-2">{learningStreak.currentStreak}</div>
            <div className="metric-label text-sm font-medium text-white/70 uppercase tracking-wider">Day Streak</div>
            <div className="metric-action text-xs text-orange-400 font-medium mt-1">Keep it up!</div>
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
        
        {/* Additional Achievements Summary Box */}
        <div className="metric-box group relative overflow-hidden bg-black/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/20 max-w-sm mx-auto">
          <div className="metric-icon text-3xl mb-3">🏆</div>
          <div className="metric-value text-4xl font-bold text-white mb-2">{unlockedAchievements.length}</div>
          <div className="metric-label text-sm font-medium text-white/70 uppercase tracking-wider">Achievements</div>
          <div className="metric-sublabel text-xs text-white/50 mt-1">of {totalAchievements} unlocked</div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {lastActivity && (
          <div className="mt-4 text-center text-sm text-gray-500">
            Last activity: {formatLastActivity(lastActivity)}
          </div>
        )}
      </div>

      {/* Section Progress */}
      {showSections && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Section Progress</h3>
          <div className="grid gap-4">
            {Object.entries(LEARNING_SECTIONS).map(([sectionId, sectionData]) => {
              // Transform the section data to match our expected interface
              const sectionConfig = {
                title: sectionData.name,
                description: sectionData.name, // Using name as description for now
                pageIds: sectionData.pages.map((page: { id: string; path: string; title: string }) => page.id),
              };
              return (
                <SectionProgressCard key={sectionId} sectionId={sectionId} sectionConfig={sectionConfig} />
              );
            })}
          </div>
        </div>
      )}

      {/* Achievements */}
      {showAchievements && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Achievements</h3>
          
          <div className="mb-6 p-4 bg-black/5 backdrop-blur-sm border border-white/10 rounded-lg">
            <div className="flex justify-between text-sm text-white/70 mb-2 font-medium">
              <span>Achievement Progress</span>
              <span className="text-orange-400">{achievementProgress}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-orange-400 to-amber-500 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${achievementProgress}%` }}
              />
            </div>
          </div>
          
          <div className="grid gap-4">
            {achievements.map(achievement => (
              <div
                key={achievement.id}
                className={`achievement-card group relative overflow-hidden p-5 rounded-xl transition-all duration-300 hover:transform hover:-translate-y-1 ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-400/30 hover:shadow-xl hover:shadow-orange-500/20 backdrop-blur-sm'
                    : 'bg-black/5 border border-white/10 backdrop-blur-sm hover:shadow-lg opacity-60'
                }`}
              >
                <div className="flex items-start">
                  <div className={`achievement-icon text-5xl mr-4 transition-all duration-300 ${
                    achievement.unlocked ? 'scale-100' : 'grayscale opacity-50'
                  }`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bold text-lg mb-2 ${
                      achievement.unlocked ? 'text-white' : 'text-white/60'
                    }`}>
                      {achievement.title}
                      {achievement.unlocked && <span className="ml-2 text-orange-400">✓</span>}
                    </h4>
                    <p className={`text-sm leading-relaxed ${
                      achievement.unlocked ? 'text-white/80' : 'text-white/40'
                    }`}>
                      {achievement.description}
                    </p>
                    {achievement.unlocked && achievement.unlockedAt && (
                      <p className="text-xs text-orange-300 mt-2 font-medium">
                        Unlocked {formatLastActivity(achievement.unlockedAt)}
                      </p>
                    )}
                  </div>
                </div>
                {achievement.unlocked && (
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strongest Areas */}
      {strongestAreas.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Strongest Areas</h3>
          <div className="flex flex-wrap gap-2">
            {strongestAreas.map(area => (
              <span
                key={area}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Individual section progress card component
 */
function SectionProgressCard({
  sectionId,
  sectionConfig,
}: {
  sectionId: string;
  sectionConfig: {
    title: string;
    description: string;
    pageIds: string[];
  };
}) {
  const {
    completionPercentage,
    completedCount,
    totalCount,
    averageTimePerPage,
  } = useSectionProgress(sectionId);

  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    return `${minutes}m`;
  };

  return (
    <div className="section-progress-card bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-800">{sectionConfig.title}</h4>
        <span className="text-lg font-bold text-blue-600">{Math.round(completionPercentage)}%</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
          style={{ width: `${completionPercentage}%` }}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-600">Progress:</span>
          <span className="font-medium text-gray-800 ml-1">
            {completedCount} of {totalCount}
          </span>
        </div>
        <div>
          <span className="text-gray-600">Avg Time:</span>
          <span className="font-medium text-gray-800 ml-1">
            {averageTimePerPage > 0 ? formatTime(averageTimePerPage) : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProgressDashboard;
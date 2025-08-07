// Epic 3D: Progress Tracking System - Progress Analytics Page

'use client';

import React from 'react';
import { useOverallProgress, useAchievements } from '../../components/progress/ProgressContext';

export default function ProgressPage() {
  const {
    overallCompletion,
    pagesCompleted,
    totalPages,
    totalTimeInvested,
    learningStreak,
    averageTimePerPage,
  } = useOverallProgress();

  const {
    unlockedAchievements,
    totalAchievements,
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

  return (
    <div className="progress-analytics-page min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900">
      <div className="analytics-container max-w-7xl mx-auto px-8 py-10">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="page-title text-5xl font-bold text-white mb-3">Learning Analytics</h1>
          <p className="page-subtitle text-xl text-white/70">Track your progress through the AWS Learning Hub</p>
        </div>

        {/* Main Metrics Grid */}
        <div className="metrics-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
          {/* Overall Progress Box */}
          <div className={`metric-box bg-gray-800 border-2 border-gray-600 rounded-2xl p-8 min-h-[200px] flex flex-col justify-between transition-all duration-300 hover:bg-gray-700 hover:border-orange-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/20 ${overallCompletion > 0 ? 'border-blue-400' : ''}`}>
            <div className="box-header flex items-center gap-3 mb-6">
              <span className="box-icon text-3xl">📊</span>
              <h3 className="box-title text-sm font-medium text-gray-400 uppercase tracking-wide">Overall Progress</h3>
            </div>
            <div className="box-content flex flex-col justify-center items-center text-center flex-grow">
              <div className="primary-value text-6xl font-bold text-white leading-none mb-2">{overallCompletion}%</div>
              <div className="secondary-text text-lg text-gray-400">Complete</div>
              {overallCompletion > 0 && (
                <div className="progress-bar w-full h-1.5 bg-gray-600 rounded-full overflow-hidden mt-5">
                  <div 
                    className="progress-fill h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${overallCompletion}%` }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Pages Completed Box */}
          <div className="metric-box bg-gray-800 border-2 border-gray-600 rounded-2xl p-8 min-h-[200px] flex flex-col justify-between transition-all duration-300 hover:bg-gray-700 hover:border-orange-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/20">
            <div className="box-header flex items-center gap-3 mb-6">
              <span className="box-icon text-3xl">📄</span>
              <h3 className="box-title text-sm font-medium text-gray-400 uppercase tracking-wide">Pages Completed</h3>
            </div>
            <div className="box-content flex flex-col justify-center items-center text-center flex-grow">
              <div className="primary-value text-6xl font-bold text-white leading-none mb-2">{pagesCompleted}</div>
              <div className="secondary-text text-lg text-gray-400">of {totalPages} total</div>
            </div>
          </div>

          {/* Time Invested Box */}
          <div className="metric-box bg-gray-800 border-2 border-gray-600 rounded-2xl p-8 min-h-[200px] flex flex-col justify-between transition-all duration-300 hover:bg-gray-700 hover:border-orange-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/20">
            <div className="box-header flex items-center gap-3 mb-6">
              <span className="box-icon text-3xl">⏱️</span>
              <h3 className="box-title text-sm font-medium text-gray-400 uppercase tracking-wide">Time Invested</h3>
            </div>
            <div className="box-content flex flex-col justify-center items-center text-center flex-grow">
              <div className="primary-value text-6xl font-bold text-white leading-none mb-2">{formatTime(totalTimeInvested)}</div>
              <div className="secondary-text text-lg text-gray-400">Learning time</div>
            </div>
          </div>

          {/* Current Streak Box */}
          <div className={`metric-box bg-gray-800 border-2 border-gray-600 rounded-2xl p-8 min-h-[200px] flex flex-col justify-between transition-all duration-300 hover:bg-gray-700 hover:border-orange-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/20 ${learningStreak.currentStreak > 0 ? 'has-streak border-orange-400' : ''}`}>
            <div className="box-header flex items-center gap-3 mb-6">
              <span className="box-icon text-3xl">🔥</span>
              <h3 className="box-title text-sm font-medium text-gray-400 uppercase tracking-wide">Current Streak</h3>
            </div>
            <div className="box-content flex flex-col justify-center items-center text-center flex-grow">
              <div className={`primary-value text-6xl font-bold leading-none mb-2 ${learningStreak.currentStreak > 0 ? 'text-orange-500' : 'text-white'}`}>
                {learningStreak.currentStreak}
              </div>
              <div className="secondary-text text-lg text-gray-400">days</div>
            </div>
          </div>

          {/* Achievements Box */}
          <div className="metric-box bg-gray-800 border-2 border-gray-600 rounded-2xl p-8 min-h-[200px] flex flex-col justify-between transition-all duration-300 hover:bg-gray-700 hover:border-orange-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/20">
            <div className="box-header flex items-center gap-3 mb-6">
              <span className="box-icon text-3xl">🏆</span>
              <h3 className="box-title text-sm font-medium text-gray-400 uppercase tracking-wide">Achievements</h3>
            </div>
            <div className="box-content flex flex-col justify-center items-center text-center flex-grow">
              <div className="primary-value text-6xl font-bold text-white leading-none mb-2">{unlockedAchievements.length}</div>
              <div className="secondary-text text-lg text-gray-400">of {totalAchievements} unlocked</div>
            </div>
          </div>

          {/* Average Time Box */}
          <div className="metric-box bg-gray-800 border-2 border-gray-600 rounded-2xl p-8 min-h-[200px] flex flex-col justify-between transition-all duration-300 hover:bg-gray-700 hover:border-orange-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/20">
            <div className="box-header flex items-center gap-3 mb-6">
              <span className="box-icon text-3xl">📈</span>
              <h3 className="box-title text-sm font-medium text-gray-400 uppercase tracking-wide">Avg. Page Time</h3>
            </div>
            <div className="box-content flex flex-col justify-center items-center text-center flex-grow">
              <div className="primary-value text-6xl font-bold text-white leading-none mb-2">{formatTime(averageTimePerPage)}</div>
              <div className="secondary-text text-lg text-gray-400">per page</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
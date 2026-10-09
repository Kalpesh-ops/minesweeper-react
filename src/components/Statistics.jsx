import { useState } from 'react';
import { getStatsSummary, resetStats, formatTime } from '../utils/statisticsUtils';
import './Statistics.css';

const Statistics = ({ isOpen, onClose }) => {
  const [stats, setStats] = useState(getStatsSummary());

  const handleResetStats = () => {
    if (window.confirm('Are you sure you want to reset all statistics? This action cannot be undone.')) {
      resetStats();
      setStats(getStatsSummary());
    }
  };

  const formatDaysSince = (dateString) => {
    if (!dateString) return 'Never';
    
    const firstPlay = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - firstPlay);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  };

  if (!isOpen) return null;

  return (
    <div className="statistics-modal">
      <div className="statistics-content">
        <div className="statistics-header">
          <h2>📊 Game Statistics</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close statistics">
            ✕
          </button>
        </div>

        <div className="statistics-body">
          {/* Overall Stats */}
          <div className="stats-section">
            <h3>Overall Performance</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-value">{stats.totalGames}</span>
                <span className="stat-label">Games Played</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{stats.totalWins}</span>
                <span className="stat-label">Games Won</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{stats.totalWinRate}%</span>
                <span className="stat-label">Win Rate</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{formatTime(stats.totalTimePlayed)}</span>
                <span className="stat-label">Total Time</span>
              </div>
            </div>
          </div>

          {/* Difficulty Stats */}
          <div className="stats-section">
            <h3>Performance by Difficulty</h3>
            
            {Object.entries(stats.difficulties).map(([difficulty, data]) => (
              <div key={difficulty} className="difficulty-stats">
                <h4 className="difficulty-title">
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  {data.currentStreak > 0 && (
                    <span className="streak">🔥 {data.currentStreak} streak</span>
                  )}
                </h4>
                
                <div className="difficulty-grid">
                  <div className="stat-item">
                    <span className="stat-value">{data.gamesPlayed}</span>
                    <span className="stat-label">Played</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{data.gamesWon}</span>
                    <span className="stat-label">Won</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{data.winRate}%</span>
                    <span className="stat-label">Win Rate</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{data.bestTimeFormatted}</span>
                    <span className="stat-label">Best Time</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{data.bestStreak}</span>
                    <span className="stat-label">Best Streak</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="stats-section">
            <div className="stats-footer">
              <p className="first-play">
                Playing since: {formatDaysSince(stats.firstPlayDate)}
              </p>
              
              <button 
                className="reset-stats-btn"
                onClick={handleResetStats}
                title="Reset all statistics"
              >
                Reset Statistics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;

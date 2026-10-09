// Game statistics utility functions

const STATS_KEY = 'minesweeper-stats';

// Default stats structure
const defaultStats = {
  beginner: {
    gamesPlayed: 0,
    gamesWon: 0,
    gamesLost: 0,
    bestTime: null,
    currentStreak: 0,
    bestStreak: 0,
  },
  intermediate: {
    gamesPlayed: 0,
    gamesWon: 0,
    gamesLost: 0,
    bestTime: null,
    currentStreak: 0,
    bestStreak: 0,
  },
  expert: {
    gamesPlayed: 0,
    gamesWon: 0,
    gamesLost: 0,
    bestTime: null,
    currentStreak: 0,
    bestStreak: 0,
  },
  totalGamesPlayed: 0,
  totalGamesWon: 0,
  totalGamesLost: 0,
  totalTimePlayed: 0,
  firstPlayDate: null,
};

// Load stats from localStorage
export function loadStats() {
  try {
    const stored = localStorage.getItem(STATS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with default stats to handle new fields
      return { ...defaultStats, ...parsed };
    }
  } catch (error) {
    console.warn('Error loading stats:', error);
  }
  return { ...defaultStats };
}

// Save stats to localStorage
export function saveStats(stats) {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (error) {
    console.warn('Error saving stats:', error);
  }
}

// Update stats when a game ends
export function updateGameStats(difficulty, gameResult, gameTime) {
  const stats = loadStats();
  
  // Set first play date if not set
  if (!stats.firstPlayDate) {
    stats.firstPlayDate = new Date().toISOString();
  }
  
  // Update difficulty-specific stats
  const difficultyStats = stats[difficulty];
  difficultyStats.gamesPlayed++;
  stats.totalGamesPlayed++;
  stats.totalTimePlayed += gameTime;
  
  if (gameResult === 'won') {
    difficultyStats.gamesWon++;
    stats.totalGamesWon++;
    difficultyStats.currentStreak++;
    
    // Update best time
    if (!difficultyStats.bestTime || gameTime < difficultyStats.bestTime) {
      difficultyStats.bestTime = gameTime;
    }
    
    // Update best streak
    if (difficultyStats.currentStreak > difficultyStats.bestStreak) {
      difficultyStats.bestStreak = difficultyStats.currentStreak;
    }
  } else {
    difficultyStats.gamesLost++;
    stats.totalGamesLost++;
    difficultyStats.currentStreak = 0;
  }
  
  saveStats(stats);
  return stats;
}

// Calculate win rate for a difficulty
export function getWinRate(difficulty) {
  const stats = loadStats();
  const difficultyStats = stats[difficulty];
  
  if (difficultyStats.gamesPlayed === 0) return 0;
  
  return Math.round((difficultyStats.gamesWon / difficultyStats.gamesPlayed) * 100);
}

// Calculate total win rate
export function getTotalWinRate() {
  const stats = loadStats();
  
  if (stats.totalGamesPlayed === 0) return 0;
  
  return Math.round((stats.totalGamesWon / stats.totalGamesPlayed) * 100);
}

// Format time for display
export function formatTime(seconds) {
  if (seconds === null || seconds === undefined) return '--';
  
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  
  if (mins > 0) {
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
  
  return `${secs}s`;
}

// Reset all stats
export function resetStats() {
  const freshStats = { ...defaultStats };
  saveStats(freshStats);
  return freshStats;
}

// Get stats summary for display
export function getStatsSummary() {
  const stats = loadStats();
  
  return {
    totalGames: stats.totalGamesPlayed,
    totalWins: stats.totalGamesWon,
    totalWinRate: getTotalWinRate(),
    totalTimePlayed: stats.totalTimePlayed,
    difficulties: {
      beginner: {
        ...stats.beginner,
        winRate: getWinRate('beginner'),
        bestTimeFormatted: formatTime(stats.beginner.bestTime),
      },
      intermediate: {
        ...stats.intermediate,
        winRate: getWinRate('intermediate'),
        bestTimeFormatted: formatTime(stats.intermediate.bestTime),
      },
      expert: {
        ...stats.expert,
        winRate: getWinRate('expert'),
        bestTimeFormatted: formatTime(stats.expert.bestTime),
      },
    },
    firstPlayDate: stats.firstPlayDate,
  };
}

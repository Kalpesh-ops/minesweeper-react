import { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import GameControls from './components/GameControls';
import Statistics from './components/Statistics';
import Settings from './components/Settings';
import LoadingSpinner from './components/LoadingSpinner';
import useMinesweeper from './hooks/useMinesweeper';
import { setupKeyboardListeners } from './utils/keyboardUtils';
import themeManager from './utils/themeUtils';
import './App.css';

function App() {
  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const {
    board,
    gameState,
    mineCount,
    flagCount,
    time,
    difficulty,
    isLoading,
    handleCellClick,
    handleCellRightClick,
    startNewGame,
    changeDifficulty,
  } = useMinesweeper();

  // Setup keyboard shortcuts
  useEffect(() => {
    const cleanup = setupKeyboardListeners({
      onNewGame: startNewGame,
      onEscape: () => {
        setShowStats(false);
        setShowSettings(false);
      },
    });
    
    return cleanup;
  }, [startNewGame]);

  // Initialize theme system
  useEffect(() => {
    // Theme is already initialized in themeManager, but we ensure it's applied
    themeManager.applyTheme();
  }, []);

  return (
    <div className="app">
      <div className="app-header">
        <div className="app-title">
          <h1>💣 Minesweeper</h1>
        </div>
        <div className="header-actions">
          <button 
            className="stats-btn"
            onClick={() => setShowStats(true)}
            title="View Statistics"
          >
            📊 Stats
          </button>
          <button 
            className="stats-btn"
            onClick={() => setShowSettings(true)}
            title="Settings"
          >
            ⚙️ Settings
          </button>
        </div>
      </div>
      
      <div className="game-container">
        <GameControls
          gameState={gameState}
          mineCount={mineCount}
          flagCount={flagCount}
          time={time}
          onNewGame={startNewGame}
          difficulty={difficulty}
          onDifficultyChange={changeDifficulty}
        />
        {isLoading ? (
          <LoadingSpinner message="Initializing game..." />
        ) : (
          <GameBoard
            board={board}
            onCellClick={handleCellClick}
            onCellRightClick={handleCellRightClick}
            gameState={gameState}
          />
        )}
      </div>
      
      <div className="instructions">
        <p>💡 <strong>How to play:</strong></p>
        <ul>
          <li>Left click to reveal a cell</li>
          <li>Right click to flag/unflag a cell</li>
          <li>Numbers show how many mines are adjacent</li>
          <li>Flag all mines to win!</li>
        </ul>
      </div>
      
      <Statistics 
        isOpen={showStats} 
        onClose={() => setShowStats(false)} 
      />
      
      <Settings 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </div>
  );
}

export default App

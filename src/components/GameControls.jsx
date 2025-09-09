import './GameControls.css';

const GameControls = ({ 
  gameState, 
  mineCount, 
  flagCount, 
  time, 
  onNewGame, 
  difficulty, 
  onDifficultyChange 
}) => {
  const getGameStatusEmoji = () => {
    switch (gameState) {
      case 'won':
        return '😎';
      case 'lost':
        return '😵';
      default:
        return '😊';
    }
  };

  const difficulties = {
    beginner: { rows: 9, cols: 9, mines: 10, label: 'Beginner' },
    intermediate: { rows: 16, cols: 16, mines: 40, label: 'Intermediate' },
    expert: { rows: 16, cols: 30, mines: 99, label: 'Expert' },
  };

  return (
    <div className="game-controls">
      <div className="game-header">
        <div className="counter">
          <span className="counter-label">Mines:</span>
          <span className="counter-value">{Math.max(0, mineCount - flagCount).toString().padStart(3, '0')}</span>
        </div>
        
        <button className="new-game-btn" onClick={onNewGame}>
          {getGameStatusEmoji()}
        </button>
        
        <div className="counter">
          <span className="counter-label">Time:</span>
          <span className="counter-value">{time.toString().padStart(3, '0')}</span>
        </div>
      </div>
      
      <div className="difficulty-controls">
        <label htmlFor="difficulty-select">Difficulty:</label>
        <select 
          id="difficulty-select"
          value={difficulty} 
          onChange={(e) => onDifficultyChange(e.target.value)}
          className="difficulty-select"
        >
          {Object.entries(difficulties).map(([key, config]) => (
            <option key={key} value={key}>
              {config.label} ({config.rows}×{config.cols}, {config.mines} mines)
            </option>
          ))}
        </select>
      </div>
      
      {gameState === 'won' && (
        <div className="game-message win-message">
          🎉 Congratulations! You won! 🎉
        </div>
      )}
      
      {gameState === 'lost' && (
        <div className="game-message lose-message">
          💥 Game Over! Try again! 💥
        </div>
      )}
    </div>
  );
};

export default GameControls;

import GameBoard from './components/GameBoard';
import GameControls from './components/GameControls';
import useMinesweeper from './hooks/useMinesweeper';
import './App.css';

function App() {
  const {
    board,
    gameState,
    mineCount,
    flagCount,
    time,
    difficulty,
    handleCellClick,
    handleCellRightClick,
    startNewGame,
    changeDifficulty,
  } = useMinesweeper();

  return (
    <div className="app">
      <h1>🎯 Minesweeper</h1>
      <GameControls
        gameState={gameState}
        mineCount={mineCount}
        flagCount={flagCount}
        time={time}
        onNewGame={startNewGame}
        difficulty={difficulty}
        onDifficultyChange={changeDifficulty}
      />
      <GameBoard
        board={board}
        onCellClick={handleCellClick}
        onCellRightClick={handleCellRightClick}
        gameState={gameState}
      />
      <div className="instructions">
        <p>💡 <strong>How to play:</strong></p>
        <ul>
          <li>Left click to reveal a cell</li>
          <li>Right click to flag/unflag a cell</li>
          <li>Numbers show how many mines are adjacent</li>
          <li>Flag all mines to win!</li>
        </ul>
      </div>
    </div>
  );
}

export default App

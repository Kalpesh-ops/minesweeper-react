import Cell from './Cell';
import './GameBoard.css';

const GameBoard = ({ board, onCellClick, onCellRightClick, gameState }) => {
  return (
    <div className="game-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="game-row">
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              row={rowIndex}
              col={colIndex}
              onCellClick={onCellClick}
              onCellRightClick={onCellRightClick}
              gameState={gameState}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;

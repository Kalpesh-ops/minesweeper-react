import { CELL_STATES } from '../utils/minesweeperUtils';
import './Cell.css';

const Cell = ({ cell, row, col, onCellClick, onCellRightClick, gameState }) => {
  const handleClick = () => {
    if (gameState === 'playing' && cell.state === CELL_STATES.HIDDEN) {
      onCellClick(row, col);
    }
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    if (gameState === 'playing' && cell.state !== CELL_STATES.REVEALED) {
      onCellRightClick(row, col);
    }
  };

  const getCellContent = () => {
    if (cell.state === CELL_STATES.FLAGGED) {
      return '🚩';
    }
    
    if (cell.state === CELL_STATES.REVEALED) {
      if (cell.isMine) {
        return '💣';
      }
      if (cell.neighborCount > 0) {
        return cell.neighborCount;
      }
    }
    
    return '';
  };

  const getCellClassName = () => {
    let className = 'cell';
    
    if (cell.state === CELL_STATES.REVEALED) {
      className += ' revealed';
      if (cell.isMine) {
        className += ' mine';
      } else if (cell.neighborCount > 0) {
        className += ` number-${cell.neighborCount}`;
      }
    } else if (cell.state === CELL_STATES.FLAGGED) {
      className += ' flagged';
    } else {
      className += ' hidden';
    }
    
    return className;
  };

  return (
    <button
      className={getCellClassName()}
      onClick={handleClick}
      onContextMenu={handleRightClick}
      disabled={cell.state === CELL_STATES.REVEALED}
    >
      {getCellContent()}
    </button>
  );
};

export default Cell;

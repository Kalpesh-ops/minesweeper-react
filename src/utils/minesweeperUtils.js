// Minesweeper utility functions

export const CELL_STATES = {
  HIDDEN: 'hidden',
  REVEALED: 'revealed',
  FLAGGED: 'flagged',
};

export const GAME_STATES = {
  PLAYING: 'playing',
  WON: 'won',
  LOST: 'lost',
};

// Create an empty board
export function createBoard(rows, cols) {
  return Array(rows).fill(null).map(() => 
    Array(cols).fill(null).map(() => ({
      isMine: false,
      neighborCount: 0,
      state: CELL_STATES.HIDDEN,
    }))
  );
}

// Place mines randomly on the board
export function placeMines(board, mineCount, firstClickRow, firstClickCol) {
  const rows = board.length;
  const cols = board[0].length;
  const totalCells = rows * cols;
  const safeCells = getSafeCells(rows, cols, firstClickRow, firstClickCol);
  
  let minesPlaced = 0;
  while (minesPlaced < mineCount) {
    const randomIndex = Math.floor(Math.random() * safeCells.length);
    const [row, col] = safeCells[randomIndex];
    
    if (!board[row][col].isMine) {
      board[row][col].isMine = true;
      minesPlaced++;
    }
  }
  
  // Calculate neighbor counts
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!board[row][col].isMine) {
        board[row][col].neighborCount = countNeighborMines(board, row, col);
      }
    }
  }
  
  return board;
}

// Get cells that are safe for first click (not adjacent to first click)
function getSafeCells(rows, cols, firstClickRow, firstClickCol) {
  const safeCells = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const isAdjacent = Math.abs(row - firstClickRow) <= 1 && 
                        Math.abs(col - firstClickCol) <= 1;
      if (!isAdjacent) {
        safeCells.push([row, col]);
      }
    }
  }
  return safeCells;
}

// Count mines in neighboring cells
export function countNeighborMines(board, row, col) {
  let count = 0;
  const rows = board.length;
  const cols = board[0].length;
  
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const newRow = row + i;
      const newCol = col + j;
      
      if (newRow >= 0 && newRow < rows && 
          newCol >= 0 && newCol < cols && 
          board[newRow][newCol].isMine) {
        count++;
      }
    }
  }
  
  return count;
}

// Reveal a cell and adjacent cells if it's empty
export function revealCell(board, row, col) {
  const rows = board.length;
  const cols = board[0].length;
  const newBoard = board.map(row => row.map(cell => ({ ...cell })));
  
  function reveal(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) return;
    if (newBoard[r][c].state !== CELL_STATES.HIDDEN) return;
    
    newBoard[r][c].state = CELL_STATES.REVEALED;
    
    // If it's an empty cell (no neighboring mines), reveal neighbors
    if (newBoard[r][c].neighborCount === 0 && !newBoard[r][c].isMine) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          reveal(r + i, c + j);
        }
      }
    }
  }
  
  reveal(row, col);
  return newBoard;
}

// Toggle flag on a cell
export function toggleFlag(board, row, col) {
  const newBoard = board.map(row => row.map(cell => ({ ...cell })));
  const cell = newBoard[row][col];
  
  if (cell.state === CELL_STATES.HIDDEN) {
    cell.state = CELL_STATES.FLAGGED;
  } else if (cell.state === CELL_STATES.FLAGGED) {
    cell.state = CELL_STATES.HIDDEN;
  }
  
  return newBoard;
}

// Check if the game is won
export function checkGameWon(board) {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      const cell = board[row][col];
      if (!cell.isMine && cell.state !== CELL_STATES.REVEALED) {
        return false;
      }
    }
  }
  return true;
}

// Reveal all mines (for game over)
export function revealAllMines(board) {
  return board.map(row => 
    row.map(cell => {
      if (cell.isMine && cell.state !== CELL_STATES.FLAGGED) {
        return { ...cell, state: CELL_STATES.REVEALED };
      }
      return cell;
    })
  );
}

// Count remaining flags
export function getRemainingFlags(board, totalMines) {
  let flagCount = 0;
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      if (board[row][col].state === CELL_STATES.FLAGGED) {
        flagCount++;
      }
    }
  }
  return totalMines - flagCount;
}

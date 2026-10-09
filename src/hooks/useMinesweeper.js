import { useState, useEffect, useCallback } from 'react';
import {
  createBoard,
  placeMines,
  revealCell,
  toggleFlag,
  checkGameWon,
  revealAllMines,
  getRemainingFlags,
  GAME_STATES,
  CELL_STATES
} from '../utils/minesweeperUtils';
import { updateGameStats } from '../utils/statisticsUtils';
import soundManager from '../utils/soundUtils';

const DIFFICULTIES = {
  beginner: { rows: 9, cols: 9, mines: 10 },
  intermediate: { rows: 16, cols: 16, mines: 40 },
  expert: { rows: 16, cols: 30, mines: 99 },
};

const useMinesweeper = (initialDifficulty = 'beginner') => {
  const [difficulty, setDifficulty] = useState(initialDifficulty);
  const [board, setBoard] = useState(() => {
    const config = DIFFICULTIES[initialDifficulty];
    return createBoard(config.rows, config.cols);
  });
  const [gameState, setGameState] = useState(GAME_STATES.PLAYING);
  const [mineCount, setMineCount] = useState(DIFFICULTIES[initialDifficulty].mines);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (timerActive && gameState === GAME_STATES.PLAYING) {
      interval = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    } else if (!timerActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, gameState]);

  // Stop timer when game ends
  useEffect(() => {
    if (gameState !== GAME_STATES.PLAYING) {
      setTimerActive(false);
    }
  }, [gameState]);

  const initializeGame = useCallback(async (newDifficulty = difficulty) => {
    setIsLoading(true);
    
    try {
      // Simulate brief loading for better UX (especially on difficulty change)
      await new Promise(resolve => setTimeout(resolve, 150));
      
      const config = DIFFICULTIES[newDifficulty];
      setBoard(createBoard(config.rows, config.cols));
      setGameState(GAME_STATES.PLAYING);
      setMineCount(config.mines);
      setIsFirstClick(true);
      setTime(0);
      setTimerActive(false);
      setDifficulty(newDifficulty);
    } finally {
      setIsLoading(false);
    }
  }, [difficulty]);

  const handleCellClick = useCallback((row, col) => {
    if (gameState !== GAME_STATES.PLAYING) return;
    if (board[row][col].state !== CELL_STATES.HIDDEN) return;

    let newBoard = [...board];

    // Handle first click - place mines
    if (isFirstClick) {
      newBoard = placeMines(newBoard, mineCount, row, col);
      setIsFirstClick(false);
      setTimerActive(true);
    }

    // Reveal the cell
    newBoard = revealCell(newBoard, row, col);
    setBoard(newBoard);

    // Check if clicked on a mine
    if (newBoard[row][col].isMine) {
      setGameState(GAME_STATES.LOST);
      updateGameStats(difficulty, 'lost', time);
      soundManager.playMineHit();
      setTimeout(() => soundManager.playLose(), 300);
      setBoard(revealAllMines(newBoard));
      return;
    }

    // Play reveal sound
    soundManager.playReveal();

    // Check if won
    if (checkGameWon(newBoard)) {
      setGameState(GAME_STATES.WON);
      updateGameStats(difficulty, 'won', time);
      setTimeout(() => soundManager.playWin(), 200);
    }
  }, [board, gameState, isFirstClick, mineCount]);

  const handleCellRightClick = useCallback((row, col) => {
    if (gameState !== GAME_STATES.PLAYING) return;
    if (board[row][col].state === CELL_STATES.REVEALED) return;

    const newBoard = toggleFlag(board, row, col);
    setBoard(newBoard);
    soundManager.playFlag();
  }, [board, gameState]);

  const startNewGame = useCallback(() => {
    initializeGame();
  }, [initializeGame]);

  const changeDifficulty = useCallback((newDifficulty) => {
    initializeGame(newDifficulty);
  }, [initializeGame]);

  const flagCount = board.flat().filter(cell => cell.state === CELL_STATES.FLAGGED).length;

  return {
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
  };
};

export default useMinesweeper;

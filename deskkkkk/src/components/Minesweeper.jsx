import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';

const BOARD_SIZE = 9;
const MINE_COUNT = 10;

const Minesweeper = ({ onClose, zIndex, onFocus, isMinimized, isMaximized, onMinimize, onMaximize }) => {
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [minesLeft, setMinesLeft] = useState(MINE_COUNT);

  // Initialize Board
  const initBoard = () => {
    let cells = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null).map(() => ({
      isMine: false,
      revealed: false,
      flagged: false,
      count: 0
    })));

    // Plant Mines
    let planted = 0;
    while (planted < MINE_COUNT) {
      let r = Math.floor(Math.random() * BOARD_SIZE);
      let c = Math.floor(Math.random() * BOARD_SIZE);
      if (!cells[r][c].isMine) {
        cells[r][c].isMine = true;
        planted++;
      }
    }

    // Calculate neighboring mines count
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        if (!cells[r][c].isMine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              if (r + dr >= 0 && r + dr < BOARD_SIZE && c + dc >= 0 && c + dc < BOARD_SIZE) {
                if (cells[r + dr][c + dc].isMine) count++;
              }
            }
          }
          cells[r][c].count = count;
        }
      }
    }

    setBoard(cells);
    setGameOver(false);
    setWin(false);
    setMinesLeft(MINE_COUNT);
  };

  useEffect(() => {
    initBoard();
  }, []);

  const revealCell = (r, c) => {
    if (gameOver || win || board[r][c].revealed || board[r][c].flagged) return;

    let newBoard = [...board.map(row => [...row])];
    if (newBoard[r][c].isMine) {
      // reveal all mines and end game
      newBoard.forEach(row => row.forEach(cell => {
        if (cell.isMine) cell.revealed = true;
      }));
      setBoard(newBoard);
      setGameOver(true);
      return;
    }

    // Flood Fill
    const reveal = (row, col) => {
      if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE) return;
      if (newBoard[row][col].revealed || newBoard[row][col].isMine || newBoard[row][col].flagged) return;

      newBoard[row][col].revealed = true;
      if (newBoard[row][col].count === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            reveal(row + dr, col + dc);
          }
        }
      }
    };

    reveal(r, c);

    // Check Win
    let revealCount = 0;
    newBoard.forEach(row => row.forEach(cell => {
      if (cell.revealed) revealCount++;
    }));
    if (revealCount === BOARD_SIZE * BOARD_SIZE - MINE_COUNT) {
      setWin(true);
    }
    setBoard(newBoard);
  };

  const toggleFlag = (e, r, c) => {
    e.preventDefault();
    if (gameOver || win || board[r][c].revealed) return;

    let newBoard = [...board.map(row => [...row])];
    const isCurrentlyFlagged = newBoard[r][c].flagged;
    newBoard[r][c].flagged = !isCurrentlyFlagged;
    setMinesLeft(prev => prev + (isCurrentlyFlagged ? 1 : -1));
    setBoard(newBoard);
  };

  return (
    <Rnd
      default={{ x: 250, y: 100, width: 220, height: 300 }}
      size={isMaximized ? { width: '100%', height: 'calc(100vh - 30px)' } : undefined}
      position={isMaximized ? { x: 0, y: 0 } : undefined}
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
      bounds="window"
      dragHandleClassName="xp-titlebar"
      style={{ zIndex, display: isMinimized ? 'none' : 'block' }}
    >
      <div className="xp-window w-full h-full flex flex-col select-none" onMouseDown={onFocus}>
        {/* Header */}
        <div className="xp-titlebar">
          <div className="flex items-center">
            <span className="font-bold text-white pl-1">Minesweeper</span>
          </div>
          <div className="flex gap-0.5">
            <button className="xp-btn-min" onClick={(e) => { e.stopPropagation(); onMinimize(); }}>
              <svg className="w-2 h-2 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <button className="xp-btn-max" onClick={(e) => { e.stopPropagation(); onMaximize(); }}>
              <svg className="w-2 h-2 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <rect x="3" y="5" width="18" height="14" />
              </svg>
            </button>
            <button className="xp-btn-close" onClick={onClose}>
              <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </svg>
            </button>
          </div>
        </div>

        {/* Board Body */}
        <div className="p-3 bg-[#ece9d8] flex-1 flex flex-col justify-between items-center">
          {/* Status Bar */}
          <div className="flex justify-between items-center w-full border-2 border-gray-400 bg-[#ece9d8] px-3 py-1 mb-3">
            <span className="font-mono text-red-600 font-bold text-lg">{String(minesLeft).padStart(3, '0')}</span>
            <button
              onClick={initBoard}
              className="w-8 h-8 flex items-center justify-center border-t-2 border-l-2 border-white border-r-2 border-b-2 border-gray-500 bg-[#ece9d8] hover:bg-gray-200 text-lg active:border-inset"
            >
              {gameOver ? '😵' : win ? '😎' : '🙂'}
            </button>
            <span className="font-mono text-red-600 font-bold text-lg">000</span>
          </div>

          {/* Grid */}
          <div className="border-t-2 border-l-2 border-gray-600 border-r-2 border-b-2 border-white p-1 bg-[#c0c0c0] grid grid-cols-9 gap-0.5">
            {board.map((row, r) =>
              row.map((cell, c) => (
                <div
                  key={`${r}-${c}`}
                  onClick={() => revealCell(r, c)}
                  onContextMenu={(e) => toggleFlag(e, r, c)}
                  className={`w-5 h-5 flex items-center justify-center font-bold text-xs cursor-pointer select-none ${
                    cell.revealed
                      ? 'bg-[#ece9d8] border border-gray-400'
                      : 'bg-[#ece9d8] border-t-2 border-l-2 border-white border-r-2 border-b-2 border-gray-600 shadow-sm active:border-1'
                  }`}
                  style={{
                    color: cell.count === 1 ? 'blue' : cell.count === 2 ? 'green' : cell.count === 3 ? 'red' : cell.count === 4 ? 'darkblue' : 'black'
                  }}
                >
                  {cell.revealed
                    ? cell.isMine
                      ? '💣'
                      : cell.count > 0
                      ? cell.count
                      : ''
                    : cell.flagged
                    ? '🚩'
                    : ''}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Rnd>
  );
};

export default Minesweeper;

import React, { createContext, useContext, useState, useCallback } from 'react';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const [boardSize, setBoardSize] = useState(7);
  const [theme, setTheme] = useState('dark');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState('smooth');
  const [gameState, setGameState] = useState('menu');
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [winner, setWinner] = useState(null);
  const [board, setBoard] = useState([]);
  const [player1Position, setPlayer1Position] = useState({ x: 1, y: Math.floor(7 / 2) });
  const [player2Position, setPlayer2Position] = useState({ x: 5, y: Math.floor(7 / 2) });

  const initializeBoard = useCallback((size = boardSize) => {
    const newBoard = Array(size).fill().map(() => Array(size).fill(0));
    const center = Math.floor(size / 2);
    
    setBoard(newBoard);
    setPlayer1Position({ x: 1, y: center });
    setPlayer2Position({ x: size - 2, y: center });
    setCurrentPlayer(1);
    setWinner(null);
    setGameState('playing');
  }, [boardSize]);

  const getMirroredMove = (direction) => {
    const mirrorMap = {
      'up': 'down',
      'down': 'up',
      'left': 'right',
      'right': 'left'
    };
    return mirrorMap[direction];
  };

  const getNewPosition = (currentPos, direction) => {
    const moves = {
      'up': { x: 0, y: -1 },
      'down': { x: 0, y: 1 },
      'left': { x: -1, y: 0 },
      'right': { x: 1, y: 0 }
    };
    
    const move = moves[direction];
    return {
      x: currentPos.x + move.x,
      y: currentPos.y + move.y
    };
  };

  const isValidPosition = (pos, size = boardSize) => {
    return pos.x >= 0 && pos.x < size && pos.y >= 0 && pos.y < size;
  };

  const canPlayerMove = (playerPos) => {
    const directions = ['up', 'down', 'left', 'right'];
    return directions.some(direction => {
      const newPos = getNewPosition(playerPos, direction);
      return isValidPosition(newPos) && 
             !(newPos.x === (currentPlayer === 1 ? player2Position.x : player1Position.x) &&
               newPos.y === (currentPlayer === 1 ? player2Position.y : player1Position.y));
    });
  };

  const makeMove = useCallback((direction) => {
    if (gameState !== 'playing' || winner) return false;

    const activePlayerPos = currentPlayer === 1 ? player1Position : player2Position;
    const inactivePlayerPos = currentPlayer === 1 ? player2Position : player1Position;
    
    const mirroredDirection = getMirroredMove(direction);
    
    const activeNewPos = getNewPosition(activePlayerPos, direction);
    const inactiveNewPos = getNewPosition(inactivePlayerPos, mirroredDirection);
    
    let activeCanMove = isValidPosition(activeNewPos) && 
                       !(activeNewPos.x === inactivePlayerPos.x && activeNewPos.y === inactivePlayerPos.y);
    let inactiveCanMove = isValidPosition(inactiveNewPos) && 
                         !(inactiveNewPos.x === activePlayerPos.x && inactiveNewPos.y === activePlayerPos.y);

    if (currentPlayer === 1) {
      if (activeCanMove) setPlayer1Position(activeNewPos);
      if (inactiveCanMove) setPlayer2Position(inactiveNewPos);
    } else {
      if (activeCanMove) setPlayer2Position(activeNewPos);
      if (inactiveCanMove) setPlayer1Position(inactiveNewPos);
    }

    setTimeout(() => {
      const nextPlayer = currentPlayer === 1 ? 2 : 1;
      const nextPlayerPos = nextPlayer === 1 ? 
        (activeCanMove && currentPlayer === 1 ? activeNewPos : player1Position) :
        (inactiveCanMove && currentPlayer === 2 ? inactiveNewPos : player2Position);
      
      if (!canPlayerMove(nextPlayerPos)) {
        setWinner(currentPlayer);
        setGameState('finished');
      } else {
        setCurrentPlayer(nextPlayer);
      }
    }, 300);

    return true;
  }, [currentPlayer, player1Position, player2Position, gameState, winner, boardSize]);

  const resetGame = useCallback(() => {
    initializeBoard();
  }, [initializeBoard]);

  const value = {
    boardSize,
    setBoardSize,
    theme,
    setTheme,
    soundEnabled,
    setSoundEnabled,
    animationSpeed,
    setAnimationSpeed,
    gameState,
    setGameState,
    currentPlayer,
    winner,
    board,
    player1Position,
    player2Position,
    initializeBoard,
    makeMove,
    resetGame,
    canPlayerMove
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

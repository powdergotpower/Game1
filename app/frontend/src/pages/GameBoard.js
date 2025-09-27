import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw, Home, Trophy } from 'lucide-react';
import { useGame } from '../context/GameContext';

const GameBoard = () => {
  const {
    boardSize,
    currentPlayer,
    winner,
    gameState,
    player1Position,
    player2Position,
    initializeBoard,
    makeMove,
    resetGame
  } = useGame();

  useEffect(() => {
    if (gameState === 'menu') {
      initializeBoard();
    }
  }, [gameState, initializeBoard]);

  const handleMove = (direction) => {
    if (winner) return;
    makeMove(direction);
  };

  const renderCell = (x, y) => {
    const isPlayer1 = player1Position.x === x && player1Position.y === y;
    const isPlayer2 = player2Position.x === x && player2Position.y === y;
    
    let cellClass = "w-12 h-12 border border-slate-600 flex items-center justify-center transition-all duration-300 relative";
    
    if ((x + y) % 2 === 0) {
      cellClass += " bg-slate-800";
    } else {
      cellClass += " bg-slate-700";
    }

    return (
      <div key={`${x}-${y}`} className={cellClass}>
        {isPlayer1 && (
          <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-blue-300 shadow-lg animate-pulse">
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">1</span>
            </div>
          </div>
        )}
        {isPlayer2 && (
          <div className="w-8 h-8 bg-red-500 rounded-full border-2 border-red-300 shadow-lg animate-pulse">
            <div className="w-full h-full bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">2</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderBoard = () => {
    const rows = [];
    for (let y = 0; y < boardSize; y++) {
      const cells = [];
      for (let x = 0; x < boardSize; x++) {
        cells.push(renderCell(x, y));
      }
      rows.push(
        <div key={y} className="flex">
          {cells}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-200 via-white to-slate-200 bg-clip-text text-transparent mb-2">
            Mirror Duel
          </h1>
          
          {winner ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 text-3xl font-bold">
                <Trophy className="h-8 w-8 text-yellow-500" />
                <span className={winner === 1 ? "text-blue-400" : "text-red-400"}>
                  Player {winner} Wins!
                </span>
                <Trophy className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="text-slate-300 text-lg">
                🎉 The mirror has been shattered! 🎉
              </div>
            </div>
          ) : (
            <div className="text-2xl font-semibold">
              <span className="text-slate-300">Current Turn: </span>
              <span className={currentPlayer === 1 ? "text-blue-400" : "text-red-400"}>
                Player {currentPlayer}
              </span>
            </div>
          )}
        </div>

        {/* Game Board */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-800 p-6 rounded-lg shadow-2xl border border-slate-700">
            <div className="space-y-0">
              {renderBoard()}
            </div>
          </div>
        </div>

        {/* Controls */}
        {!winner && (
          <div className="flex justify-center mb-8">
            <div className="bg-slate-800 p-6 rounded-lg shadow-xl border border-slate-700">
              <p className="text-center text-slate-300 mb-4">
                Player {currentPlayer}, make your move:
              </p>
              <div className="grid grid-cols-3 gap-3 max-w-48 mx-auto">
                <div></div>
                <Button
                  onClick={() => handleMove('up')}
                  variant="outline"
                  size="lg"
                  className="h-12 w-12 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200"
                >
                  <ArrowUp className="h-5 w-5" />
                </Button>
                <div></div>
                
                <Button
                  onClick={() => handleMove('left')}
                  variant="outline"
                  size="lg"
                  className="h-12 w-12 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="flex items-center justify-center">
                  <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
                </div>
                <Button
                  onClick={() => handleMove('right')}
                  variant="outline"
                  size="lg"
                  className="h-12 w-12 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200"
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
                
                <div></div>
                <Button
                  onClick={() => handleMove('down')}
                  variant="outline"
                  size="lg"
                  className="h-12 w-12 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200"
                >
                  <ArrowDown className="h-5 w-5" />
                </Button>
                <div></div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-6">
          <Button
            onClick={resetGame}
            className="h-12 px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            New Game
          </Button>
          
          <Link to="/">
            <Button
              variant="outline"
              className="h-12 px-6 border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-300"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
        </div>

        {/* Game Rules Reminder */}
        <div className="mt-12 text-center">
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-slate-200 mb-3">Mirror Rules</h3>
            <div className="text-slate-300 space-y-2">
              <p>• When you move ⬅️ LEFT, opponent moves ➡️ RIGHT</p>
              <p>• When you move ⬆️ UP, opponent moves ⬇️ DOWN</p>
              <p>• First to trap the opponent wins!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;

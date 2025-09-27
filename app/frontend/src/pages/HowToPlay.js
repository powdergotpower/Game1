import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Home, Play, ChevronLeft, ChevronRight } from 'lucide-react';

const HowToPlay = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Welcome to Mirror Duel",
      content: (
        <div className="text-center space-y-6">
          <div className="text-6xl">🪞</div>
          <p className="text-lg text-slate-300">
            Mirror Duel is a strategic board game where every move creates its mirror image.
            Two players compete to trap each other using mirrored movements.
          </p>
          <div className="bg-slate-700 p-4 rounded-lg">
            <p className="text-cyan-400 font-semibold">Goal: Be the first to trap your opponent!</p>
          </div>
        </div>
      )
    },
    {
      title: "The Board Setup",
      content: (
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="grid grid-cols-7 gap-1 bg-slate-800 p-4 rounded-lg">
              {Array.from({ length: 49 }, (_, i) => {
                const x = i % 7;
                const y = Math.floor(i / 7);
                const isPlayer1 = x === 1 && y === 3;
                const isPlayer2 = x === 5 && y === 3;
                
                return (
                  <div
                    key={i}
                    className={`w-6 h-6 border border-slate-600 flex items-center justify-center ${
                      (x + y) % 2 === 0 ? 'bg-slate-800' : 'bg-slate-700'
                    }`}
                  >
                    {isPlayer1 && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">1</span>
                      </div>
                    )}
                    {isPlayer2 && (
                      <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">2</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-slate-300">
              • <span className="text-blue-400 font-semibold">Blue Player (1)</span> starts on the left
            </p>
            <p className="text-slate-300">
              • <span className="text-red-400 font-semibold">Red Player (2)</span> starts on the right
            </p>
            <p className="text-slate-300">
              • Players take turns making moves
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Mirror Movement Rules",
      content: (
        <div className="space-y-8">
          <p className="text-lg text-slate-300 text-center">
            When one player moves, the other player's pawn moves in the <span className="text-cyan-400 font-semibold">opposite direction</span>
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-700 p-4 rounded-lg space-y-3">
              <h4 className="font-semibold text-slate-200 text-center">If Player 1 moves:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ArrowLeft className="h-4 w-4 text-blue-400 mr-2" />
                    <span>LEFT</span>
                  </div>
                  <span className="text-slate-400">→</span>
                  <div className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-red-400 mr-2" />
                    <span>Player 2 goes RIGHT</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ArrowUp className="h-4 w-4 text-blue-400 mr-2" />
                    <span>UP</span>
                  </div>
                  <span className="text-slate-400">→</span>
                  <div className="flex items-center">
                    <ArrowDown className="h-4 w-4 text-red-400 mr-2" />
                    <span>Player 2 goes DOWN</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-700 p-4 rounded-lg">
              <div className="text-center">
                <div className="text-4xl mb-2">⚡</div>
                <p className="text-sm text-slate-300">
                  <strong>Important:</strong> If a mirrored move would go off the board or hit the other player, 
                  that pawn stays in place while the other still moves!
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Winning the Game",
      content: (
        <div className="text-center space-y-6">
          <div className="text-6xl">🏆</div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-slate-200">How to Win</h3>
            <p className="text-lg text-slate-300">
              Trap your opponent so they cannot move in any direction!
            </p>
            
            <div className="bg-slate-700 p-6 rounded-lg space-y-4">
              <h4 className="font-semibold text-slate-200">A player is trapped when:</h4>
              <div className="text-left space-y-2 text-slate-300">
                <p>• All adjacent cells are occupied or off the board</p>
                <p>• Every possible move would collide with the other player</p>
                <p>• No legal moves remain in any direction</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-lg">
              <p className="text-white font-semibold">
                Think strategically! Use the mirror effect to control your opponent's movement.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Ready to Play!",
      content: (
        <div className="text-center space-y-8">
          <div className="text-6xl">🎮</div>
          <h3 className="text-2xl font-semibold text-slate-200">You're ready to start your first Mirror Duel!</h3>
          
          <div className="bg-slate-700 p-6 rounded-lg space-y-4">
            <h4 className="font-semibold text-slate-200">Quick Recap:</h4>
            <div className="text-left space-y-2 text-slate-300">
              <p>✅ Take turns moving your pawn</p>
              <p>✅ Opponent moves in mirrored direction</p>
              <p>✅ Trap opponent to win</p>
              <p>✅ Think ahead - every move affects both players!</p>
            </div>
          </div>
          
          <Link to="/game">
            <Button className="h-14 px-8 text-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105">
              <Play className="mr-3 h-6 w-6" />
              Start Playing!
            </Button>
          </Link>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-200 via-white to-slate-200 bg-clip-text text-transparent mb-4">
            How to Play
          </h1>
          <div className="flex justify-center items-center space-x-2 text-slate-400">
            <span>Step {currentStep + 1} of {tutorialSteps.length}</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-slate-800 p-8 rounded-xl shadow-lg space-y-8">
          <h2 className="text-3xl font-semibold text-slate-200 text-center">{tutorialSteps[currentStep].title}</h2>
          <div>{tutorialSteps[currentStep].content}</div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Previous</span>
          </Button>

          <Button
            onClick={nextStep}
            disabled={currentStep === tutorialSteps.length - 1}
            className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 transition-all"
          >
            <span>Next</span>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link to="/" className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300">
            <Home className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;

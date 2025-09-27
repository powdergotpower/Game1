import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Play, BookOpen, Settings, Info } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8">
      <div className="text-center space-y-12 max-w-2xl mx-auto">
        {/* Title with Mirror Effect */}
        <div className="relative">
          <h1 className="text-8xl font-bold bg-gradient-to-r from-slate-200 via-white to-slate-200 bg-clip-text text-transparent mb-4 tracking-wider">
            MIRROR
          </h1>
          <h2 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent tracking-wider">
            DUEL
          </h2>
          
          {/* Reflection Effect */}
          <div className="relative mt-8 opacity-30 transform scale-y-[-1]">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-200 via-white to-slate-200 bg-clip-text text-transparent tracking-wider">
              MIRROR
            </h1>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent tracking-wider">
              DUEL
            </h2>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-xl text-slate-300 max-w-lg mx-auto leading-relaxed">
          A strategic board game where every move creates its mirror. 
          <br />
          <span className="text-cyan-400 font-semibold">Trap your opponent to win.</span>
        </p>

        {/* Menu Buttons */}
        <div className="space-y-6 max-w-md mx-auto">
          <Link to="/game">
            <Button 
              className="w-full h-16 text-xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Play className="mr-3 h-6 w-6" />
              Play Game
            </Button>
          </Link>

          <Link to="/how-to-play">
            <Button 
              variant="outline" 
              className="w-full h-14 text-lg font-medium border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              <BookOpen className="mr-3 h-5 w-5" />
              How to Play
            </Button>
          </Link>

          <Link to="/settings">
            <Button 
              variant="outline" 
              className="w-full h-14 text-lg font-medium border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Button>
          </Link>

          <Button 
            variant="ghost" 
            className="w-full h-12 text-base font-medium text-slate-400 hover:text-slate-200 transition-all duration-300"
          >
            <Info className="mr-3 h-4 w-4" />
            About Game
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-cyan-500 rounded-full opacity-10 blur-3xl animate-pulse animation-delay-1000"></div>
      </div>
    </div>
  );
};

export default HomePage;

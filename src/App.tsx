import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, ArrowRight, RefreshCw, Download, Share2, User, Flame, Waves, Ghost, Shield, Heart } from 'lucide-react';
import { CHARACTERS, QUESTIONS } from './constants';
import { CharacterKey, CharacterInfo } from './types';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type GameState = 'welcome' | 'quiz' | 'calculating' | 'result';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<CharacterKey, number>>({
    nezha: 0,
    aobing: 0,
    shengongbao: 0,
    lijing: 0,
    yinfuren: 0,
  });
  const [playerName, setPlayerName] = useState('');
  const [resultCharacter, setResultCharacter] = useState<CharacterKey | null>(null);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [isGeneratingPoster, setIsGeneratingPoster] = useState(false);

  const handleStart = () => {
    if (!playerName.trim()) return;
    setGameState('quiz');
  };

  const handleAnswer = (character: CharacterKey) => {
    setScores(prev => ({ ...prev, [character]: prev[character] + 1 }));
    
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    setGameState('calculating');
    setTimeout(() => {
      let maxScore = -1;
      let winner: CharacterKey = 'nezha';
      
      // Find the character with the highest score
      (Object.keys(scores) as CharacterKey[]).forEach((key) => {
        const score = scores[key];
        if (score > maxScore) {
          maxScore = score;
          winner = key;
        }
      });
      
      setResultCharacter(winner);
      setGameState('result');
      generatePoster(winner);
    }, 2000);
  };

  const generatePoster = async (characterKey: CharacterKey) => {
    setIsGeneratingPoster(true);
    try {
      const character = CHARACTERS[characterKey];
      const prompt = `${character.prompt} 文本元素：玩家名字：${playerName} 的角色海报。角色名字：${character.name}。性格标签：${character.tag}。台词："${character.quote}"`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: [{ parts: [{ text: prompt }] }],
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64Data = part.inlineData.data;
          setPosterUrl(`data:image/png;base64,${base64Data}`);
          break;
        }
      }
    } catch (error) {
      console.error('Error generating poster:', error);
    } finally {
      setIsGeneratingPoster(false);
    }
  };

  const resetGame = () => {
    setGameState('welcome');
    setCurrentQuestionIndex(0);
    setScores({
      nezha: 0,
      aobing: 0,
      shengongbao: 0,
      lijing: 0,
      yinfuren: 0,
    });
    setResultCharacter(null);
    setPosterUrl(null);
  };

  const renderWelcome = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-[#E4E3E0]"
    >
      <div className="max-w-md w-full space-y-8">
        <div className="space-y-4">
          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-6xl font-black tracking-tighter text-[#141414] uppercase leading-none"
          >
            哪吒角色<br />测试
          </motion.h1>
          <p className="text-xl font-medium text-[#141414]/60 italic serif">
            "我命由我，不由天！"
          </p>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder="输入你的大名..."
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-6 py-4 text-lg font-mono bg-white border-2 border-[#141414] focus:outline-none focus:ring-0 focus:border-[#141414] shadow-[4px_4px_0px_0px_rgba(20,20,20,1)] transition-all"
            />
            <User className="absolute right-4 top-1/2 -translate-y-1/2 text-[#141414]/40" size={20} />
          </div>

          <button
            onClick={handleStart}
            disabled={!playerName.trim()}
            className="w-full py-4 px-8 bg-[#141414] text-[#E4E3E0] font-bold text-xl uppercase tracking-widest hover:bg-[#141414]/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group transition-all"
          >
            开始测试
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="pt-12 grid grid-cols-5 gap-2 opacity-30">
          <Flame size={24} />
          <Waves size={24} />
          <Ghost size={24} />
          <Shield size={24} />
          <Heart size={24} />
        </div>
      </div>
    </motion.div>
  );

  const renderQuiz = () => {
    const question = QUESTIONS[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;

    return (
      <motion.div 
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="flex flex-col min-h-screen bg-[#E4E3E0] p-6"
      >
        <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col py-12">
          <div className="mb-12 space-y-4">
            <div className="flex justify-between items-end">
              <span className="font-mono text-sm font-bold uppercase tracking-tighter">
                Question {currentQuestionIndex + 1} / {QUESTIONS.length}
              </span>
              <span className="font-mono text-sm font-bold">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-white border-2 border-[#141414]">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-[#141414]"
              />
            </div>
          </div>

          <h2 className="text-4xl font-black text-[#141414] mb-12 leading-tight">
            {question.text}
          </h2>

          <div className="grid gap-4">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option.character)}
                className="group relative w-full text-left p-6 bg-white border-2 border-[#141414] hover:bg-[#141414] hover:text-[#E4E3E0] transition-all shadow-[4px_4px_0px_0px_rgba(20,20,20,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-lg font-bold opacity-40 group-hover:opacity-100">
                    0{idx + 1}
                  </span>
                  <span className="text-xl font-bold">{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  const renderCalculating = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#141414] text-[#E4E3E0] p-6">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="mb-8"
      >
        <RefreshCw size={64} />
      </motion.div>
      <h2 className="text-3xl font-black uppercase tracking-widest mb-4">正在觉醒你的元神...</h2>
      <p className="font-mono opacity-60">正在分析你的性格特质与角色契合度</p>
    </div>
  );

  const renderResult = () => {
    if (!resultCharacter) return null;
    const character = CHARACTERS[resultCharacter];

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-[#E4E3E0] flex flex-col"
      >
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 py-12">
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="font-mono text-sm font-bold uppercase tracking-widest text-[#141414]/60">
                  测试结果
                </span>
                <h2 className="text-7xl font-black text-[#141414] uppercase leading-none">
                  {character.name}
                </h2>
                <div 
                  className="inline-block px-4 py-1 font-bold text-white uppercase tracking-widest text-sm"
                  style={{ backgroundColor: character.color }}
                >
                  {character.tag}
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-white border-2 border-[#141414] shadow-[8px_8px_0px_0px_rgba(20,20,20,1)]">
                  <h3 className="font-mono text-xs font-bold uppercase mb-2 opacity-40 italic">性格解析</h3>
                  <p className="text-xl font-bold leading-relaxed">
                    {character.personality}
                  </p>
                </div>

                <div className="p-6 bg-[#141414] text-[#E4E3E0]">
                  <h3 className="font-mono text-xs font-bold uppercase mb-2 opacity-40 italic">经典台词</h3>
                  <p className="text-2xl font-black italic serif">
                    "{character.quote}"
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={resetGame}
                  className="px-8 py-4 bg-white border-2 border-[#141414] font-bold uppercase tracking-widest hover:bg-[#141414] hover:text-[#E4E3E0] transition-all flex items-center gap-2"
                >
                  <RefreshCw size={20} />
                  重新测试
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="aspect-[3/4] bg-white border-2 border-[#141414] shadow-[12px_12px_0px_0px_rgba(20,20,20,1)] overflow-hidden relative group">
                {isGeneratingPoster ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#141414]/5">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Sparkles size={48} className="text-[#141414]/20" />
                    </motion.div>
                    <p className="mt-4 font-mono text-xs font-bold uppercase tracking-widest animate-pulse">
                      正在生成专属海报...
                    </p>
                  </div>
                ) : posterUrl ? (
                  <img 
                    src={posterUrl} 
                    alt="Character Poster" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="font-mono text-xs opacity-40">海报生成失败</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  disabled={!posterUrl}
                  className="py-4 bg-[#141414] text-[#E4E3E0] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#141414]/90 disabled:opacity-50"
                  onClick={() => {
                    if (posterUrl) {
                      const link = document.createElement('a');
                      link.href = posterUrl;
                      link.download = `${playerName}_${character.name}_海报.png`;
                      link.click();
                    }
                  }}
                >
                  <Download size={20} />
                  下载海报
                </button>
                <button 
                  className="py-4 bg-white border-2 border-[#141414] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#141414] hover:text-[#E4E3E0] transition-all"
                  onClick={() => {
                    alert('分享功能开发中，敬请期待！');
                  }}
                >
                  <Share2 size={20} />
                  分享好友
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen font-sans text-[#141414] selection:bg-[#141414] selection:text-[#E4E3E0]">
      <AnimatePresence mode="wait">
        {gameState === 'welcome' && renderWelcome()}
        {gameState === 'quiz' && renderQuiz()}
        {gameState === 'calculating' && renderCalculating()}
        {gameState === 'result' && renderResult()}
      </AnimatePresence>
    </div>
  );
}

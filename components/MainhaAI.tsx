
import React, { useState } from 'react';
import { getMainhaRecommendation } from '../services/geminiService';
import { Soup } from '../types';

interface MainhaAIProps {
  availableSoups: Soup[];
}

const MainhaAI: React.FC<MainhaAIProps> = ({ availableSoups }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAskMainha = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setLoading(true);
    const answer = await getMainhaRecommendation(prompt, availableSoups);
    setResponse(answer);
    setLoading(false);
    setPrompt('');
  };

  return (
    <div className={`fixed z-[100] transition-all duration-300 ${isOpen ? 'inset-0 md:inset-auto md:bottom-6 md:right-6' : 'bottom-6 left-6 md:left-auto md:right-6'}`}>
      {isOpen ? (
        <div className="bg-white h-full md:h-auto md:rounded-2xl shadow-2xl w-full md:w-96 overflow-hidden border border-stone-200 animate-in slide-in-from-bottom-5 flex flex-col">
          <div className="bg-[#6b3e26] p-4 flex justify-between items-center text-white flex-shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-2xl">👩🏽‍🍳</span>
              <div>
                <h4 className="font-bold leading-none text-sm md:text-base">Dicas da Mainha</h4>
                <p className="text-[10px] opacity-80 uppercase tracking-widest">IA do Sertão</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white p-2">✕</button>
          </div>
          
          <div className="p-4 flex-grow overflow-y-auto bg-stone-50 min-h-[200px] flex flex-col justify-end no-scrollbar">
            {response ? (
              <div className="bg-white p-3 md:p-4 rounded-2xl rounded-bl-none shadow-sm border border-stone-100 text-stone-800 text-sm mb-4 leading-relaxed">
                {response}
              </div>
            ) : (
              <p className="text-stone-400 text-xs md:text-sm text-center italic mb-4 px-4">
                "Oxente! Me diga como você tá se sentindo que eu te ajudo a escolher a melhor sopa, meu bem!"
              </p>
            )}
            
            {loading && (
              <div className="flex gap-2 mb-4 justify-start">
                <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
            )}
          </div>
          
          <form onSubmit={handleAskMainha} className="p-4 bg-white border-t border-stone-100 flex gap-2 flex-shrink-0 mb-safe">
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ex: 'Tô com preguiça'..."
              className="flex-grow bg-stone-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d2691e]"
            />
            <button 
              disabled={loading}
              className="bg-[#d2691e] text-white w-10 h-10 rounded-xl hover:bg-[#a0522d] disabled:opacity-50 flex items-center justify-center"
            >
              ➔
            </button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-[#6b3e26] text-white p-3 md:p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group"
        >
          <span className="text-xl md:text-2xl">👩🏽‍🍳</span>
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 font-bold text-xs md:text-base">Dicas da Mainha</span>
        </button>
      )}
    </div>
  );
};

export default MainhaAI;

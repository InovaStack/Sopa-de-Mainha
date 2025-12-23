
import React from 'react';
import { Soup } from '../types';

interface SoupCardProps {
  soup: Soup;
  onAddToCart: (soup: Soup) => void;
  onViewDetails: (soup: Soup) => void;
}

const SoupCard: React.FC<SoupCardProps> = ({ soup, onAddToCart, onViewDetails }) => {
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Compartilhar ${soup.name}`);
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden flex flex-row md:flex-col transition-all active:scale-[0.98] md:hover:shadow-xl md:hover:shadow-stone-200/50 md:hover:-translate-y-2 cursor-pointer group"
      onClick={() => onViewDetails(soup)}
    >
      {/* Imagem - Compacta no Mobile */}
      <div className="relative w-24 h-full sm:w-32 sm:h-32 md:w-full md:h-56 flex-shrink-0 order-2 md:order-1 overflow-hidden">
        <img 
          src={soup.image} 
          alt={soup.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-white/95 backdrop-blur px-1.5 py-0.5 rounded-md text-[7px] md:text-[10px] font-black text-orange-700 shadow-sm border border-orange-50">
          {soup.category.toUpperCase()}
        </div>
      </div>

      {/* Informações - Mais densas no Mobile */}
      <div className="p-3 md:p-6 flex-grow flex flex-col justify-between order-1 md:order-2 min-w-0">
        <div>
          <div className="flex justify-between items-start mb-0.5 md:mb-1">
            <h3 className="text-sm md:text-xl font-bold text-[#6b3e26] leading-tight truncate pr-2">
              {soup.name}
            </h3>
            <div className="flex text-yellow-400 text-[8px] md:text-sm flex-shrink-0">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star}>{star <= soup.rating ? '★' : '☆'}</span>
              ))}
            </div>
          </div>
          <p className="text-stone-400 text-[9px] md:text-sm line-clamp-2 leading-tight md:leading-relaxed mb-2 md:mb-6">
            {soup.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-auto gap-2">
          <div className="flex flex-col flex-shrink-0">
            <span className="text-[10px] text-stone-400 uppercase font-bold tracking-tighter hidden md:block">A partir de</span>
            <span className="text-xs md:text-2xl font-black text-green-700">
              R$ {soup.price.toFixed(2).replace('.', ',')}
            </span>
          </div>
          
          <div className="flex gap-1.5 md:gap-2">
            <button 
              onClick={handleShare}
              className="bg-stone-50 text-stone-500 border border-stone-200 w-8 h-8 md:w-11 md:h-11 rounded-lg md:rounded-xl hover:bg-stone-100 transition-all flex items-center justify-center"
              title="Compartilhar"
            >
              <span className="text-xs md:text-lg">🔗</span>
            </button>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(soup);
              }}
              className="bg-[#fdf6e3] text-[#d2691e] border border-[#d2691e] px-3 py-1.5 md:px-6 md:py-3 rounded-lg md:rounded-xl font-bold text-[10px] md:text-sm hover:bg-[#d2691e] hover:text-white transition-all transform active:scale-95 shadow-sm"
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoupCard;


import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 md:py-12 px-4 text-center">
      <h1 className="text-4xl md:text-7xl font-bold text-[#6b3e26] mb-1 md:mb-2 transition-all hover:scale-105 cursor-default">
        Sopa de Mainha
      </h1>
      <div className="flex items-center justify-center gap-2 md:gap-4">
        <div className="h-[1px] bg-[#6b3e26] w-8 md:w-32 opacity-50"></div>
        <p className="text-[10px] md:text-base tracking-[0.1em] md:tracking-[0.2em] text-[#8b4513] font-semibold uppercase">
          O Tempero Arretado do Interior
        </p>
        <div className="h-[1px] bg-[#6b3e26] w-8 md:w-32 opacity-50"></div>
      </div>
    </header>
  );
};

export default Header;

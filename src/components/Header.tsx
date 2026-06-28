import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4 shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center font-bold text-white shadow-md shadow-indigo-600/30 shrink-0">
          SF
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
            SIGNFLOW <span className="text-indigo-400 font-light">AI</span>
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
            ASL-to-Voice Multimodal Interface
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end hidden sm:flex">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">Hindsight Auth</span>
          <span className="text-xs font-mono text-emerald-400 font-medium">HSK_2FFEDD...ACTIVE</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded border border-slate-700 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-medium text-slate-300 tracking-wide">SYSTEM READY</span>
        </div>
      </div>
    </header>
  );
};

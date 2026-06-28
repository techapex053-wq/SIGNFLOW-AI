import React from "react";
import { Volume2 } from "lucide-react";

interface FooterProps {
  traceLog: string;
}

export const Footer: React.FC<FooterProps> = ({ traceLog }) => {
  return (
    <footer className="mt-4 pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0 text-slate-400">
      <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
        <div className="flex items-center gap-2.5 bg-slate-900 px-3.5 py-1.5 rounded-full border border-slate-800 shadow-sm shrink-0">
          <Volume2 className="w-4 h-4 text-emerald-400 animate-bounce" />
          {/* Waveform Simulation */}
          <div className="flex items-end gap-0.5 h-3.5">
            <div className="w-0.5 bg-emerald-500/80 h-1/2"></div>
            <div className="w-0.5 bg-emerald-500/80 h-3/4"></div>
            <div className="w-0.5 bg-emerald-500/80 h-full"></div>
            <div className="w-0.5 bg-emerald-500/80 h-2/3"></div>
            <div className="w-0.5 bg-emerald-500/80 h-1/2"></div>
            <div className="w-0.5 bg-emerald-500/80 h-4/5"></div>
          </div>
          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
            Voice Ready
          </span>
        </div>

        <div className="text-[11px] text-slate-400 font-mono italic leading-snug">
          Trace: <span className="text-slate-300">{traceLog}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
        <span className="text-[9px] font-mono font-bold text-slate-600 tracking-wider">
          CASCADEFLOW PROTOCOL v1.02
        </span>
        <div className="h-3 w-px bg-slate-800"></div>
        <span className="text-[9px] font-mono font-bold text-slate-600 tracking-wider">
          HINDSIGHT MEMORY ENGINE v4.0
        </span>
      </div>
    </footer>
  );
};

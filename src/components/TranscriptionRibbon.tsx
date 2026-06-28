import React from "react";
import { Volume2, History } from "lucide-react";

interface TranscriptionRibbonProps {
  historyContext: string[];
  translatedWord: string;
  onSpeak: () => void;
  isEscalated: boolean;
  detectedToken: string;
}

export const TranscriptionRibbon: React.FC<TranscriptionRibbonProps> = ({
  historyContext,
  translatedWord,
  onSpeak,
  isEscalated,
  detectedToken
}) => {
  const formattedHistory = historyContext.length > 0 ? historyContext.join(" ") : "(Empty start)";

  return (
    <div className="h-24 bg-slate-900 border border-slate-800 rounded-lg p-4 flex items-center justify-between gap-4 shrink-0 shadow-md">
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <div className="flex flex-col border-r border-slate-700 pr-4 min-w-0 max-w-[50%]">
          <span className="text-[10px] uppercase text-slate-500 font-bold flex items-center gap-1 tracking-wider">
            <History className="w-3 h-3 text-slate-500" />
            History
          </span>
          <span className="text-sm text-slate-400 italic truncate mt-0.5" title={formattedHistory}>
            "{formattedHistory}..."
          </span>
        </div>

        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-[10px] uppercase text-indigo-400 font-bold tracking-wider flex items-center gap-1.5">
            Live Translation
            {isEscalated && detectedToken !== translatedWord && (
              <span className="text-[9px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">
                Corrected from '{detectedToken}'
              </span>
            )}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-white tracking-wide truncate">
              {translatedWord}
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onSpeak}
        className="p-3 bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/40 hover:border-indigo-500 rounded-full text-indigo-300 hover:text-white transition-all shadow-md active:scale-95 shrink-0 group"
        title="Re-synthesize Voice Track"
      >
        <Volume2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
};

import React from "react";
import { HackathonResponse } from "../types";
import { Cpu, Brain, Terminal, ShieldCheck, ArrowRight, Zap } from "lucide-react";

interface LogicEngineProps {
  confidence: number;
  detectedWord: string;
  response: HackathonResponse;
  historyContext: string[];
}

export const LogicEngine: React.FC<LogicEngineProps> = ({
  confidence,
  detectedWord,
  response,
  historyContext
}) => {
  const isLocalPass = response.cascadeflow_routing === "LOCAL_PASS";
  const correctedWord = response.hindsight_corrected_word;
  const memoryUsed = response.memory_used;

  // SVG circle math
  const radius = 28;
  const circumference = 2 * Math.PI * radius; // ~175.9
  const offset = circumference - (confidence / 100) * circumference;

  return (
    <section className="col-span-12 lg:col-span-4 flex flex-col gap-4 min-h-0">
      {/* CascadeFlow Status */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 shadow-md shrink-0">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            CascadeFlow Decision
          </h3>
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
              isLocalPass
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : "bg-amber-500/10 text-amber-400 border-amber-500/20"
            }`}
          >
            {isLocalPass ? "LOCAL PASS (≥85%)" : "ESCALATED (<85%)"}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r={radius}
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                className="text-slate-800"
              />
              <circle
                cx="32"
                cy="32"
                r={radius}
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                className={isLocalPass ? "text-emerald-400" : "text-amber-500"}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-mono text-sm font-bold text-white">
              {confidence}%
            </div>
          </div>

          <div className="flex-1 text-[11px] leading-relaxed">
            {isLocalPass ? (
              <>
                <p className="text-slate-300">
                  Confidence <span className="text-emerald-400 font-semibold underline underline-offset-2">exceeds 85% threshold</span>.
                </p>
                <p className="font-mono text-emerald-400/80 mt-1 flex items-center gap-1">
                  <Zap className="w-3 h-3 inline" /> &gt;&gt; Zero-latency edge path engaged.
                </p>
              </>
            ) : (
              <>
                <p className="text-slate-300">
                  Confidence <span className="text-amber-400 font-semibold underline underline-offset-2">below 85% threshold</span>.
                </p>
                <p className="font-mono text-slate-400 mt-1 italic">
                  &gt;&gt; Routing to Cloud Cascade Engine...
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Hindsight Memory Analysis */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex-1 flex flex-col min-h-[160px] shadow-md">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
            <Brain className="w-3.5 h-3.5 text-indigo-400" />
            Hindsight Context Repair
          </h3>
          {memoryUsed && (
            <span className="text-[9px] font-mono bg-indigo-500/10 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-500/20">
              Context Memory Active
            </span>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-3">
          <div className="bg-slate-950 p-3 rounded border border-slate-800">
            <div className="text-[9px] text-slate-500 uppercase mb-1 font-mono flex items-center justify-between">
              <span>Detected Token Evaluation</span>
              <span className="text-[8px] text-slate-600">LEVENSHTEIN / SEMANTIC SCAN</span>
            </div>
            <div className="flex items-center justify-between px-1">
              <span className={`font-mono text-sm ${detectedWord !== correctedWord ? "text-rose-400 line-through" : "text-slate-300 font-semibold"}`}>
                {detectedWord}
              </span>
              <ArrowRight className="w-4 h-4 text-slate-600" />
              <span className="text-emerald-400 font-bold font-mono text-sm underline decoration-emerald-400/40 underline-offset-4">
                {correctedWord}
              </span>
            </div>
          </div>

          <div className="p-1">
            <div className="text-[10px] text-slate-400 font-bold mb-1.5 uppercase tracking-tight flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Correction Logic Trace
            </div>
            <div className="font-mono text-[10px] text-slate-400 bg-black/40 p-2.5 rounded border border-slate-800/80 space-y-1">
              {memoryUsed ? (
                <>
                  <p className="text-indigo-300 truncate">
                    [MEM_SCAN] Context: {historyContext.slice(-2).map(h => `'${h}'`).join(", ")}
                  </p>
                  <p className="text-slate-500">[SEMANTIC_MATCH] Contextual alignment verified</p>
                  <p className="text-emerald-400">[REPAIR] Candidate '{correctedWord}' selected</p>
                </>
              ) : (
                <>
                  <p className="text-slate-500">[MEM_SCAN] No historical conflict detected</p>
                  <p className="text-emerald-400">[DIRECT_PASS] Token '{correctedWord}' accepted</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Raw API Response Output */}
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-3.5 shadow-md shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping"></div>
            <span className="text-[10px] font-mono font-bold text-slate-400 tracking-tighter uppercase flex items-center gap-1">
              <Terminal className="w-3 h-3 text-indigo-400 inline" />
              JSON OUTPUT STREAM
            </span>
          </div>
          <span className="text-[9px] font-mono text-slate-600">STRICT RAW PROTOCOL</span>
        </div>
        <pre className="font-mono text-[11px] text-indigo-300 overflow-x-auto bg-black/60 p-2.5 rounded border border-white/5 leading-snug">
{JSON.stringify(response, null, 2)}
        </pre>
      </div>
    </section>
  );
};

import React, { useState } from "react";
import { AslScenario } from "../types";
import { ChevronRight, ChevronLeft, ChevronDown, Sparkles, RefreshCw, Sliders, FolderOpen, FlaskConical } from "lucide-react";

interface ScenarioDropboxProps {
  scenarios: AslScenario[];
  activeScenario: AslScenario;
  onSelectScenario: (sc: AslScenario) => void;
  isCustomMode: boolean;
  onToggleCustomMode: () => void;
  customWord: string;
  onChangeCustomWord: (val: string) => void;
  customConf: number;
  onChangeCustomConf: (val: number) => void;
  onTriggerCustom: () => void;
}

export const ScenarioDropbox: React.FC<ScenarioDropboxProps> = ({
  scenarios,
  activeScenario,
  onSelectScenario,
  isCustomMode,
  onToggleCustomMode,
  customWord,
  onChangeCustomWord,
  customConf,
  onChangeCustomConf,
  onTriggerCustom,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<"essential" | "demo" | "alphabets" | "all">("essential");

  const demoIds = ["hi_pass", "hello_pass", "this_pass", "is_repair", "team_repair", "apex_pass"];

  const filteredScenarios = scenarios.filter((sc) => {
    if (category === "essential") {
      return !demoIds.includes(sc.id) && !sc.id.startsWith("alphabet_");
    }
    if (category === "demo") {
      return demoIds.includes(sc.id);
    }
    if (category === "alphabets") {
      return sc.id.startsWith("alphabet_");
    }
    return true;
  });

  return (
    <aside
      id="test-scenarios-dropbox"
      className={`shrink-0 bg-slate-950 border border-slate-800/80 rounded-lg shadow-lg flex flex-col transition-all duration-300 overflow-hidden relative ${
        isOpen ? "w-full lg:w-80 max-h-[500px] lg:max-h-none" : "w-full lg:w-12 h-11 lg:h-auto"
      }`}
    >
      {/* COLLAPSED VIEW (Narrow ~5% strip on Desktop, Header strip on Mobile) */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="w-full h-full flex lg:flex-col items-center justify-between lg:justify-start gap-2 p-2.5 hover:bg-slate-900/80 text-slate-400 hover:text-indigo-300 transition-colors cursor-pointer group"
          title="Show Test Scenarios Drop Box"
        >
          <div className="flex lg:flex-col items-center gap-2">
            <div className="p-1.5 rounded bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-colors">
              <FlaskConical className="w-4 h-4 shrink-0" />
            </div>
            <span className="text-xs font-bold tracking-wider uppercase lg:[writing-mode:vertical-lr] lg:rotate-180">
              🧪 Test Scenarios
            </span>
          </div>

          <div className="flex items-center lg:mt-auto text-slate-500 group-hover:text-white transition-colors">
            <span className="text-[10px] font-mono mr-1 lg:hidden">Click to open</span>
            <ChevronRight className="w-4 h-4 hidden lg:block animate-pulse" />
            <ChevronDown className="w-4 h-4 lg:hidden" />
          </div>
        </button>
      )}

      {/* EXPANDED DROP BOX VIEW */}
      {isOpen && (
        <div className="flex flex-col h-full min-h-0 text-slate-300">
          {/* Panel Header */}
          <div className="p-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded bg-indigo-500/20 text-indigo-400">
                <FolderOpen className="w-4 h-4 shrink-0" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-white uppercase tracking-wider">ASL Test Suite</h2>
                <p className="text-[10px] text-slate-400 font-mono">Select sign or trigger custom</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
              title="Hide panel (~5% view)"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Hide</span>
            </button>
          </div>

          {/* Panel Controls & Drop Boxes */}
          <div className="p-3 flex flex-col gap-3 overflow-y-auto flex-1 min-h-0">
            {/* Category Filter Drop Box */}
            <div>
              <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1 font-semibold">
                📁 Category Drop Box
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value as any);
                    if (isCustomMode) onToggleCustomMode();
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white appearance-none focus:outline-none focus:border-indigo-500 cursor-pointer font-medium pr-8"
                >
                  <option value="essential">⭐ Essential Signs (Water, Help, Good...)</option>
                  <option value="demo">👋 Demo & Greetings (Hi, Hello, Team...)</option>
                  <option value="alphabets">🔤 ASL Alphabets (Letters A-Z)</option>
                  <option value="all">🌐 All Scenarios ({scenarios.length} signs)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Custom Mode Toggle Button */}
            <div className="flex items-center justify-between bg-slate-900/60 p-2 rounded border border-slate-800/80">
              <span className="text-[11px] font-medium text-slate-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                Custom Sign Generator
              </span>
              <button
                type="button"
                onClick={onToggleCustomMode}
                className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isCustomMode
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/40 ring-1 ring-indigo-400"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {isCustomMode ? "Active" : "Off"}
              </button>
            </div>

            {/* Custom Mode Inputs OR Scenario Drop Box */}
            {isCustomMode ? (
              <div className="flex flex-col gap-3 bg-indigo-950/30 border border-indigo-500/30 rounded-lg p-3 animate-fade-in">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-indigo-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Simulate Custom Sign</span>
                </div>

                <div>
                  <label className="text-[9px] text-slate-400 uppercase font-mono block mb-1">Raw Sign Token</label>
                  <input
                    type="text"
                    value={customWord}
                    onChange={(e) => onChangeCustomWord(e.target.value)}
                    placeholder="e.g. waffle or hello"
                    className="w-full bg-black border border-slate-700 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[9px] font-mono mb-1">
                    <span className="text-slate-400">Confidence Score</span>
                    <span className={customConf >= 85 ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                      {customConf}% ({customConf >= 85 ? "Edge" : "Cloud"})
                    </span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={99}
                    value={customConf}
                    onChange={(e) => onChangeCustomConf(Number(e.target.value))}
                    className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded cursor-pointer"
                  />
                </div>

                <button
                  type="button"
                  onClick={onTriggerCustom}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-1.5 rounded text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/30 cursor-pointer mt-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Process Custom Sign
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-mono text-slate-400 block font-semibold">
                  🎯 Sign Drop Box
                </label>
                <div className="relative">
                  <select
                    value={activeScenario.id}
                    onChange={(e) => {
                      const found = scenarios.find((s) => s.id === e.target.value);
                      if (found) onSelectScenario(found);
                    }}
                    className="w-full bg-slate-900 border border-indigo-500/60 rounded px-3 py-2 text-xs font-semibold text-indigo-300 appearance-none focus:outline-none focus:border-indigo-400 cursor-pointer pr-8 shadow-inner"
                  >
                    {filteredScenarios.map((sc) => (
                      <option key={sc.id} value={sc.id} className="bg-slate-950 text-white">
                        {sc.signName} ({sc.confidence}%)
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none" />
                </div>

                <div className="mt-2 text-[10px] uppercase font-mono text-slate-500 flex items-center justify-between">
                  <span>Quick Click Grid</span>
                  <span>{filteredScenarios.length} items</span>
                </div>

                {/* Quick Click Button Grid */}
                <div className="grid grid-cols-2 gap-1.5 mt-0.5">
                  {filteredScenarios.map((sc) => {
                    const isActive = activeScenario.id === sc.id;
                    const isLocal = sc.confidence >= 85;
                    return (
                      <button
                        key={sc.id}
                        type="button"
                        onClick={() => onSelectScenario(sc)}
                        className={`p-2 rounded border text-left flex flex-col transition-all cursor-pointer relative overflow-hidden group/btn ${
                          isActive
                            ? "bg-indigo-950/80 border-indigo-500/80 ring-1 ring-indigo-500 shadow-md"
                            : "bg-slate-900/50 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 w-full">
                          <span className="text-xs font-semibold text-white truncate group-hover/btn:text-indigo-200 transition-colors">
                            {sc.targetCorrectedWord}
                          </span>
                          <span
                            className={`text-[9px] font-mono font-bold px-1 py-0.2 rounded shrink-0 ${
                              isLocal ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                            }`}
                          >
                            {sc.confidence}%
                          </span>
                        </div>
                        <span className="text-[9px] text-slate-400 truncate mt-0.5">
                          "{sc.detectedRawWord}"
                        </span>
                        {isActive && (
                          <div className="absolute bottom-0 left-0 h-0.5 bg-indigo-400 w-full animate-pulse" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
};

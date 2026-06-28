/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from "react";
import { HACKATHON_SCENARIOS } from "./data/mockSigns";
import { AslScenario, HackathonResponse } from "./types";
import { speakWord } from "./utils/speech";
import { Header } from "./components/Header";
import { VisionStream } from "./components/VisionStream";
import { TranscriptionRibbon } from "./components/TranscriptionRibbon";
import { LogicEngine } from "./components/LogicEngine";
import { Footer } from "./components/Footer";

export default function App() {
  const [activeScenario, setActiveScenario] = useState<AslScenario>(HACKATHON_SCENARIOS[0]);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [customWord, setCustomWord] = useState<string>("waffle");
  const [customConf, setCustomConf] = useState<number>(72);

  // Compute active values based on mode
  const currentConfidence = isCustomMode ? customConf : activeScenario.confidence;
  const currentDetectedWord = isCustomMode ? customWord.trim() || "sign" : activeScenario.detectedRawWord;
  const currentHistory = isCustomMode 
    ? ["I want to drink", "a fresh cup of"] 
    : activeScenario.historyContext;

  // Compute Hackathon Response protocol
  const response: HackathonResponse = useMemo(() => {
    const isLocalPass = currentConfidence >= 85;
    
    if (isLocalPass) {
      return {
        cascadeflow_routing: "LOCAL_PASS",
        hindsight_corrected_word: currentDetectedWord,
        memory_used: false,
        hackathon_trace_log: `Local confidence (${currentConfidence}% ≥ 85%) triggered immediate LOCAL_PASS routing. Bypassed cloud routing latency for instant voice synthesis.`
      };
    } else {
      // Escalated to Cloud + Hindsight
      let corrected = currentDetectedWord;
      
      if (!isCustomMode) {
        corrected = activeScenario.targetCorrectedWord;
      } else {
        // Hindsight repair heuristics for custom demo
        const lower = currentDetectedWord.toLowerCase();
        if (lower === "waffle") corrected = "water";
        else if (lower === "bat") corrected = "bathroom";
        else if (lower === "cough") corrected = "coffee";
        else if (lower === "hlp" || lower === "hep") corrected = "help";
      }

      const memoryUsed = corrected !== currentDetectedWord;

      return {
        cascadeflow_routing: "CLOUD_CASCADE_ESCALATION",
        hindsight_corrected_word: corrected,
        memory_used: memoryUsed,
        hackathon_trace_log: !isCustomMode
          ? activeScenario.explanation
          : `Local confidence (${currentConfidence}% < 85%) triggered cloud escalation. Hindsight contextual memory repaired '${currentDetectedWord}' ➔ '${corrected}' based on conversation context.`
      };
    }
  }, [currentConfidence, currentDetectedWord, isCustomMode, activeScenario]);

  // Automatically trigger voice track when response word changes
  useEffect(() => {
    if (response.hindsight_corrected_word) {
      speakWord(response.hindsight_corrected_word);
    }
  }, [response.hindsight_corrected_word]);

  const handleManualSpeak = () => {
    speakWord(response.hindsight_corrected_word);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#0B0E14] text-slate-300 font-sans overflow-hidden p-3 sm:p-4 selection:bg-indigo-500 selection:text-white">
      {/* Header Section */}
      <Header />

      {/* Main Control Center */}
      <main className="flex-1 grid grid-cols-12 gap-4 min-h-0 overflow-y-auto lg:overflow-hidden pb-2 lg:pb-0">
        {/* Left: Vision Stream & Transcription Ribbon */}
        <section className="col-span-12 lg:col-span-7 flex flex-col gap-4 min-h-0">
          <VisionStream
            activeScenario={activeScenario}
            onSelectScenario={(sc) => {
              setIsCustomMode(false);
              setActiveScenario(sc);
            }}
            scenarios={HACKATHON_SCENARIOS}
            isCustomMode={isCustomMode}
            onToggleCustomMode={() => setIsCustomMode(!isCustomMode)}
            customWord={customWord}
            onChangeCustomWord={setCustomWord}
            customConf={customConf}
            onChangeCustomConf={setCustomConf}
            onTriggerCustom={handleManualSpeak}
          />

          <TranscriptionRibbon
            historyContext={currentHistory}
            translatedWord={response.hindsight_corrected_word}
            onSpeak={handleManualSpeak}
            isEscalated={response.cascadeflow_routing === "CLOUD_CASCADE_ESCALATION"}
            detectedToken={currentDetectedWord}
          />
        </section>

        {/* Right: Logic Engine */}
        <LogicEngine
          confidence={currentConfidence}
          detectedWord={currentDetectedWord}
          response={response}
          historyContext={currentHistory}
        />
      </main>

      {/* Bottom Bar: Audio & Trace */}
      <Footer traceLog={response.hackathon_trace_log} />
    </div>
  );
}

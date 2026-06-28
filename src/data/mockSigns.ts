import { AslScenario } from "../types";

export const HACKATHON_SCENARIOS: AslScenario[] = [
  {
    id: "water_repair",
    signName: "🫗 Water (ASL 'W' to chin)",
    detectedRawWord: "waffle",
    targetCorrectedWord: "water",
    confidence: 72,
    historyContext: ["I want to drink", "a fresh cup of"],
    explanation: "Low confidence (72% < 85%) triggered cloud escalation. Hindsight corrected 'waffle' to 'water' based on conversation context 'drink' & 'cup'."
  },
  {
    id: "hello_pass",
    signName: "👋 Hello (ASL salute)",
    detectedRawWord: "hello",
    targetCorrectedWord: "hello",
    confidence: 94,
    historyContext: ["Good morning,"],
    explanation: "High confidence (94% ≥ 85%) triggered LOCAL_PASS. Bypassed cloud routing latency for instant voice synthesis."
  },
  {
    id: "bathroom_repair",
    signName: "🚻 Bathroom (ASL 'T' shake)",
    detectedRawWord: "bat",
    targetCorrectedWord: "bathroom",
    confidence: 68,
    historyContext: ["Excuse me,", "where is the nearest"],
    explanation: "Low confidence (68% < 85%) triggered cloud escalation. Hindsight repaired truncated sign 'bat' to 'bathroom' using spatial query context."
  },
  {
    id: "help_pass",
    signName: "🚑 Help (ASL fist on palm)",
    detectedRawWord: "help",
    targetCorrectedWord: "help",
    confidence: 89,
    historyContext: ["Emergency!", "Please send"],
    explanation: "Confidence (89% ≥ 85%) triggered immediate LOCAL_PASS routing. Zero latency critical path activated."
  },
  {
    id: "coffee_repair",
    signName: "☕ Coffee (ASL grinding fists)",
    detectedRawWord: "cough",
    targetCorrectedWord: "coffee",
    confidence: 77,
    historyContext: ["Let's meet at the cafe", "for some hot"],
    explanation: "Escalated due to 77% confidence. Hindsight semantic memory matched 'cafe' & 'hot' to repair phonetic glitch 'cough' ➔ 'coffee'."
  }
];

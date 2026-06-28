export type RoutingDecision = "LOCAL_PASS" | "CLOUD_CASCADE_ESCALATION";

export interface HackathonResponse {
  cascadeflow_routing: RoutingDecision;
  hindsight_corrected_word: string;
  memory_used: boolean;
  hackathon_trace_log: string;
}

export interface AslScenario {
  id: string;
  signName: string;
  detectedRawWord: string;
  targetCorrectedWord: string;
  confidence: number; // e.g. 72 or 94
  historyContext: string[];
  explanation: string;
}

export interface TraceStep {
  tag: string;
  colorClass: string;
  message: string;
}

export interface StreamStats {
  fps: number;
  jitter: number;
  handDetected: boolean;
  activeConfidence: number;
}

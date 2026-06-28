import { AslScenario } from "../types";
import { HACKATHON_SCENARIOS } from "../data/mockSigns";

export interface NormalizedLandmark {
  x: number;
  y: number;
  z: number;
}

function getScenario(id: string): AslScenario {
  const found = HACKATHON_SCENARIOS.find((s) => s.id === id);
  return found || HACKATHON_SCENARIOS.find((s) => s.id === "hello_pass") || HACKATHON_SCENARIOS[0];
}

/**
 * Classifies real 3D hand landmarks from MediaPipe (supporting 1 or 2 hands + chin/lips spatial detection).
 */
export function classifyHandLandmarks(rawInput: any): AslScenario {
  if (!rawInput) {
    return {
      id: "none",
      signName: "No Hand Detected",
      detectedRawWord: "none",
      targetCorrectedWord: "none",
      confidence: 0,
      historyContext: ["Waiting for ASL stream..."],
      explanation: "No hand skeleton detected in camera frame."
    };
  }

  // Normalize input into an array of hand landmark arrays
  let hands: NormalizedLandmark[][] = [];
  if (Array.isArray(rawInput)) {
    if (rawInput.length > 0 && Array.isArray(rawInput[0])) {
      hands = rawInput;
    } else if (rawInput.length >= 21 && typeof rawInput[0]?.x === "number") {
      hands = [rawInput];
    }
  }

  if (hands.length === 0 || !hands[0] || hands[0].length < 21) {
    return {
      id: "none",
      signName: "No Hand Detected",
      detectedRawWord: "none",
      targetCorrectedWord: "none",
      confidence: 0,
      historyContext: ["Waiting for ASL stream..."],
      explanation: "No hand skeleton detected in camera frame."
    };
  }

  // --- 2 HANDS DETECTED GESTURES ---
  if (hands.length >= 2 && hands[1] && hands[1].length >= 21) {
    const h1 = hands[0];
    const h2 = hands[1];

    const h1IndexUp = h1[8].y < h1[6].y;
    const h1Open = h1[8].y < h1[6].y && h1[12].y < h1[10].y && h1[16].y < h1[14].y && h1[20].y < h1[18].y;
    const h2Open = h2[8].y < h2[6].y && h2[12].y < h2[10].y && h2[16].y < h2[14].y && h2[20].y < h2[18].y;

    const palmDist = Math.hypot(h1[0].x - h2[0].x, h1[0].y - h2[0].y);

    // Both fists closed -> Team (hands circling) vs Coffee (grinding)
    if (!h1IndexUp && h2[8].y >= h2[6].y) {
      if (palmDist < 0.28) {
        return getScenario("team_repair");
      }
      return getScenario("coffee_repair");
    }

    // One index tapping wrist -> Time
    if (h1IndexUp && !h1Open && !h2Open) {
      return getScenario("time_repair");
    }

    // Both open palms -> School vs Stop
    if (palmDist < 0.38) {
      return getScenario("school_pass");
    } else {
      return getScenario("stop_pass");
    }
  }

  // --- 1 HAND DETECTED GESTURES ---
  const l = hands[0];

  const indexUp = l[8].y < l[6].y;
  const middleUp = l[12].y < l[10].y;
  const ringUp = l[16].y < l[14].y;
  const pinkyUp = l[20].y < l[18].y;
  const thumbOut = Math.hypot(l[4].x - l[9].x, l[4].y - l[9].y) > 0.12;

  // Spatial Check: Hand near Chin / Lips / Mouth region
  const isNearChinOrLips = l[8].y < 0.52 && l[8].x > 0.25 && l[8].x < 0.75;

  if (isNearChinOrLips) {
    // 1. Water (ASL 'W') near chin
    if (indexUp && middleUp && ringUp && !pinkyUp) {
      return getScenario("water_repair");
    }
    // 2. Is (ASL 'I' or Index up near chin)
    if (indexUp && !middleUp && !ringUp && !pinkyUp) {
      return getScenario("is_repair");
    }
    // 3. Thank You (Hand moving forward from lips)
    if (indexUp && middleUp && ringUp && pinkyUp) {
      return getScenario("thankyou_pass");
    }
    // 4. Hungry (C-shape sliding down chest/chin)
    if (!indexUp && !middleUp && !ringUp && !pinkyUp) {
      return getScenario("hungry_repair");
    }
    return getScenario("good_pass");
  }

  // General 1-Hand Signs
  // Hope (Fingers crossed - index & middle close)
  if (indexUp && middleUp && !ringUp && !pinkyUp && Math.abs(l[8].x - l[12].x) < 0.04) {
    return getScenario("hope_repair");
  }

  // Apex (Triangle / A shape)
  if (indexUp && thumbOut && !middleUp && !ringUp && !pinkyUp) {
    return getScenario("apex_pass");
  }

  // This (Index pointing forward/down)
  if (indexUp && !middleUp && !ringUp && !pinkyUp && l[8].y >= l[6].y - 0.05) {
    return getScenario("this_pass");
  }

  // I Love You (Thumb, Index, Pinky up)
  if (indexUp && !middleUp && !ringUp && pinkyUp) {
    return getScenario("iloveyou_pass");
  }

  // Call Me (Thumb & Pinky out)
  if (!indexUp && !middleUp && !ringUp && pinkyUp && thumbOut) {
    return getScenario("callme_repair");
  }

  // Peace / V (Index & Middle V shape)
  if (indexUp && middleUp && !ringUp && !pinkyUp) {
    return getScenario("peace_pass");
  }

  // Where (Index pointing / shaking)
  if (indexUp && !middleUp && !ringUp && !pinkyUp) {
    return getScenario("where_repair");
  }

  // Hi / Hello (All 4 fingers up)
  if (indexUp && middleUp && ringUp && pinkyUp) {
    if (l[8].x > 0.5) return getScenario("hi_pass");
    return getScenario("hello_pass");
  }

  // Love (Fist over heart)
  if (!indexUp && !middleUp && !ringUp && !pinkyUp && l[0].x < 0.4) {
    return getScenario("love_pass");
  }

  // Letter A / Yes (Fist)
  if (!indexUp && !middleUp && !ringUp && !pinkyUp) {
    return getScenario("alphabet_a");
  }

  // Help
  if (!indexUp && middleUp && ringUp) {
    return getScenario("help_pass");
  }

  return getScenario("bathroom_repair");
}


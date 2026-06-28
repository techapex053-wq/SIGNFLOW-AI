import { AslScenario } from "../types";

export const HACKATHON_SCENARIOS: AslScenario[] = [
  // --- TEAM APEX INTRO SERIES ---
  {
    id: "hi_pass",
    signName: "👋 Hi (Casual wave)",
    detectedRawWord: "hi",
    targetCorrectedWord: "hi",
    confidence: 96,
    historyContext: [],
    explanation: "High confidence (96% ≥ 85%) triggered LOCAL_PASS. Instant vocalization of greeting completed."
  },
  {
    id: "this_pass",
    signName: "👉 This (Index finger pointing down/forward)",
    detectedRawWord: "this",
    targetCorrectedWord: "this",
    confidence: 91,
    historyContext: ["hi"],
    explanation: "Confidence score passed the threshold. Immediate edge routing for index finger pointing gesture."
  },
  {
    id: "is_repair",
    signName: "☝️ Is (ASL 'I' moving forward from chin)",
    detectedRawWord: "ice",
    targetCorrectedWord: "is",
    confidence: 74,
    historyContext: ["hi", "this"],
    explanation: "Low confidence (74% < 85%) forced cloud escalation. Hindsight corrected phonetic tracking 'ice' to 'is' based on grammatical flow."
  },
  {
    id: "team_repair",
    signName: "🤝 Team (ASL 'T' hands circling together)",
    detectedRawWord: "time",
    targetCorrectedWord: "team",
    confidence: 79,
    historyContext: ["hi", "this", "is"],
    explanation: "Escalated to cloud at 79% confidence. Hindsight mapped the introductory sequence to fix 'time' into 'team'."
  },
  {
    id: "apex_pass",
    signName: "🔺 Apex (ASL finger-spelled A-P-E-X sequence)",
    detectedRawWord: "apex",
    targetCorrectedWord: "apex",
    confidence: 88,
    historyContext: ["hi", "this", "is", "team"],
    explanation: "Clear alphanumeric finger transitions scored 88%. Cleared threshold for direct local execution."
  },

  // --- CORE CONVERSATIONAL SIGNS ---
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
    id: "water_repair",
    signName: "🫗 Water (ASL 'W' to chin)",
    detectedRawWord: "waffle",
    targetCorrectedWord: "water",
    confidence: 72,
    historyContext: ["I want to drink", "a fresh cup of"],
    explanation: "Low confidence (72% < 85%) triggered cloud escalation. Hindsight corrected 'waffle' to 'water' based on conversation context 'drink' & 'cup'."
  },
  {
    id: "coffee_repair",
    signName: "☕ Coffee (ASL grinding fists)",
    detectedRawWord: "cough",
    targetCorrectedWord: "coffee",
    confidence: 77,
    historyContext: ["Let's meet at the cafe", "for some hot"],
    explanation: "Escalated due to 77% confidence. Hindsight semantic memory matched 'cafe' & 'hot' to repair phonetic glitch 'cough' ➔ 'coffee'."
  },
  {
    id: "good_pass",
    signName: "👍 Good (Hand moves from chin to palm)",
    detectedRawWord: "good",
    targetCorrectedWord: "good",
    confidence: 95,
    historyContext: ["How are you doing today?", "I feel"],
    explanation: "High confidence (95% ≥ 85%) triggered LOCAL_PASS. Decided instantly at the edge without cloud routing overhead."
  },
  {
    id: "thankyou_pass",
    signName: "🙏 Thank You (Hand from lips forward)",
    detectedRawWord: "thank you",
    targetCorrectedWord: "thank you",
    confidence: 92,
    historyContext: ["Here is your coffee.", "Oh,"],
    explanation: "Confidence level of 92% securely cleared the 85% threshold. Direct edge streaming to voice engine."
  },
  {
    id: "where_repair",
    signName: "❓ Where (Index finger shake side to side)",
    detectedRawWord: "wear",
    targetCorrectedWord: "where",
    confidence: 74,
    historyContext: ["I lost my phone.", "Do you know"],
    explanation: "Low confidence (74% < 85%) forced cloud escalation. Hindsight corrected homophone 'wear' to interrogative 'where' based on location tracking context."
  },
  {
    id: "time_repair",
    signName: "⏰ Time (Index finger taps opposite wrist)",
    detectedRawWord: "tame",
    targetCorrectedWord: "time",
    confidence: 70,
    historyContext: ["The train leaves soon.", "What is the"],
    explanation: "Confidence score (70%) initiated escalation. Hindsight resolved phonetic slip 'tame' into 'time' using schedule context ('train' and 'leaves')."
  },
  {
    id: "callme_repair",
    signName: "🤙 Call Me (Thumb and pinky extended to ear)",
    detectedRawWord: "tell me",
    targetCorrectedWord: "call me",
    confidence: 79,
    historyContext: ["I have to run now.", "When you arrive,"],
    explanation: "Escalated due to 79% local certainty. Hindsight contextual engine matched the structural departure phrase to override 'tell me' with 'call me'."
  },
  {
    id: "stop_pass",
    signName: "🛑 Stop (Flat palm hits opposite open palm)",
    detectedRawWord: "stop",
    targetCorrectedWord: "stop",
    confidence: 96,
    historyContext: ["Don't cross the street yet!", "Please"],
    explanation: "Critical safety signal passed instantly at 96% confidence via LOCAL_PASS to avoid latency risks during an immediate command."
  },
  {
    id: "iloveyou_pass",
    signName: "🤟 I Love You (Thumb, index, pinky up)",
    detectedRawWord: "ily",
    targetCorrectedWord: "I love you",
    confidence: 97,
    historyContext: ["Goodbye, see you tomorrow.", "Remember,"],
    explanation: "High clarity finger orientation (97%) matched localized gesture heuristics. Immediate pass to native speech generation."
  },
  {
    id: "school_pass",
    signName: "🏫 School (Clap hands together twice perpendicularly)",
    detectedRawWord: "school",
    targetCorrectedWord: "school",
    confidence: 91,
    historyContext: ["Where are the kids going?", "They are at"],
    explanation: "Confidence levels hit 91%, bypassing cloud validation parameters. Sent output straight to local conversational transcript."
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
    id: "bathroom_repair",
    signName: "🚻 Bathroom (ASL 'T' shake)",
    detectedRawWord: "bat",
    targetCorrectedWord: "bathroom",
    confidence: 68,
    historyContext: ["Excuse me,", "where is the nearest"],
    explanation: "Low confidence (68% < 85%) triggered cloud escalation. Hindsight repaired truncated sign 'bat' to 'bathroom' using spatial query context."
  },
  {
    id: "hungry_repair",
    signName: "🍕 Hungry (Hand forms a 'C' sliding down chest)",
    detectedRawWord: "anger",
    targetCorrectedWord: "hungry",
    confidence: 65,
    historyContext: ["I haven't eaten all day.", "I am so"],
    explanation: "Low confidence (65%) triggered cloud routing. Hindsight mapped the context of fasting ('haven't eaten') to repair the motion artifact 'anger' into 'hungry'."
  },

  // --- ALL 26 ASL ALPHABETS ---
  {
    id: "alphabet_a",
    signName: "🅰️ Letter A (Fist, thumb at side)",
    detectedRawWord: "a",
    targetCorrectedWord: "a",
    confidence: 91,
    historyContext: [],
    explanation: "High clarity static fist posture matched letter A. Passed locally."
  },
  {
    id: "alphabet_b",
    signName: "🅱️ Letter B (Flat palm, thumb folded across)",
    detectedRawWord: "b",
    targetCorrectedWord: "b",
    confidence: 89,
    historyContext: [],
    explanation: "Vertical finger tracking met the threshold for character B."
  },
  {
    id: "alphabet_c",
    signName: "🅲 Letter C (Curved hand forming arc)",
    detectedRawWord: "see",
    targetCorrectedWord: "c",
    confidence: 73,
    historyContext: [],
    explanation: "Low confidence. Escalated and corrected phonetically from 'see' to letter 'c'."
  },
  {
    id: "alphabet_d",
    signName: "🅳 Letter D (Index up, others touching thumb)",
    detectedRawWord: "d",
    targetCorrectedWord: "d",
    confidence: 94,
    historyContext: [],
    explanation: "Excellent index orientation recognition. Immediate pass."
  },
  {
    id: "alphabet_e",
    signName: "🅴 Letter E (All fingers curled tight to thumb)",
    detectedRawWord: "eat",
    targetCorrectedWord: "e",
    confidence: 69,
    historyContext: [],
    explanation: "Low certainty hand structure. Cloud engine mapped frame bounds to extract letter 'e'."
  },
  {
    id: "alphabet_f",
    signName: "🅵 Letter F (Index/thumb touch, 3 fingers up)",
    detectedRawWord: "f",
    targetCorrectedWord: "f",
    confidence: 87,
    historyContext: [],
    explanation: "Ring/Pinky/Middle depth coordinates verified letter F."
  },
  {
    id: "alphabet_g",
    signName: "🅶 Letter G (Thumb/Index pointing sideways parallel)",
    detectedRawWord: "g",
    targetCorrectedWord: "g",
    confidence: 86,
    historyContext: [],
    explanation: "Horizontal bounding vector successfully matched character G."
  },
  {
    id: "alphabet_h",
    signName: "🅷 Letter H (Index/Middle pointing sideways parallel)",
    detectedRawWord: "h",
    targetCorrectedWord: "h",
    confidence: 90,
    historyContext: [],
    explanation: "Dual extended horizontal fingers detected. Local pass execution."
  },
  {
    id: "alphabet_i",
    signName: "🅸 Letter I (Pinky finger up alone)",
    detectedRawWord: "i",
    targetCorrectedWord: "i",
    confidence: 95,
    historyContext: [],
    explanation: "Isolated pinky tracking achieved optimal confidence score."
  },
  {
    id: "alphabet_j",
    signName: "🅹 Letter J (Pinky traces 'J' curve in air)",
    detectedRawWord: "jay",
    targetCorrectedWord: "j",
    confidence: 72,
    historyContext: [],
    explanation: "Dynamic path tracing required cloud calculation to isolate letter 'j'."
  },
  {
    id: "alphabet_k",
    signName: "🅺 Letter K (Index/Middle up, thumb touches middle)",
    detectedRawWord: "k",
    targetCorrectedWord: "k",
    confidence: 88,
    historyContext: [],
    explanation: "Passed edge confidence requirements for specific thumb positioning."
  },
  {
    id: "alphabet_l",
    signName: "🅻 Letter L (Index up, thumb out forming 'L')",
    detectedRawWord: "l",
    targetCorrectedWord: "l",
    confidence: 97,
    historyContext: [],
    explanation: "90-degree orthogonal angle extraction verified perfect letter L."
  },
  {
    id: "alphabet_m",
    signName: "🅼 Letter M (Thumb tucked under 3 fingers)",
    detectedRawWord: "am",
    targetCorrectedWord: "m",
    confidence: 66,
    historyContext: [],
    explanation: "Cluttered landmark signatures forced cloud escalation to resolve token 'm'."
  },
  {
    id: "alphabet_n",
    signName: "🅽 Letter N (Thumb tucked under 2 fingers)",
    detectedRawWord: "an",
    targetCorrectedWord: "n",
    confidence: 68,
    historyContext: [],
    explanation: "Escalated to differentiate knuckle configuration from adjacent letters."
  },
  {
    id: "alphabet_o",
    signName: "🅾️ Letter O (All fingers forming circle)",
    detectedRawWord: "oh",
    targetCorrectedWord: "o",
    confidence: 78,
    historyContext: [],
    explanation: "Cloud validation converted phonetic conversational filler 'oh' into letter 'o'."
  },
  {
    id: "alphabet_p",
    signName: "🅿️ Letter P (ASL 'K' pointed downwards)",
    detectedRawWord: "p",
    targetCorrectedWord: "p",
    confidence: 85,
    historyContext: [],
    explanation: "Downward pitch angle tracking cleanly qualified for local routing."
  },
  {
    id: "alphabet_q",
    signName: "🆫 Letter Q (ASL 'G' pointed downwards)",
    detectedRawWord: "q",
    targetCorrectedWord: "q",
    confidence: 89,
    historyContext: [],
    explanation: "Inverted parallel finger coordinates isolated character Q perfectly."
  },
  {
    id: "alphabet_r",
    signName: "🆁 Letter R (Index and Middle crossed)",
    detectedRawWord: "are",
    targetCorrectedWord: "r",
    confidence: 75,
    historyContext: [],
    explanation: "Finger overlapping structure escalated to clear spelling ambiguity."
  },
  {
    id: "alphabet_s",
    signName: "🆂 Letter S (Fist, thumb wrapped across front)",
    detectedRawWord: "s",
    targetCorrectedWord: "s",
    confidence: 92,
    historyContext: [],
    explanation: "Front-centered thumb occlusion profile passed edge testing parameters."
  },
  {
    id: "alphabet_t",
    signName: "🆃 Letter T (Thumb tucked between index and middle)",
    detectedRawWord: "tea",
    targetCorrectedWord: "t",
    confidence: 71,
    historyContext: [],
    explanation: "Inter-finger joint blocking handled via cloud contextual adjustment."
  },
  {
    id: "alphabet_u",
    signName: "🆄 Letter U (Index and Middle up pressed together)",
    detectedRawWord: "you",
    targetCorrectedWord: "u",
    confidence: 76,
    historyContext: [],
    explanation: "Homophone collision parsed by Hindsight to fix pronoun 'you' into letter 'u'."
  },
  {
    id: "alphabet_v",
    signName: "🆅 Letter V (Index and Middle up separated)",
    detectedRawWord: "v",
    targetCorrectedWord: "v",
    confidence: 93,
    historyContext: [],
    explanation: "V-shaped open distance geometry mapped with near-perfect certainty."
  },
  {
    id: "alphabet_w",
    signName: "🆆 Letter W (Index, Middle, Ring extended out)",
    detectedRawWord: "w",
    targetCorrectedWord: "w",
    confidence: 95,
    historyContext: [],
    explanation: "Triple parallel finger landmarks isolated letter W instantaneously."
  },
  {
    id: "alphabet_x",
    signName: "🆇 Letter X (Index finger hooked/curved up)",
    detectedRawWord: "x",
    targetCorrectedWord: "x",
    confidence: 86,
    historyContext: [],
    explanation: "Single crook knuckle curvature met threshold requirements."
  },
  {
    id: "alphabet_y",
    signName: "🆈 Letter Y (Thumb and Pinky extended out)",
    detectedRawWord: "why",
    targetCorrectedWord: "y",
    confidence: 74,
    historyContext: [],
    explanation: "Escalated token mismatch; mapped back to alpha character 'y'."
  },
  {
    id: "alphabet_z",
    signName: "🆪 Letter Z (Index finger draws 'Z' in air)",
    detectedRawWord: "zee",
    targetCorrectedWord: "z",
    confidence: 70,
    historyContext: [],
    explanation: "Spatial track history processed by cloud to match structural 'Z' motion paths."
  },

  // --- TRANSITIONAL & BASIC ENGLISH TERMS ---
  {
    id: "hope_repair",
    signName: "🤞 Hope (Fingers crossed / forehead bend)",
    detectedRawWord: "hype",
    targetCorrectedWord: "hope",
    confidence: 76,
    historyContext: ["I", "really"],
    explanation: "Confidence dropped to 76%. Cloud engine evaluated emotional state trajectory to repair 'hype' into 'hope'."
  },
  {
    id: "love_pass",
    signName: "❤️ Love (Fist over heart)",
    detectedRawWord: "love",
    targetCorrectedWord: "love",
    confidence: 96,
    historyContext: ["I send my deepest"],
    explanation: "High confidence (96% ≥ 85%) triggered LOCAL_PASS."
  },
  {
    id: "peace_pass",
    signName: "✌️ Peace (Index & Middle fingers up)",
    detectedRawWord: "peace",
    targetCorrectedWord: "peace",
    confidence: 90,
    historyContext: ["Wishing everyone global"],
    explanation: "Direct edge classification cleared 85% threshold."
  },
  {
    id: "yes_pass",
    signName: "🙆 Yes (Fist nodding up and down)",
    detectedRawWord: "yes",
    targetCorrectedWord: "yes",
    confidence: 94,
    historyContext: ["Are you ready?", "Oh"],
    explanation: "High certainty edge detection."
  },
  {
    id: "no_repair",
    signName: "🙅 No (Index, Middle & Thumb snapping shut)",
    detectedRawWord: "now",
    targetCorrectedWord: "no",
    confidence: 78,
    historyContext: ["Do you want more?", "Oh"],
    explanation: "Escalated due to 78% confidence. Hindsight fixed 'now' to 'no'."
  },
  {
    id: "please_pass",
    signName: "🤲 Please (Flat palm rubbing chest in circle)",
    detectedRawWord: "please",
    targetCorrectedWord: "please",
    confidence: 92,
    historyContext: ["Could you"],
    explanation: "Edge confidence 92% cleared threshold."
  },
  {
    id: "sorry_repair",
    signName: "🙇 Sorry (Fist rubbing chest in circle)",
    detectedRawWord: "sore",
    targetCorrectedWord: "sorry",
    confidence: 77,
    historyContext: ["I arrived late.", "I am so"],
    explanation: "Escalated due to 77% confidence. Hindsight fixed phonetic error 'sore' to 'sorry'."
  }
];

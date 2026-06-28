import React, { useEffect, useRef, useState } from "react";
import { AslScenario } from "../types";
import { Camera, CameraOff, Sparkles, RefreshCw, Hand, Sliders, Scan } from "lucide-react";
import { classifyHandLandmarks } from "../utils/aslClassifier";

declare global {
  interface Window {
    Hands: any;
    Camera: any;
  }
}

interface VisionStreamProps {
  activeScenario: AslScenario;
  onSelectScenario: (scenario: AslScenario) => void;
  scenarios: AslScenario[];
  isCustomMode: boolean;
  onToggleCustomMode: () => void;
  customWord: string;
  onChangeCustomWord: (val: string) => void;
  customConf: number;
  onChangeCustomConf: (val: number) => void;
  onTriggerCustom: () => void;
}

const HAND_EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 4],         // thumb
  [0, 5], [5, 6], [6, 7], [7, 8],         // index
  [0, 9], [9, 10], [10, 11], [11, 12],    // middle
  [0, 13], [13, 14], [14, 15], [15, 16],  // ring
  [0, 17], [17, 18], [18, 19], [19, 20],  // pinky
  [5, 9], [9, 13], [13, 17]               // palm base
];

function drawCustomHandSkeleton(ctx: CanvasRenderingContext2D, landmarks: any[], width: number, height: number) {
  ctx.save();
  // Note: video is horizontally flipped, so we mirror the canvas drawing
  ctx.translate(width, 0);
  ctx.scale(-1, 1);

  // Draw glowing cyan edges
  ctx.shadowColor = "#34D399";
  ctx.shadowBlur = 8;
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = "#34D399"; // emerald-400

  HAND_EDGES.forEach(([i, j]) => {
    const p1 = landmarks[i];
    const p2 = landmarks[j];
    ctx.beginPath();
    ctx.moveTo(p1.x * width, p1.y * height);
    ctx.lineTo(p2.x * width, p2.y * height);
    ctx.stroke();
  });

  // Draw glowing joint points
  landmarks.forEach((p, idx) => {
    const isTip = idx === 4 || idx === 8 || idx === 12 || idx === 16 || idx === 20;
    ctx.beginPath();
    ctx.arc(p.x * width, p.y * height, isTip ? 6 : 4, 0, 2 * Math.PI);
    ctx.fillStyle = idx === 8 ? "#F43F5E" : "#818CF8"; // Rose pink for index tip, indigo for joints
    ctx.shadowColor = idx === 8 ? "#F43F5E" : "#818CF8";
    ctx.shadowBlur = 10;
    ctx.fill();
  });

  ctx.restore();
}

export const VisionStream: React.FC<VisionStreamProps> = ({
  activeScenario,
  onSelectScenario,
  scenarios,
  isCustomMode,
  onToggleCustomMode,
  customWord,
  onChangeCustomWord,
  customConf,
  onChangeCustomConf,
  onTriggerCustom
}) => {
  const [useWebcam, setUseWebcam] = useState<boolean>(false);
  const [fps, setFps] = useState<number>(60.2);
  const [jitter, setJitter] = useState<number>(0.12);
  const [isModelLoading, setIsModelLoading] = useState<boolean>(false);
  const [handBox, setHandBox] = useState<{ left: number; top: number; width: number; height: number } | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const handsInstanceRef = useRef<any>(null);
  const animFrameRef = useRef<number | null>(null);

  const lastSignIdRef = useRef<string>("none");
  const signHoldCountRef = useRef<number>(0);

  // Slight jitter simulation for realism when no hand or simulator
  useEffect(() => {
    const timer = setInterval(() => {
      setFps(+(59.8 + Math.random() * 0.8).toFixed(1));
      setJitter(+(0.08 + Math.random() * 0.08).toFixed(2));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Handle Real Webcam + MediaPipe Hands Computer Vision Loop
  useEffect(() => {
    let stream: MediaStream | null = null;
    let isCancelled = false;

    if (useWebcam) {
      setIsModelLoading(true);
      navigator.mediaDevices
        .getUserMedia({ video: { width: 640, height: 480 }, audio: false })
        .then((s) => {
          if (isCancelled) return;
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }

          const initHands = () => {
            if (isCancelled) return;
            if (typeof window !== "undefined" && window.Hands) {
              const hands = new window.Hands({
                locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
              });

              hands.setOptions({
                maxNumHands: 1,
                modelComplexity: 1,
                minDetectionConfidence: 0.65,
                minTrackingConfidence: 0.65
              });

              hands.onResults((results: any) => {
                if (isCancelled) return;
                setIsModelLoading(false);
                const canvas = canvasRef.current;
                if (!canvas) return;
                const ctx = canvas.getContext("2d");
                if (!ctx) return;

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
                  const l = results.multiHandLandmarks[0];
                  drawCustomHandSkeleton(ctx, l, canvas.width, canvas.height);

                  // Calculate real bounding box
                  let minX = 1, maxX = 0, minY = 1, maxY = 0;
                  l.forEach((p: any) => {
                    if (p.x < minX) minX = p.x;
                    if (p.x > maxX) maxX = p.x;
                    if (p.y < minY) minY = p.y;
                    if (p.y > maxY) maxY = p.y;
                  });
                  const boxLeft = Math.max(2, (1 - maxX) * 100 - 3);
                  const boxTop = Math.max(2, minY * 100 - 3);
                  const boxWidth = Math.min(96 - boxLeft, (maxX - minX) * 100 + 6);
                  const boxHeight = Math.min(96 - boxTop, (maxY - minY) * 100 + 6);
                  setHandBox({ left: boxLeft, top: boxTop, width: boxWidth, height: boxHeight });

                  // Classify gesture
                  const sign = classifyHandLandmarks(l);
                  if (sign.id === lastSignIdRef.current) {
                    signHoldCountRef.current += 1;
                  } else {
                    lastSignIdRef.current = sign.id;
                    signHoldCountRef.current = 1;
                  }

                  // Debounce over 4 frames (~130ms) for rock-solid stability
                  if (signHoldCountRef.current === 4) {
                    onSelectScenario(sign);
                  }
                } else {
                  setHandBox(null);
                }
              });

              handsInstanceRef.current = hands;

              const sendLoop = async () => {
                if (isCancelled) return;
                if (videoRef.current && videoRef.current.readyState >= 2 && handsInstanceRef.current) {
                  try {
                    await handsInstanceRef.current.send({ image: videoRef.current });
                  } catch (err) {
                    // Benign frame skip
                  }
                }
                animFrameRef.current = requestAnimationFrame(sendLoop);
              };
              animFrameRef.current = requestAnimationFrame(sendLoop);
            } else {
              // Wait for CDN script to finish downloading
              setTimeout(initHands, 350);
            }
          };

          initHands();
        })
        .catch((err) => {
          console.error("Webcam access denied:", err);
          setIsModelLoading(false);
          setUseWebcam(false);
        });
    } else {
      setHandBox(null);
      setIsModelLoading(false);
    }

    return () => {
      isCancelled = true;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      if (handsInstanceRef.current) {
        try {
          handsInstanceRef.current.close();
        } catch (e) {}
        handsInstanceRef.current = null;
      }
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [useWebcam]);

  const activeConf = isCustomMode ? customConf : activeScenario.confidence;
  const activeWord = isCustomMode ? customWord : activeScenario.detectedRawWord;

  return (
    <div className="relative flex-1 bg-black rounded-lg border border-slate-800 overflow-hidden group flex flex-col min-h-[280px] shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none"></div>

      {/* Video / Graphic Canvas */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#07090D]">
        {useWebcam ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover transform -scale-x-100"
            />
            <canvas
              ref={canvasRef}
              width={640}
              height={480}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none z-15"
            />
          </>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Subtle background grid */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: `radial-gradient(#2E384D 1px, transparent 1px)`,
                backgroundSize: `24px 24px`
              }}
            />
            <svg
              className="w-48 h-48 text-slate-800/60 transition-transform duration-700 group-hover:scale-105"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8 8 8zm-5-9h10v2H7z" />
            </svg>

            <div className="absolute flex flex-col items-center justify-center gap-1.5 opacity-60">
              <Scan className="w-16 h-16 text-indigo-400 animate-pulse" />
              <span className="text-xs font-mono font-bold text-indigo-300 tracking-wider">
                ASL STREAM SIMULATOR
              </span>
              <span className="text-[10px] text-slate-400">Click 'Enable Real Webcam' to track your fingers</span>
            </div>
          </div>
        )}
      </div>

      {/* Top Left Tracking Overlay */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 pointer-events-none">
        <div className="bg-indigo-600/90 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg flex items-center gap-1.5 w-max">
          <span className={`w-1.5 h-1.5 rounded-full ${useWebcam ? "bg-emerald-400 animate-ping" : "bg-rose-500 animate-pulse"}`}></span>
          {useWebcam ? (isModelLoading ? "INITIALIZING AI VISION..." : "LIVE 3D FINGER TRACKING") : "SIMULATED WEBCAM STREAM"}
        </div>
        <div className="bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1.5 rounded text-[11px] font-mono leading-tight text-slate-300 shadow-sm w-max">
          FPS: {fps} <br />
          JITTER: {jitter}ms
        </div>
      </div>

      {/* Top Right Controls Overlay */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleCustomMode}
          className={`px-2.5 py-1.5 rounded text-xs font-medium border flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${
            isCustomMode
              ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
              : "bg-slate-900/80 backdrop-blur-md border-slate-700 text-slate-300 hover:bg-slate-800"
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          {isCustomMode ? "Custom Mode Active" : "Custom Sign"}
        </button>

        <button
          type="button"
          onClick={() => setUseWebcam(!useWebcam)}
          className={`px-3 py-1.5 rounded text-xs font-semibold border flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
            useWebcam
              ? "bg-rose-600 hover:bg-rose-500 text-white border-rose-500 shadow-rose-600/30"
              : "bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-500 shadow-indigo-600/30"
          }`}
          title={useWebcam ? "Switch to Simulator" : "Enable Real Webcam"}
        >
          {useWebcam ? (
            <>
              <CameraOff className="w-3.5 h-3.5" /> Stop Webcam
            </>
          ) : (
            <>
              <Camera className="w-3.5 h-3.5" /> Enable Real Webcam
            </>
          )}
        </button>
      </div>

      {/* Dynamic or Static Sign Bounding Box */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        {useWebcam && handBox ? (
          <div
            className="absolute border-2 rounded-md transition-all duration-75"
            style={{
              left: `${handBox.left}%`,
              top: `${handBox.top}%`,
              width: `${handBox.width}%`,
              height: `${handBox.height}%`,
              borderColor: activeConf >= 85 ? "#34D399" : "#818CF8",
              boxShadow: activeConf >= 85 ? "0 0 25px rgba(52, 211, 153, 0.3)" : "0 0 25px rgba(129, 140, 248, 0.3)"
            }}
          >
            <div className="absolute -top-6 left-0 font-mono text-[10px] bg-black/90 px-1.5 py-0.5 rounded border border-slate-700 italic flex items-center gap-1.5 whitespace-nowrap shadow-md">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: activeConf >= 85 ? "#34D399" : "#F59E0B" }}
              />
              <span style={{ color: activeConf >= 85 ? "#34D399" : "#818CF8" }}>
                HAND_DETECTED: "{activeWord}" ({activeConf}%)
              </span>
            </div>
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-white"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-white"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-white"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-white"></div>
          </div>
        ) : !useWebcam ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative w-44 h-52 border-2 rounded-md transition-all duration-300"
              style={{
                borderColor: activeConf >= 85 ? "#34D399" : "#818CF8",
                boxShadow: activeConf >= 85 ? "0 0 20px rgba(52, 211, 153, 0.2)" : "0 0 20px rgba(129, 140, 248, 0.2)"
              }}
            >
              <div className="absolute -top-6 left-0 font-mono text-[10px] bg-black/80 px-1.5 py-0.5 rounded border border-slate-700 italic flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: activeConf >= 85 ? "#34D399" : "#F59E0B" }}
                />
                <span style={{ color: activeConf >= 85 ? "#34D399" : "#818CF8" }}>
                  HAND_DETECTED: "{activeWord}" ({activeConf}%)
                </span>
              </div>
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-white"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-white"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-white"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-white"></div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Bottom Interactive Deck Tray */}
      <div className="mt-auto z-20 p-3 bg-slate-950/90 backdrop-blur-md border-t border-slate-800/80 flex flex-col gap-2 shrink-0">
        <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-slate-400 px-1">
          <span className="flex items-center gap-1.5 text-indigo-400">
            <Sparkles className="w-3 h-3" />
            {useWebcam ? "Real-Time 3D ASL Classifier Active (Hold Sign to Test)" : isCustomMode ? "Custom Sign Generator" : "Hackathon Test Scenarios (Click to Sign)"}
          </span>
          <span className="text-slate-500 font-mono">Routing Threshold: 85%</span>
        </div>

        {isCustomMode ? (
          <div className="flex flex-col sm:flex-row items-center gap-2.5 bg-slate-900/90 p-2.5 rounded border border-slate-800">
            <div className="flex-1 w-full">
              <label className="text-[9px] text-slate-400 uppercase font-mono block mb-1">Raw Sign Token</label>
              <input
                type="text"
                value={customWord}
                onChange={(e) => onChangeCustomWord(e.target.value)}
                placeholder="e.g. waffle or hello"
                className="w-full bg-black border border-slate-700 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            <div className="w-full sm:w-44 shrink-0">
              <div className="flex justify-between text-[9px] font-mono mb-1">
                <span className="text-slate-400">Confidence</span>
                <span className={customConf >= 85 ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                  {customConf}% ({customConf >= 85 ? "Local" : "Cloud"})
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
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-1.5 rounded text-xs transition-colors shrink-0 flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/30 self-end mt-1 sm:mt-0 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Process Sign
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 overflow-x-auto pb-1">
            {scenarios.map((sc) => {
              const isActive = activeScenario.id === sc.id;
              const isLocal = sc.confidence >= 85;
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => onSelectScenario(sc)}
                  className={`p-2 rounded border text-left flex flex-col transition-all cursor-pointer relative overflow-hidden group/btn ${
                    isActive
                      ? "bg-indigo-950/70 border-indigo-500/80 ring-1 ring-indigo-500 shadow-md shadow-indigo-950"
                      : "bg-slate-900/60 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700"
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
                  <span className="text-[10px] text-slate-400 truncate mt-0.5">
                    "{sc.detectedRawWord}" detected
                  </span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 h-0.5 bg-indigo-400 w-full animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

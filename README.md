SIGNFLOW AI — Real-Time ASL to Text/Voice AI Engine

Talkative is an intelligent, high-speed American Sign Language (ASL) translation system built for real-time edge environments. By combining MediaPipe-powered 3D hand tracking, **cascadeflow** local/cloud model routing, and **Hindsight** semantic conversational memory correction, Talkative bridges the communication gap between signers and non-signers with near-zero latency.

Built by **Team Apex** for the Microsoft Hackathon.

---

## 🚀 Key Features

*   **Real-Time 3D Hand Tracking:** Utilizes computer vision to track 21 distinct finger and joint landmarks at ~30 FPS directly within your browser.
*   **Zero-Shot Semantic Correction:** Moving beyond rigid, static dictionaries, the engine dynamically fixes phonetic, visual, or spelling approximations on the fly.
*   **cascadeflow Intelligent Routing:** Automatically optimizes translation performance:
    *   `CONFIDENCE ≥ 85%`: Triggers a **LOCAL_PASS**, executing directly on-device to minimize translation delay.
    *   `CONFIDENCE < 85%`: Triggers a **CLOUD_CASCADE_ESCALATION**, calling the advanced cloud linguistic engine to clean up shaky input gestures.
*   **Hindsight Conversational Memory:** Uses prior sentence blocks to predict contextually correct terms (e.g., repairing the visually similar sign "waffle" into "water" if the speaker has been talking about being thirsty).
*   **Native Multi-Modal Audio Voice synthesis:** Instantly converts completed words into clear spoken audio tracks so non-signers hear what you say as you sign it.

---

## 📂 Project Architecture

```text
├── index.html                  # Main application entry stage
├── src/
│   ├── App.tsx                 # Core UI dashboard shell
│   ├── types.ts                # TypeScript interfaces for scenarios and routing
│   ├── components/
│   │   ├── VisionStream.tsx    # Widescreen cinematic camera viewport & canvas overlays
│   │   ├── LogicEngine.tsx     # Live analytics visualizer for cascadeflow decisions
│   │   └── Header.tsx          # Team branding component
│   └── data/
│       └── mockSigns.ts        # Comprehensive dataset (26 alphabets + Team Apex intros)

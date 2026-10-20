# APEX Humanoid (React + WebGL2 Rebuild)

A procedural 300k-particle WebGL2 humanoid robot featuring interactive speech recognition, audio synthesis, hand gesture tracking, mood responsiveness, and an integrated YouTube Short & Content Package Studio.

## Architecture

- **Frontend**: React 19 SPA powered by Vite and Tailwind CSS.
- **Visual Engine**: Procedural WebGL2 point cloud rendering with custom GLSL vertex and fragment shaders, additive particle blending, breathing dynamics, orbital rings, halo, and animated topographic terrain.
- **Audio Engine**: Synthesized drone, fifth, LFO, and sound effects generated live via the Web Audio API without external audio files.
- **Backend**: Express + Vite middleware server (`server.ts`) hosting API routes for conversational AI (`/chat`, `/chat/stream`), ElevenLabs TTS proxy (`/tts`), YouTube Shorts script planner & voice generator (`/yt/plan`, `/yt/voice`), Content Package strategist (`/content/plan`), and 3D printer telemetry (`/printer`).

## Features

1. **Procedural Humanoid**: 300,000 mathematical points sampled in real time. Switch between procedural characters (Nova, Astra, Unit 7), portrait avatars (KAZE, VEGA), or upload your own face photo to sample into the point cloud.
2. **Interactive Brain & Voice**: Real-time microphone listening via Web Speech API, instant offline rules, and server-side model streaming.
3. **Hand Gesture Tracking**: In-browser skin-tone centroid tracking using the device camera for natural gaze follow without external ML dependencies.
4. **YouTube Shorts Studio**: Full vertical video generator with AI script planning, multi-scene voice synthesis, 2D particle canvas drawing with audio track alignment, MediaRecorder export, and Web Share API integration.
5. **Content Package Strategist**: Generates viral short-form content packages (5 hooks, timed reel script, caption, hashtags, thumbnail copy, posting time recommendation).
6. **Themes & Customization**: Cyan, Violet, Mint, and Amber color palettes with responsive HUD telemetry and ambient lighting controls.

## Development

```bash
npm run dev      # Starts full-stack server on port 3000
npm run build    # Builds Vite frontend into dist/
npm run lint     # Validates TypeScript types
```
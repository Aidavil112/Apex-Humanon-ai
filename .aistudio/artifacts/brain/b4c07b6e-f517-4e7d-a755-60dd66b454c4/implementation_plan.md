# Sentiment Analysis & Emotional Mood Engine for APEX Humanoid

Real-time client-side sentiment analysis that classifies user spoken and typed inputs into emotional tones (happy, sad, angry, surprised, calm, neutral), driving procedural WebGL2 particle glows, dynamic HUD telemetry, audio harmonic responses, and automatic state reset upon speech completion.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and UX choices were confirmed during Phase 1 clarification:
> - **Sentiment Engine**: Client-side keyword, polarity, and valence analysis delivering instantaneous zero-latency classification across English and Hinglish/Hindi phrases.
> - **Mood Palette**: Full spectrum featuring `happy`, `sad`, `angry`, `surprised`, `calm`, and `neutral` (expanding on existing `idle`, `listening`, `thinking`, `speaking`).
> - **Persistence**: Dynamic duration that stays active through the assistant's speech synthesis response and gracefully resets to `idle` upon completion.
> - **Manual Testing**: Interactive emotional buttons in the slide-up menu drawer allowing manual preview and testing of all emotions.

---

## 1. Overview & Core Concept

- **What It Does**: As the user speaks or types to APEX Humanoid, a client-side sentiment analyzer evaluates word polarity, emotional keywords, punctuation markers, and negations in real time. The humanoid's 300,000 WebGL2 particles immediately transition their core color, brightness, and turbulent pulse to match the detected tone, while HUD telemetry displays the active emotion and confidence rating.
- **Target Audience**: Users conversing with APEX Humanoid via voice or text who want a deeply reactive, empathetic, and lifelike robotic companion.
- **Key Value**: Replaces static state transitions with contextual emotional intelligence, making interactions feel conversational, natural, and visually expressive.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **User Voice or Text Utterance**:
   - User speaks into the microphone (or submits a typed question in the Ask modal).
   - E.g., *"This is absolutely incredible work, thank you so much!"* or *"I am so frustrated and angry with this error."*
2. **Instant Sentiment Tone Detection**:
   - Sentiment analyzer computes emotional score vector: `{ happy: 0.94, angry: 0.0, sad: 0.0, ... }`.
   - Primary emotion (`happy` or `angry`) is selected and dispatched to state.
3. **Immediate WebGL2 & Audio Reaction**:
   - Particle core colors smoothly lerp to the emotional theme:
     - **Happy**: Radiant golden amber shimmer (`#FFD13B`, `amt: 1.6`) with buoyant micro-oscillation.
     - **Sad**: Melancholic deep cobalt indigo (`#3B62FF`, `amt: 0.65`) with gentle slow breathing.
     - **Angry**: Fiery crimson flare (`#FF2618`, `amt: 2.1`) with turbulent particle agitation.
     - **Surprised**: Electric violet-magenta pulse (`#E834FF`, `amt: 1.85`) with rapid wavefront ripples.
     - **Calm**: Serene mint-emerald equilibrium (`#26E8A8`, `amt: 0.95`) with smooth wave cycles.
     - **Neutral**: Balanced moon-silver aura (`#AECFE5`, `amt: 1.0`).
   - HUD status displays: `STATUS: HAPPY [94%] · TONE DETECTED`.
   - Audio engine plays harmonic chord tuned to the sentiment mood.
4. **Response & Graceful Reset**:
   - The humanoid speaks its response while sustaining the emotional resonance.
   - When speech synthesis concludes, the mood gently transitions back to `idle`.

### Menu Controls
- The slide-up menu sheet (`MenuSheet.tsx`) will feature an **EMOTIONAL MOODS** selector bar alongside operational moods, enabling one-touch manual testing.

---

## 3. Key Product Decisions & Trade-Offs

- **Client-Side Rule & Valence Analyzer vs. Cloud API**:
  - *Chosen*: Zero-latency client-side keyword and token analyzer (`src/engine/sentiment.ts`).
  - *Why*: Eliminates latency bottlenecks ($0\text{ms}$ vs $400\text{ms}+$ HTTP round-trips), works completely offline, and operates simultaneously with both quick responses and streaming speech recognition.
  - *Language Coverage*: Includes English lexicon plus common Romanized Hindi / Hinglish expressions (`khush`, `gussa`, `udas`, `mast`, `shanti`, `badhiya`, `bakwaas`).
- **Unified Mood State System**:
  - *Chosen*: Extend existing `MoodType` in `types/index.ts` and `MOODS` in `src/engine/webgl.ts` rather than maintaining a disconnected parallel state.
  - *Why*: Keeps shader uniforms, lerp physics, HUD telemetry, and audio chimes coherent and centralized.

---

## 4. Technical Architecture & Data Strategy

### System Flow Diagram

```
┌────────────────────────────────────────────────────────┐
│                   User Interaction                     │
│         (Speech Recognition / Ask Modal Input)         │
└───────────────────────────┬────────────────────────────┘
                            │ text string
                            ▼
┌────────────────────────────────────────────────────────┐
│           Sentiment Analysis Engine                    │
│           (src/engine/sentiment.ts)                    │
│  - Tokenization, Stemming & Negation Detection         │
│  - Weighted Emotional Lexicon (EN + Hinglish)          │
│  - Valence Scoring & Primary Tone Resolution           │
└──────────────┬──────────────────────────┬──────────────┘
               │ { mood, score, label }   │
               ▼                          ▼
┌───────────────────────────────┐ ┌──────────────────────┐
│       App State Controller    │ │ Audio Engine SFX     │
│       (src/App.tsx)           │ │ (src/engine/audio.ts)│
│  - setMood(detectedMood)      │ │ - Chords & Tones for │
│  - Speech onend -> idle reset │ │   Emotions           │
└──────────────┬────────────────┘ └──────────────────────┘
               │
               ▼
┌────────────────────────────────────────────────────────┐
│               Visual Rendering Engines                 │
├───────────────────────────────┬────────────────────────┤
│ WebGL2 Particle System        │ HUD & Waveform         │
│ (src/engine/webgl.ts)         │ (HudOverlay & Waveform)│
│ - uCoreCol lerp (RGB vector)  │ - Mood label & badge   │
│ - uCoreAmt & turbulent pulse  │ - Real-time frequency  │
└───────────────────────────────┴────────────────────────┘
```

### Components to Update
1. **`src/types/index.ts`**:
   - Expand `MoodType` to include `'happy' | 'sad' | 'angry' | 'surprised' | 'calm' | 'neutral'`.
   - Add `SentimentResult` interface (`mood`, `score`, `valence`, `label`).
2. **`src/engine/sentiment.ts` (New File)**:
   - Client-side tokenization, negation handling (e.g., *"not happy"* $\rightarrow$ sad/frustrated), and emotion dictionary lookup.
   - Multilingual support for English + Hinglish emotion vocabularies.
3. **`src/engine/webgl.ts`**:
   - Add emotional core color vectors and amplitude settings in `MOODS` table.
   - Add mood-specific particle agitation and pulse behaviors in the render loop.
4. **`src/engine/audio.ts`**:
   - Add tone signatures for `happy`, `sad`, `angry`, `surprised`, `calm`, and `neutral`.
5. **`src/components/HudOverlay.tsx`**:
   - Update status display to show detected emotion badge and confidence percentage.
6. **`src/components/MenuSheet.tsx`**:
   - Add emotion buttons to allow users to trigger moods directly from the menu.
7. **`src/App.tsx`**:
   - Call `analyzeSentiment(text)` inside `handleUtterance(text)` and update mood accordingly.
   - Reset mood to `idle` once the speech utterance finishes playing.

import React, { useEffect, useRef, useState } from 'react';
import { audio } from '../engine/audio';
import { MoodType } from '../types';

interface AudioWaveformProps {
  mood: MoodType;
  isListening: boolean;
  themeAccent: [number, number, number];
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({
  mood,
  isListening,
  themeAccent,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);
  const [levelText, setLevelText] = useState('0.00');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const timeBuf = new Uint8Array(256);
    const freqBuf = new Uint8Array(256);

    let t0 = performance.now();
    let lastLevelUpdate = 0;

    const render = () => {
      const now = performance.now();
      const t = (now - t0) / 1000;

      // Handle DPR & responsive sizing
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const width = Math.floor(rect.width * dpr);
      const height = Math.floor(rect.height * dpr);

      if (width === 0 || height === 0) {
        animRef.current = requestAnimationFrame(render);
        return;
      }

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);

      let hasActiveSignal = false;
      let rms = 0;

      if (audio.analyser) {
        audio.analyser.getByteTimeDomainData(timeBuf);
        audio.analyser.getByteFrequencyData(freqBuf);

        // Calculate acoustic energy RMS
        let sum = 0;
        for (let i = 0; i < timeBuf.length; i++) {
          const v = (timeBuf[i] - 128) / 128;
          sum += v * v;
        }
        rms = Math.sqrt(sum / timeBuf.length);
        if (rms > 0.02 || mood === 'speaking' || isListening) {
          hasActiveSignal = true;
        }
      }

      if (now - lastLevelUpdate > 120) {
        lastLevelUpdate = now;
        const displayRms = Math.min(
          1,
          rms * 3.5 + (mood === 'speaking' ? 0.45 : isListening ? 0.25 : 0.04)
        );
        setLevelText((displayRms * 100).toFixed(0));
      }

      const accentCol = `rgb(${themeAccent.map((v) => Math.round(v * 255)).join(',')})`;
      const centerY = height * 0.52;
      const step = width / (timeBuf.length - 1);

      // 1. Subtle horizontal background gridlines
      ctx.beginPath();
      ctx.strokeStyle = `rgba(79,210,255,0.06)`;
      ctx.lineWidth = 1;
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.moveTo(0, centerY - height * 0.3);
      ctx.lineTo(width, centerY - height * 0.3);
      ctx.moveTo(0, centerY + height * 0.3);
      ctx.lineTo(width, centerY + height * 0.3);
      ctx.stroke();

      // 2. Frequency spectrum vertical bars
      const numBars = 54;
      const barSpacing = width / numBars;
      const barWidth = Math.max(1.8 * dpr, barSpacing * 0.42);

      for (let i = 0; i < numBars; i++) {
        const binIndex = Math.floor((i / numBars) * 72);
        let rawVal = freqBuf[binIndex] || 0;
        let valNorm = rawVal / 255;

        // Visual enhancement when speaking or listening
        if (mood === 'speaking') {
          valNorm = Math.max(
            valNorm,
            (0.38 + 0.32 * Math.sin(t * 8 + i * 0.38)) * (0.65 + 0.35 * Math.sin(t * 3.2))
          );
        } else if (isListening) {
          valNorm = Math.max(valNorm, 0.16 + 0.14 * Math.sin(t * 4.2 + i * 0.5));
        } else {
          // Soft ambient idle breathing wave
          valNorm = Math.max(valNorm, 0.04 + 0.03 * Math.sin(t * 1.8 + i * 0.25));
        }

        const barHeight = valNorm * (height * 0.44);
        const x = i * barSpacing + (barSpacing - barWidth) / 2;

        const grad = ctx.createLinearGradient(0, centerY - barHeight, 0, centerY + barHeight);
        grad.addColorStop(0, `rgba(${themeAccent.map((v) => Math.round(v * 255)).join(',')}, 0.85)`);
        grad.addColorStop(0.5, `rgba(${themeAccent.map((v) => Math.round(v * 255)).join(',')}, 0.15)`);
        grad.addColorStop(1, `rgba(${themeAccent.map((v) => Math.round(v * 255)).join(',')}, 0.85)`);

        ctx.fillStyle = grad;
        ctx.fillRect(x, centerY - barHeight, barWidth, barHeight * 2);
      }

      // 3. Primary Oscilloscope Waveform Line
      ctx.beginPath();
      ctx.lineWidth = 1.8 * dpr;
      ctx.strokeStyle = accentCol;
      ctx.shadowBlur = 10;
      ctx.shadowColor = accentCol;

      let firstPoint = true;
      for (let i = 0; i < timeBuf.length; i++) {
        let norm = (timeBuf[i] - 128) / 128;

        if (mood === 'speaking') {
          norm += Math.sin(t * 12 + i * 0.12) * 0.24 * Math.sin(t * 4);
        } else if (isListening) {
          norm += Math.sin(t * 6 + i * 0.08) * 0.09;
        } else if (!hasActiveSignal) {
          norm = Math.sin(t * 2.4 + i * 0.06) * 0.035;
        }

        const x = i * step;
        const amplitudeY = norm * (height * 0.38);
        const y = centerY + amplitudeY;

        if (firstPoint) {
          ctx.moveTo(x, y);
          firstPoint = false;
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // 4. Secondary inverted mirror waveform glow
      ctx.beginPath();
      ctx.lineWidth = 1.0 * dpr;
      ctx.strokeStyle = `rgba(${themeAccent.map((v) => Math.round(v * 255)).join(',')}, 0.38)`;
      firstPoint = true;
      for (let i = 0; i < timeBuf.length; i++) {
        let norm = (timeBuf[i] - 128) / 128;
        if (mood === 'speaking') {
          norm += Math.sin(t * 12 + i * 0.12) * 0.24 * Math.sin(t * 4);
        } else if (isListening) {
          norm += Math.sin(t * 6 + i * 0.08) * 0.09;
        } else if (!hasActiveSignal) {
          norm = Math.sin(t * 2.4 + i * 0.06) * 0.035;
        }

        const x = i * step;
        const amplitudeY = -norm * (height * 0.28);
        const y = centerY + amplitudeY;

        if (firstPoint) {
          ctx.moveTo(x, y);
          firstPoint = false;
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [mood, isListening, themeAccent]);

  // Audio mode status text
  const statusLabel =
    mood === 'speaking'
      ? '⚡ VOICE SYNTH: ACTIVE'
      : isListening
      ? '🎙 MIC INPUT: ACTIVE'
      : mood === 'angry'
      ? '🔥 TONE: ANGRY'
      : mood === 'happy'
      ? '✨ TONE: HAPPY'
      : mood === 'sad'
      ? '💧 TONE: SAD'
      : mood === 'surprised'
      ? '⚡ TONE: SURPRISED'
      : mood === 'calm'
      ? '🌿 TONE: CALM'
      : '◌ WAVEFORM: STANDBY';

  const accentColorStyle = `rgb(${themeAccent.map((v) => Math.round(v * 255)).join(',')})`;

  return (
    <div className="fixed left-0 right-0 bottom-0 h-[80px] sm:h-[96px] pointer-events-none select-none z-10 flex flex-col justify-end">
      {/* Waveform Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-85 transition-opacity duration-300"
      />

      {/* Cyberpunk Audio Telemetry Left Label */}
      <div className="absolute left-4 sm:left-6 bottom-2.5 text-[8px] sm:text-[9.5px] tracking-[0.2em] font-mono uppercase flex items-center gap-1.5 opacity-80 pointer-events-none">
        <span
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: accentColorStyle,
            boxShadow: `0 0 6px ${accentColorStyle}`,
          }}
        />
        <span style={{ color: accentColorStyle }}>{statusLabel}</span>
      </div>

      {/* Right Telemetry Badge */}
      <div className="absolute right-4 sm:right-6 bottom-2.5 text-[8px] sm:text-[9.5px] tracking-[0.16em] font-mono uppercase items-center gap-2 opacity-65 hidden md:flex pointer-events-none">
        <span style={{ color: accentColorStyle }}>LEVEL {levelText}%</span>
        <span className="text-[#3b6782]">·</span>
        <span className="text-[#5284a3]">DUAL I/O • 44.1kHz</span>
      </div>
    </div>
  );
};

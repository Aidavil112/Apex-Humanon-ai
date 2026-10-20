import React from 'react';
import { MoodType } from '../types';

interface HudOverlayProps {
  mood: MoodType;
  fps: number;
  points: number;
  gestureActive: boolean;
  gestureCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  showHint: boolean;
  themeAccent: [number, number, number];
}

export const HudOverlay: React.FC<HudOverlayProps> = ({
  mood,
  fps,
  points,
  gestureActive,
  gestureCanvasRef,
  showHint,
  themeAccent,
}) => {
  const accentColor = `rgb(${themeAccent.map((v) => Math.round(v * 255)).join(',')})`;

  return (
    <div className="fixed inset-0 pointer-events-none select-none z-10">
      {/* Top Left Brand */}
      <div className="absolute top-6 left-6 text-[10.5px] tracking-[0.26em] text-[#5d90ae] uppercase leading-relaxed pointer-events-auto">
        <b className="text-[#bfe6ff] tracking-[0.3em] block font-semibold">APEX HUMANOID</b>
        <span className="text-[#2d556d]">rebuilt · raw webgl2 · react</span>
      </div>

      {/* Top Right Status & FPS */}
      <div className="absolute top-6 right-6 text-right text-[10px] tracking-[0.22em] text-[#5d90ae] uppercase pointer-events-auto">
        status:{' '}
        <b style={{ color: accentColor }} className="font-semibold tracking-[0.2em]">
          {mood}
        </b>
        <span
          className="inline-block w-[6px] h-[6px] rounded-full ml-2 align-middle pulse-dot"
          style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
        />
        <br />
        <span className="text-[#2d556d] text-[9.5px]">
          {fps > 0 ? `${fps} fps · ${(points / 1000).toFixed(0)}k pts` : '— fps'}
        </span>
      </div>

      {/* Center Subtle Hint */}
      {showHint && (
        <div className="absolute left-1/2 bottom-24 -translate-x-1/2 text-[10px] tracking-[0.2em] text-[#38627a] uppercase text-center transition-opacity duration-700 pointer-events-none hidden sm:block">
          move pointer — head follows · 1–4 mood · t theme · g gesture · f sfx · b bg
        </div>
      )}

      {/* Gesture Camera Mini Preview */}
      <canvas
        ref={gestureCanvasRef}
        width={120}
        height={90}
        className={`absolute left-6 bottom-40 w-[120px] h-[90px] rounded-lg border border-[rgba(79,210,255,0.28)] bg-[#04090e] transition-opacity duration-300 pointer-events-auto ${
          gestureActive ? 'block opacity-85' : 'hidden opacity-0'
        }`}
      />

      {/* Bottom Left Info */}
      <div className="absolute left-6 bottom-7 text-[9.5px] leading-relaxed tracking-[0.08em] text-[#2f566d] max-w-[240px] hidden md:block pointer-events-auto">
        <b className="text-[#4d86a4] font-medium">built from scratch</b> — procedural WebGL2 point cloud, 300k points.
        <br />
        <span className="text-[#234254]">voice agent · gesture tracking · creative studio</span>
      </div>
    </div>
  );
};

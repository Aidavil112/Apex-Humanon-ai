import React, { useRef } from 'react';
import { CharacterConfig, MoodType, ThemeConfig } from '../types';

interface MenuSheetProps {
  isOpen: boolean;
  currentMood: MoodType;
  onSelectMood: (m: MoodType) => void;
  gestureActive: boolean;
  onToggleGesture: () => void;
  characters: CharacterConfig[];
  currentCharIdx: number;
  onCycleCharacter: () => void;
  photoMode: boolean;
  onPhotoUpload: (file: File) => void;
  onExitPhoto: () => void;
  onReplay: () => void;
  onOpenAsk: () => void;
  onVoiceTest: () => void;
  deepMode: boolean;
  onToggleDeep: () => void;
  onOpenYouTube: () => void;
  langMode: string;
  onToggleLang: () => void;
  themes: ThemeConfig[];
  currentThemeIdx: number;
  onCycleTheme: () => void;
  bgOn: boolean;
  onToggleBg: () => void;
  sfxOn: boolean;
  onToggleSfx: () => void;
  soundOn: boolean;
  onToggleSound: () => void;
  onClose: () => void;
}

export const MenuSheet: React.FC<MenuSheetProps> = ({
  isOpen,
  currentMood,
  onSelectMood,
  gestureActive,
  onToggleGesture,
  characters,
  currentCharIdx,
  onCycleCharacter,
  photoMode,
  onPhotoUpload,
  onExitPhoto,
  onReplay,
  onOpenAsk,
  onVoiceTest,
  deepMode,
  onToggleDeep,
  onOpenYouTube,
  langMode,
  onToggleLang,
  themes,
  currentThemeIdx,
  onCycleTheme,
  bgOn,
  onToggleBg,
  sfxOn,
  onToggleSfx,
  soundOn,
  onToggleSound,
  onClose,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const currentCharacter = characters[currentCharIdx];
  const currentTheme = themes[currentThemeIdx];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onPhotoUpload(file);
    }
  };

  const handleFaceClick = () => {
    if (photoMode) {
      onExitPhoto();
    } else {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-[calc(92px+env(safe-area-inset-bottom))] w-[min(480px,calc(100vw-32px))] z-30 flex flex-col gap-2 p-3 rounded-2xl bg-[rgba(6,14,21,0.92)] border border-[rgba(79,210,255,0.22)] backdrop-blur-xl shadow-[0_18px_50px_-20px_rgba(0,0,0,0.95)] animate-in fade-in zoom-in-95 duration-150">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Row 1: Mood States */}
      <div className="flex gap-1.5 flex-wrap justify-center">
        {(['idle', 'listening', 'thinking', 'speaking'] as MoodType[]).map((m) => (
          <button
            key={m}
            onClick={() => onSelectMood(m)}
            aria-pressed={currentMood === m}
            className={`cursor-pointer font-mono text-[10.5px] tracking-[0.13em] uppercase rounded-lg px-3 py-1.5 transition-all duration-150 border ${
              currentMood === m
                ? 'text-[#0a1620] bg-[var(--cyan,#4fd2ff)] border-[var(--cyan,#4fd2ff)] font-semibold shadow-[0_0_12px_rgba(79,210,255,0.6)]'
                : 'text-[#7fa8c2] border-[rgba(79,210,255,0.12)] bg-transparent hover:text-[#d7f1ff] hover:bg-[rgba(79,210,255,0.08)]'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Row 2: Features & Characters */}
      <div className="flex gap-1.5 flex-wrap justify-center">
        <button
          onClick={onToggleGesture}
          aria-pressed={gestureActive}
          className={`cursor-pointer font-mono text-[10px] tracking-[0.12em] uppercase rounded-lg px-2.5 py-1.5 transition-all duration-150 border ${
            gestureActive
              ? 'text-[#bfe6ff] bg-[rgba(79,210,255,0.2)] border-[rgba(79,210,255,0.5)] font-semibold'
              : 'text-[#5d7f96] border-[rgba(79,210,255,0.12)] hover:text-[#d7f1ff] hover:bg-[rgba(79,210,255,0.06)]'
          }`}
        >
          ✋ gesture
        </button>

        <button
          onClick={onCycleCharacter}
          className="cursor-pointer font-mono text-[10px] tracking-[0.12em] uppercase rounded-lg px-2.5 py-1.5 transition-all duration-150 border border-[rgba(79,210,255,0.12)] text-[#5d7f96] hover:text-[#d7f1ff] hover:bg-[rgba(79,210,255,0.06)]"
        >
          ◈ {currentCharacter?.name || 'nova'}
        </button>

        <button
          onClick={handleFaceClick}
          aria-pressed={photoMode}
          className={`cursor-pointer font-mono text-[10px] tracking-[0.12em] uppercase rounded-lg px-2.5 py-1.5 transition-all duration-150 border ${
            photoMode
              ? 'text-[#bfe6ff] bg-[rgba(79,210,255,0.2)] border-[rgba(79,210,255,0.5)] font-semibold'
              : 'text-[#5d7f96] border-[rgba(79,210,255,0.12)] hover:text-[#d7f1ff] hover:bg-[rgba(79,210,255,0.06)]'
          }`}
        >
          ◉ face
        </button>

        <button
          onClick={onReplay}
          className="cursor-pointer font-mono text-[10px] tracking-[0.12em] uppercase rounded-lg px-2.5 py-1.5 transition-all duration-150 border border-[rgba(79,210,255,0.12)] text-[#5d7f96] hover:text-[#d7f1ff] hover:bg-[rgba(79,210,255,0.06)]"
        >
          ↺ replay
        </button>

        <button
          onClick={onOpenAsk}
          className="cursor-pointer font-mono text-[10px] tracking-[0.12em] uppercase rounded-lg px-2.5 py-1.5 transition-all duration-150 border border-[rgba(79,210,255,0.12)] text-[#5d7f96] hover:text-[#d7f1ff] hover:bg-[rgba(79,210,255,0.06)]"
        >
          ⌨ ask
        </button>

        <button
          onClick={onVoiceTest}
          className="cursor-pointer font-mono text-[10px] tracking-[0.12em] uppercase rounded-lg px-2.5 py-1.5 transition-all duration-150 border border-[rgba(79,210,255,0.12)] text-[#5d7f96] hover:text-[#d7f1ff] hover:bg-[rgba(79,210,255,0.06)]"
        >
          🔊 test
        </button>

        <button
          onClick={onToggleDeep}
          aria-pressed={deepMode}
          className={`cursor-pointer font-mono text-[10px] tracking-[0.12em] uppercase rounded-lg px-2.5 py-1.5 transition-all duration-150 border ${
            deepMode
              ? 'text-[#bfe6ff] bg-[rgba(79,210,255,0.2)] border-[rgba(79,210,255,0.5)] font-semibold'
              : 'text-[#5d7f96] border-[rgba(79,210,255,0.12)] hover:text-[#d7f1ff] hover:bg-[rgba(79,210,255,0.06)]'
          }`}
        >
          🧠 {deepMode ? 'deep ·on' : 'deep'}
        </button>

        <button
          onClick={onOpenYouTube}
          className="cursor-pointer font-mono text-[10px] tracking-[0.12em] uppercase rounded-lg px-2.5 py-1.5 transition-all duration-150 border border-[#2ea8c9] text-[#7fd4ff] bg-[rgba(46,168,201,0.12)] hover:bg-[rgba(46,168,201,0.24)]"
        >
          🎬 youtube
        </button>
      </div>

      {/* Row 3: Preferences & Toggles */}
      <div className="flex gap-1.5 flex-wrap justify-center pt-1 border-t border-[rgba(79,210,255,0.08)]">
        <button
          onClick={onToggleLang}
          className="cursor-pointer font-mono text-[10px] tracking-[0.12em] uppercase rounded-lg px-2.5 py-1.5 transition-all duration-150 border border-[rgba(79,210,255,0.12)] text-[#5d7f96] hover:text-[#d7f1ff]"
        >
          {langMode === 'hi-IN' ? 'अ hi' : 'A en'}
        </button>

        <button
          onClick={onCycleTheme}
          className="cursor-pointer font-mono text-[10px] tracking-[0.12em] uppercase rounded-lg px-2.5 py-1.5 transition-all duration-150 border border-[rgba(79,210,255,0.12)] text-[#5d7f96] hover:text-[#d7f1ff]"
        >
          ◐ {currentTheme.name}
        </button>

        <button
          onClick={onToggleBg}
          aria-pressed={bgOn}
          className={`cursor-pointer font-mono text-[10px] tracking-[0.12em] uppercase rounded-lg px-2.5 py-1.5 transition-all duration-150 border ${
            bgOn
              ? 'text-[#bfe6ff] bg-[rgba(79,210,255,0.15)] border-[rgba(79,210,255,0.4)]'
              : 'text-[#446074] border-[rgba(79,210,255,0.08)]'
          }`}
        >
          ◧ bg
        </button>

        <button
          onClick={onToggleSfx}
          aria-pressed={sfxOn}
          className={`cursor-pointer font-mono text-[10px] tracking-[0.12em] uppercase rounded-lg px-2.5 py-1.5 transition-all duration-150 border ${
            sfxOn
              ? 'text-[#bfe6ff] bg-[rgba(79,210,255,0.15)] border-[rgba(79,210,255,0.4)]'
              : 'text-[#446074] border-[rgba(79,210,255,0.08)]'
          }`}
        >
          ♪ fx
        </button>

        <button
          onClick={onToggleSound}
          aria-pressed={soundOn}
          className={`cursor-pointer font-mono text-[10px] tracking-[0.12em] uppercase rounded-lg px-2.5 py-1.5 transition-all duration-150 border ${
            soundOn
              ? 'text-[#bfe6ff] bg-[rgba(79,210,255,0.15)] border-[rgba(79,210,255,0.4)]'
              : 'text-[#446074] border-[rgba(79,210,255,0.08)]'
          }`}
        >
          sound
        </button>
      </div>
    </div>
  );
};

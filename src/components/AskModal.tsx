import React, { useState } from 'react';

interface AskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (question: string) => void;
}

export const AskModal: React.FC<AskModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [question, setQuestion] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmit(question.trim());
      setQuestion('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#04090ecc] backdrop-blur-sm font-mono">
      <div className="w-full max-w-[440px] bg-[#07131d] border border-[rgba(79,210,255,0.3)] rounded-2xl p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.95)] animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(79,210,255,0.12)] mb-4">
          <div className="text-xs tracking-[0.2em] text-[#7fd4ff] font-semibold uppercase">
            ASK THE HUMANOID
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer bg-[#0d1a24] text-[#9fe8ff] border border-[#1d3a4d] rounded-lg px-2.5 py-1 text-xs hover:bg-[#142838]"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              autoFocus
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question (English or Hindi)…"
              className="w-full bg-[#0a151d] border border-[#1d3a4d] rounded-xl p-3.5 text-[#eaf9ff] text-sm focus:outline-none focus:border-[#2ea8c9]"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer flex-1 bg-[#0d1a24] text-[#7fa8c2] border border-[#1d3a4d] rounded-xl py-2.5 text-xs hover:bg-[#142838]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!question.trim()}
              className="cursor-pointer flex-1 bg-gradient-to-r from-[#1a6d8f] to-[#2ea8c9] text-[#03181f] border-0 rounded-xl py-2.5 font-bold text-xs disabled:opacity-40"
            >
              Ask Brain
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

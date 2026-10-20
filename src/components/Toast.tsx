import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-[calc(110px+env(safe-area-inset-bottom))] z-20 bg-[rgba(8,20,30,0.92)] border border-[rgba(79,210,255,0.28)] rounded-xl py-2 px-4 text-[10.5px] tracking-[0.12em] text-[#a9d8f0] uppercase max-w-[85vw] text-center pointer-events-none shadow-[0_4px_24px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-200">
      {message}
    </div>
  );
};

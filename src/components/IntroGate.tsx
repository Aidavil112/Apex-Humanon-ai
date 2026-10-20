import React from 'react';

interface IntroGateProps {
  onEnter: () => void;
}

export const IntroGate: React.FC<IntroGateProps> = ({ onEnter }) => {
  return (
    <div className="fixed inset-0 z-40 grid place-content-center text-center bg-[radial-gradient(60%_60%_at_50%_50%,#060d14_0%,#03060a_70%,#000_100%)] select-none">
      <h1 className="m-0 text-[16px] sm:text-[18px] tracking-[0.52em] text-[#bfe6ff] font-medium indent-[0.52em]">
        APEX HUMANOID
      </h1>
      <p className="mt-3.5 text-[11px] tracking-[0.16em] text-[#4a7c98] lowercase">
        a figure of light that assembles itself
      </p>
      <button
        onClick={onEnter}
        className="cursor-pointer mx-auto mt-8 px-8 py-3.5 font-mono text-[11px] tracking-[0.34em] text-[#9fd8f5] indent-[0.34em] bg-[rgba(6,20,30,0.7)] border border-[rgba(79,210,255,0.35)] rounded-xl transition-all duration-300 hover:text-[#eafaff] hover:border-[rgba(79,210,255,0.9)] hover:bg-[rgba(10,34,50,0.85)] hover:shadow-[0_0_34px_-8px_rgba(79,210,255,0.6)]"
      >
        ENTER
      </button>
      <small className="block mt-5 text-[9.5px] tracking-[0.14em] text-[#2c4f63]">
        click begins assembly · enables audio & visual engine
      </small>
    </div>
  );
};

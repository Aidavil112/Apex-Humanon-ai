import React, { useState } from 'react';

interface ReelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTopicForShorts: (topic: string) => void;
  onOpenAgentCompany?: () => void;
  onToast: (msg: string) => void;
}

const DEFAULT_REEL_URL = 'https://www.facebook.com/share/r/1CsnV4FJGt/?mibextid=wwXIfr';

export const ReelModal: React.FC<ReelModalProps> = ({
  isOpen,
  onClose,
  onSelectTopicForShorts,
  onOpenAgentCompany,
  onToast,
}) => {
  const [reelUrl, setReelUrl] = useState(DEFAULT_REEL_URL);
  const [activeUrl, setActiveUrl] = useState(DEFAULT_REEL_URL);

  if (!isOpen) return null;

  const isFacebook = /facebook\.com|fb\.watch/i.test(activeUrl);

  const extractInstaId = (url: string): string => {
    const match = url.match(/(?:reel|p)\/([A-Za-z0-9_-]+)/);
    return match ? match[1] : 'DeZfiXZqJtP';
  };

  const handleUpdateReel = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = reelUrl.trim();
    if (!clean) return;
    setActiveUrl(clean);
    onToast(`Loaded ${/facebook|fb/i.test(clean) ? 'Facebook' : 'Instagram'} Reel!`);
  };

  const handleConvertToShort = () => {
    const topicSuggestion = 'AI Chief of Staff and 19 Sub-Agents Running My Company';
    onSelectTopicForShorts(topicSuggestion);
    onClose();
    onToast(`Reel topic loaded into YouTube Content Agent: "${topicSuggestion}"`);
  };

  const embedSrc = isFacebook
    ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(activeUrl)}&show_text=false&width=500`
    : `https://www.instagram.com/p/${extractInstaId(activeUrl)}/embed/captioned/`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#04090ecc] backdrop-blur-md overflow-y-auto font-mono text-[#d8f2ff]">
      <div className="w-full max-w-[540px] bg-[#07131d] border border-[rgba(79,210,255,0.28)] rounded-2xl p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.95)] max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[rgba(79,210,255,0.14)] mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">{isFacebook ? '📘' : '📸'}</span>
            <div>
              <div className="text-[13px] tracking-[0.2em] text-[#ff6495] font-semibold uppercase">
                {isFacebook ? 'FACEBOOK REEL VIEWER' : 'INSTAGRAM REEL VIEWER'}
              </div>
              <div className="text-[10px] text-[#55829e] tracking-wider">
                Watch Reel · Viral Sentiment Analysis · Remix into YouTube Short
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer bg-[#0d1a24] text-[#9fe8ff] border border-[#1d3a4d] rounded-lg px-3 py-1.5 text-xs hover:bg-[#142838] transition-colors"
          >
            ✕ close
          </button>
        </div>

        {/* Input for custom Facebook or Instagram reel */}
        <form onSubmit={handleUpdateReel} className="flex gap-2 mb-4">
          <input
            type="text"
            value={reelUrl}
            onChange={(e) => setReelUrl(e.target.value)}
            placeholder="Paste Facebook or Instagram Reel URL…"
            className="flex-1 bg-[#0a151d] border border-[#1d3a4d] rounded-xl p-2.5 text-xs text-[#eaf9ff] focus:outline-none focus:border-[#ff6495]"
          />
          <button
            type="submit"
            className="cursor-pointer bg-[#1a2e3f] text-[#9fe8ff] border border-[#2d556d] px-3 py-2 rounded-xl text-xs hover:bg-[#233f56]"
          >
            Load
          </button>
        </form>

        {/* Embedded Facebook / Instagram Reel Frame */}
        <div className="relative w-full aspect-[9/14] sm:aspect-[9/13] max-h-[460px] bg-[#020508] border border-[rgba(79,210,255,0.2)] rounded-xl overflow-hidden mb-4 shadow-inner flex flex-col items-center justify-center">
          <iframe
            src={embedSrc}
            className="w-full h-full border-0 rounded-xl"
            title={isFacebook ? 'Facebook Reel' : 'Instagram Reel'}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Action Controls */}
        <div className="flex flex-col gap-2.5">
          {onOpenAgentCompany && (
            <button
              onClick={() => {
                onClose();
                onOpenAgentCompany();
              }}
              className="w-full cursor-pointer bg-gradient-to-r from-[#ff5522] via-[#ff7a18] to-[#ffd13b] text-[#140801] py-3 rounded-xl font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(255,100,34,0.4)] hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <span>🏢</span>
              <span>MAKE THIS REAL: LAUNCH MULTI-AGENT AI COMPANY</span>
              <span>⚡</span>
            </button>
          )}

          <div className="flex flex-col sm:flex-row gap-2.5">
            <a
              href={activeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 cursor-pointer text-center text-white py-3 rounded-xl font-bold text-xs tracking-wider shadow-md hover:brightness-110 transition-all ${
                isFacebook
                  ? 'bg-gradient-to-r from-[#1877f2] to-[#0d5abe]'
                  : 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]'
              }`}
            >
              ↗ Open in {isFacebook ? 'Facebook App' : 'Instagram App'}
            </a>

            <button
              onClick={handleConvertToShort}
              className="flex-1 cursor-pointer bg-gradient-to-r from-[#176282] to-[#2ea8c9] text-[#03181f] py-3 rounded-xl font-bold text-xs tracking-wider hover:brightness-110 transition-all"
            >
              🎬 Remix into YouTube Short
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

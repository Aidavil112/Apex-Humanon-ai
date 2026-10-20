import React, { useState, useEffect, useRef } from 'react';

interface AgentCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTopicForShorts?: (topic: string) => void;
  onToast: (msg: string) => void;
}

type TabType = 'room' | 'chief' | 'brain' | 'research' | 'scripting' | 'editing' | 'publishing';

interface AgentNode {
  id: string;
  name: string;
  role: string;
  department: 'chief' | 'brain' | 'research' | 'scripting' | 'editing' | 'publishing';
  avatar: string;
  status: 'IDLE' | 'ANALYZING' | 'EXECUTING' | 'COMPLETED';
  task: string;
  metricLabel: string;
  metricValue: string;
  outputPreview?: string;
}

interface MissionLog {
  id: string;
  time: string;
  agent: string;
  department: string;
  message: string;
  badge?: string;
}

const INITIAL_AGENTS: AgentNode[] = [
  {
    id: 'chief-1',
    name: 'Zora · Chief of Staff',
    role: 'Agent 1 // Executive Orchestrator',
    department: 'chief',
    avatar: '👑',
    status: 'EXECUTING',
    task: 'Coordinating 19 specialized agents & executive delegation',
    metricLabel: 'Team Velocity',
    metricValue: '99.4%',
    outputPreview: 'Briefing all 5 departments for Q3 viral scaling campaign.',
  },
  {
    id: 'brain-1',
    name: 'Brand Brain Core',
    role: 'Shared Neural Memory & Knowledge Vault',
    department: 'brain',
    avatar: '🧠',
    status: 'EXECUTING',
    task: 'Synchronizing brand voice, tone guidelines, and audience avatars',
    metricLabel: 'Synaptic Depth',
    metricValue: '1.4M Tokens',
    outputPreview: 'Tone locked: High-energy, cybernetic intelligence, tactical authority.',
  },
  {
    id: 'res-1',
    name: 'Trend Scout',
    role: 'Real-time Viral Sentiment & Topic Radar',
    department: 'research',
    avatar: '🛰️',
    status: 'COMPLETED',
    task: 'Scanning TikTok, IG Reels, and YouTube Shorts for breakout formats',
    metricLabel: 'Viral Potential',
    metricValue: '98/100',
    outputPreview: 'Detected top breakout trend: "AI Chief of Staff Running My Company".',
  },
  {
    id: 'res-2',
    name: 'Competitor Watch',
    role: 'Market Gap & Audience Arbitrage Analyst',
    department: 'research',
    avatar: '🔍',
    status: 'COMPLETED',
    task: 'Mapping competitor blindspots in workflow automation',
    metricLabel: 'Market Gap',
    metricValue: '+34% Untapped',
    outputPreview: 'Competitors lack isometric visual proof. Positioning Apex as the multi-agent operating system.',
  },
  {
    id: 'scr-1',
    name: 'Hook Master',
    role: 'Retention Architect & First 3-Second Hook Crafter',
    department: 'scripting',
    avatar: '⚡',
    status: 'EXECUTING',
    task: 'Generating 5 pattern-interrupt viral opening hooks',
    metricLabel: '3s Hold Rate',
    metricValue: '88.2%',
    outputPreview: 'Hook: "This single Chief of Staff AI is running my entire 7-figure company while I sleep..."',
  },
  {
    id: 'scr-2',
    name: 'Voice Cloner & Scriptwriter',
    role: 'High-Retention Script Generation & Pacing',
    department: 'scripting',
    avatar: '✍️',
    status: 'EXECUTING',
    task: 'Drafting 45-second high-velocity vertical script',
    metricLabel: 'Pacing Index',
    metricValue: '185 WPM',
    outputPreview: 'Script complete: Scene 1 to Scene 4 with timed punchy b-roll cues.',
  },
  {
    id: 'edt-1',
    name: 'Video Editor & Compositor',
    role: 'Vertical Dynamic Cuts, Zooms & Sound FX',
    department: 'editing',
    avatar: '✂️',
    status: 'ANALYZING',
    task: 'Assembling isometric visual overlays and glowing circuit line transitions',
    metricLabel: 'Render Status',
    metricValue: '4K · 60 FPS',
    outputPreview: 'Compositing glowing neural brain hologram over multi-agent workstation room.',
  },
  {
    id: 'edt-2',
    name: 'Cyberpunk Thumbnail Crafter',
    role: 'High-CTR Visual Package Generator',
    department: 'editing',
    avatar: '🎨',
    status: 'COMPLETED',
    task: 'Rendering high-contrast isometric thumbnail with neon callouts',
    metricLabel: 'Expected CTR',
    metricValue: '14.8%',
    outputPreview: 'Thumbnail: Holographic Brain in dark room with pointing gesture and "Chief of Staff" label.',
  },
  {
    id: 'pub-1',
    name: 'Omni-Distribution Scheduler',
    role: 'Multi-Platform Auto Poster & Time Optimizer',
    department: 'publishing',
    avatar: '🚀',
    status: 'IDLE',
    task: 'Preparing cross-posting queue for Instagram, YouTube, and X',
    metricLabel: 'Queue Slots',
    metricValue: '3 Platforms',
    outputPreview: 'Optimal posting window identified: 18:30 IST / 13:00 UTC.',
  },
  {
    id: 'pub-2',
    name: 'Comment Responder Bot',
    role: 'Community Engagement & Lead Magnet DM Automation',
    department: 'publishing',
    avatar: '💬',
    status: 'IDLE',
    task: 'Listening for keyword "CONTENT" to automatically DM multi-agent blueprint',
    metricLabel: 'DM Conversion',
    metricValue: '41.2%',
    outputPreview: 'Trigger keyword "CONTENT" armed. Instant webhook DM response configured.',
  },
];

export const AgentCompanyModal: React.FC<AgentCompanyModalProps> = ({
  isOpen,
  onClose,
  onSelectTopicForShorts,
  onToast,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('room');
  const [agents, setAgents] = useState<AgentNode[]>(INITIAL_AGENTS);
  const [missionInput, setMissionInput] = useState('Build & Scale an AI Multi-Agent Company with Chief of Staff');
  const [isRunningPipeline, setIsRunningPipeline] = useState(false);
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [selectedAgent, setSelectedAgent] = useState<AgentNode | null>(null);

  const [logs, setLogs] = useState<MissionLog[]>([
    {
      id: 'l-1',
      time: '14:20:02',
      agent: 'Zora · Chief of Staff',
      department: 'CHIEF',
      message: 'Autonomous company initialized. Reading shared knowledge core from Brand Brain.',
      badge: 'INITIATED',
    },
    {
      id: 'l-2',
      time: '14:20:08',
      agent: 'Trend Scout',
      department: 'RESEARCH',
      message: 'Scraped 120 breakout creator workflows. High viral affinity detected for Chief of Staff AI.',
      badge: 'DISCOVERY',
    },
    {
      id: 'l-3',
      time: '14:20:15',
      agent: 'Brand Brain Core',
      department: 'BRAIN',
      message: 'Synthesized company memory. Guidelines dispatched to Scripting and Editing teams.',
      badge: 'SYNCHRONIZED',
    },
    {
      id: 'l-4',
      time: '14:20:25',
      agent: 'Hook Master',
      department: 'SCRIPTING',
      message: 'High-conversion hook generated: "Agent 1 is my Chief of Staff running the entire team..."',
      badge: 'READY',
    },
  ]);

  const brainCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const isometricCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animated Glowing Neural Brand Brain Hologram Canvas
  useEffect(() => {
    if (!isOpen) return;
    const canvas = brainCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const renderBrain = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      t += 0.025;

      // Outer Hologram Rings
      for (let i = 0; i < 3; i++) {
        const radius = 55 + i * 18 + Math.sin(t * 1.5 + i) * 3;
        ctx.beginPath();
        ctx.ellipse(cx, cy, radius, radius * 0.45, t * (i % 2 === 0 ? 0.3 : -0.3), 0, Math.PI * 2);
        ctx.strokeStyle = i === 1 ? 'rgba(255, 100, 34, 0.65)' : 'rgba(255, 180, 50, 0.35)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([8, 12]);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Central Brain Glow Aura
      const glowGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, 65);
      glowGrad.addColorStop(0, 'rgba(255, 120, 40, 0.85)');
      glowGrad.addColorStop(0.5, 'rgba(255, 80, 20, 0.35)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 65, 0, Math.PI * 2);
      ctx.fill();

      // Neural Hemispheres (Left & Right lobe lobes)
      ctx.fillStyle = '#ff6b35';
      ctx.shadowColor = '#ff6b35';
      ctx.shadowBlur = 12;

      // Draw neural nodes
      const nodeCount = 28;
      const nodes: { x: number; y: number }[] = [];
      for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2;
        const side = i < nodeCount / 2 ? -1 : 1;
        const rBase = 26 + Math.sin(angle * 3 + t * 2) * 5;
        const nx = cx + side * (12 + Math.abs(Math.cos(angle)) * rBase) + Math.sin(t + i) * 2;
        const ny = cy + Math.sin(angle) * (rBase * 0.8) + Math.cos(t * 1.2 + i) * 2;
        nodes.push({ x: nx, y: ny });

        ctx.beginPath();
        ctx.arc(nx, ny, 2.5 + Math.sin(t * 3 + i) * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Synaptic connection lines between neighboring neural nodes
      ctx.strokeStyle = 'rgba(255, 200, 100, 0.45)';
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 26) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.shadowBlur = 0;

      // Central Synaptic Pulse Spark
      const sparkRadius = 14 + Math.sin(t * 4) * 6;
      ctx.beginPath();
      ctx.arc(cx, cy, sparkRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 240, 200, 0.75)';
      ctx.fill();

      animId = requestAnimationFrame(renderBrain);
    };

    animId = requestAnimationFrame(renderBrain);
    return () => cancelAnimationFrame(animId);
  }, [isOpen]);

  // Run Autonomous Multi-Agent Company Pipeline
  const runAutonomousPipeline = () => {
    setIsRunningPipeline(true);
    setPipelineStep(1);
    onToast('🚀 Chief of Staff launching Multi-Agent Autonomous Company Mission…');

    const steps = [
      {
        step: 1,
        dept: 'chief',
        agent: 'Zora · Chief of Staff',
        msg: `Chief of Staff parsed mission: "${missionInput}". Activating Brand Brain and delegating to 19 agents.`,
        badge: 'DELEGATING',
      },
      {
        step: 2,
        dept: 'research',
        agent: 'Trend Scout',
        msg: 'Research Team scanned 500+ top creator reels. Extracted #1 viral hook format: "AI Chief of Staff Running My Company".',
        badge: 'RESEARCHED',
      },
      {
        step: 3,
        dept: 'brain',
        agent: 'Brand Brain Core',
        msg: 'Brand Brain aligned messaging with knowledge core: High authority, cyberpunk aesthetic, zero fluff.',
        badge: 'ALIGNED',
      },
      {
        step: 4,
        dept: 'scripting',
        agent: 'Hook Master',
        msg: 'Hook Master drafted 3 viral hooks. Primary hook retention score: 96.4%. Full 45-second script generated.',
        badge: 'SCRIPTED',
      },
      {
        step: 5,
        dept: 'editing',
        agent: 'Cyberpunk Thumbnail Crafter',
        msg: 'Editing team assembled visual storyboard & high-CTR isometric thumbnail package with glowing brain hologram.',
        badge: 'RENDERED',
      },
      {
        step: 6,
        dept: 'publishing',
        agent: 'Omni-Distribution Scheduler',
        msg: 'Publishing Agent scheduled cross-distribution for YouTube Shorts, IG Reels, and X. Keyword "CONTENT" auto-responder armed.',
        badge: 'DEPLOYED',
      },
    ];

    steps.forEach((s, idx) => {
      setTimeout(() => {
        setPipelineStep(s.step);
        const nowStr = new Date().toLocaleTimeString('en-US', { hour12: false });
        setLogs((prev) => [
          {
            id: `log-${Date.now()}-${idx}`,
            time: nowStr,
            agent: s.agent,
            department: s.dept.toUpperCase(),
            message: s.msg,
            badge: s.badge,
          },
          ...prev.slice(0, 14),
        ]);

        // Update agent statuses
        setAgents((prev) =>
          prev.map((a) => {
            if (a.department === s.dept) {
              return { ...a, status: 'EXECUTING' };
            }
            return a;
          })
        );

        if (idx === steps.length - 1) {
          setIsRunningPipeline(false);
          onToast('✅ Multi-Agent Autonomous Company Mission Completed Successfully!');
        }
      }, (idx + 1) * 2200);
    });
  };

  const handleSendToShortsStudio = () => {
    const topic = 'AI Chief of Staff and 19 Sub-Agents Running My Company';
    onSelectTopicForShorts?.(topic);
    onClose();
    onToast(`Transferred Company Mission to YouTube Shorts Studio: "${topic}"`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[rgba(3,8,14,0.92)] backdrop-blur-2xl animate-in fade-in duration-200 font-mono text-[#d6eaf8]">
      <div className="relative w-full max-w-5xl max-h-[94vh] overflow-hidden rounded-2xl bg-[#060e17] border border-[rgba(255,100,34,0.35)] shadow-[0_25px_80px_-20px_rgba(255,80,20,0.35)] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 py-3.5 sm:px-6 sm:py-4 border-b border-[rgba(255,100,34,0.2)] bg-[rgba(10,20,30,0.85)] backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[rgba(255,100,34,0.15)] border border-[#ff6422] flex items-center justify-center text-xl shadow-[0_0_18px_rgba(255,100,34,0.5)]">
              👑
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-white text-sm sm:text-base font-bold tracking-wider uppercase">
                  CHIEF OF STAFF // MULTI-AGENT AI COMPANY
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(255,100,34,0.2)] text-[#ff803b] border border-[#ff6422] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff6422] animate-ping" />
                  19 SUB-AGENTS ACTIVE
                </span>
              </div>
              <div className="text-[10.5px] text-[#6d99b5] flex items-center gap-2 mt-0.5">
                <span>Agent 1 Coordinating Architecture</span>
                <span>·</span>
                <span className="text-[#ffd13b]">Brand Brain Synced</span>
                <span>·</span>
                <span>Autonomous Task Delegation</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSendToShortsStudio}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(79,210,255,0.15)] border border-[#4fd2ff] text-[#4fd2ff] hover:bg-[#4fd2ff] hover:text-[#05111b] text-xs font-bold tracking-wider transition-all cursor-pointer"
              title="Send blueprint to YouTube Short Agent"
            >
              <span>🎬</span>
              <span>Remix in Shorts</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg border border-[rgba(255,100,34,0.3)] text-[#86a9c1] hover:text-white hover:bg-[rgba(255,100,34,0.15)] flex items-center justify-center text-sm transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Mission Launchpad Bar */}
        <div className="px-4 py-2.5 sm:px-6 bg-[rgba(8,16,25,0.95)] border-b border-[rgba(255,100,34,0.15)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 flex-1">
            <span className="text-[11px] text-[#ff843e] font-semibold whitespace-nowrap">🎯 Company Mission:</span>
            <input
              type="text"
              value={missionInput}
              onChange={(e) => setMissionInput(e.target.value)}
              placeholder="e.g. Build viral YouTube/IG campaign, scale agency, launch SaaS..."
              className="flex-1 bg-[#030910] border border-[rgba(255,100,34,0.3)] rounded-lg px-3 py-1.5 text-xs text-white placeholder-[#456980] focus:outline-none focus:border-[#ff6422]"
            />
          </div>

          <button
            onClick={runAutonomousPipeline}
            disabled={isRunningPipeline}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
              isRunningPipeline
                ? 'bg-[#1b2b38] text-[#6d96b0] border border-[#2d4d63] cursor-not-allowed'
                : 'bg-gradient-to-r from-[#ff5522] via-[#ff7a18] to-[#ffd13b] text-[#140801] hover:brightness-110 shadow-[0_0_20px_rgba(255,100,34,0.45)]'
            }`}
          >
            {isRunningPipeline ? (
              <>
                <span className="w-2 h-2 rounded-full bg-[#ff7a18] animate-ping" />
                <span>Running Step {pipelineStep}/6…</span>
              </>
            ) : (
              <>
                <span>⚡</span>
                <span>RUN AUTONOMOUS COMPANY SWARM</span>
              </>
            )}
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* 1. ROOM OVERVIEW: THE ISOMETRIC 3D COMMAND CENTER */}
          {activeTab === 'room' && (
            <div className="space-y-4">
              {/* Isometric Command Center Visualization */}
              <div className="relative rounded-2xl bg-gradient-to-b from-[#07131e] to-[#04080e] border border-[rgba(255,100,34,0.25)] p-4 sm:p-6 overflow-hidden shadow-2xl">
                {/* Background Cybernetic Circuit Lines */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="w-full h-full bg-[radial-gradient(#ff6422_1px,transparent_1px)] [background-size:24px_24px]" />
                </div>

                {/* Top Center: Chief of Staff Node */}
                <div className="flex flex-col items-center justify-center relative z-10">
                  <div className="p-3 rounded-2xl bg-[#0b1c2b] border-2 border-[#ff6422] shadow-[0_0_30px_rgba(255,100,34,0.6)] flex items-center gap-3">
                    <span className="text-2xl animate-pulse">👑</span>
                    <div>
                      <div className="text-white text-xs font-bold tracking-wider">CHIEF OF STAFF (AGENT 1)</div>
                      <div className="text-[10px] text-[#ff803b] font-medium">Coordinating the team // Master Orchestrator</div>
                    </div>
                  </div>

                  {/* Pulsing Laser line down to Brand Brain */}
                  <div className="w-0.5 h-8 bg-gradient-to-b from-[#ff6422] to-[#ffd13b] animate-pulse" />
                </div>

                {/* Central Holographic Brand Brain & Surrounding Department Pods */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center relative z-10 my-2">
                  {/* Left Column: Research & Scripting */}
                  <div className="space-y-3">
                    {/* Research Dept Card */}
                    <div
                      onClick={() => setActiveTab('research')}
                      className="p-3.5 rounded-xl bg-[#081522] border border-[rgba(79,210,255,0.25)] hover:border-[#4fd2ff] transition-all cursor-pointer shadow-lg hover:shadow-[0_0_18px_rgba(79,210,255,0.3)] group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-base">🛰️</span>
                          <span className="text-white text-xs font-semibold uppercase group-hover:text-[#4fd2ff]">
                            Research Room
                          </span>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[rgba(79,210,255,0.15)] text-[#4fd2ff] font-bold">
                          2 AGENTS
                        </span>
                      </div>
                      <div className="text-[10px] text-[#6492af] mt-1.5">
                        Trend Scout · Competitor Watch · Viral Radar
                      </div>
                      <div className="text-[10px] text-[#00f5a0] mt-1 font-semibold flex items-center gap-1">
                        <span>● Status: Breakout Hook Identified</span>
                      </div>
                    </div>

                    {/* Scripting Dept Card */}
                    <div
                      onClick={() => setActiveTab('scripting')}
                      className="p-3.5 rounded-xl bg-[#081522] border border-[rgba(255,180,50,0.25)] hover:border-[#ffd13b] transition-all cursor-pointer shadow-lg hover:shadow-[0_0_18px_rgba(255,180,50,0.3)] group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-base">⚡</span>
                          <span className="text-white text-xs font-semibold uppercase group-hover:text-[#ffd13b]">
                            Scripting Room
                          </span>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[rgba(255,180,50,0.15)] text-[#ffd13b] font-bold">
                          2 AGENTS
                        </span>
                      </div>
                      <div className="text-[10px] text-[#6492af] mt-1.5">
                        Hook Master · Retention Architect · Voice Cloner
                      </div>
                      <div className="text-[10px] text-[#ffd13b] mt-1 font-semibold flex items-center gap-1">
                        <span>● Status: 5 Pattern-Interrupt Hooks Ready</span>
                      </div>
                    </div>
                  </div>

                  {/* Center Column: The Glowing Brand Brain Hologram */}
                  <div
                    onClick={() => setActiveTab('brain')}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[rgba(10,20,32,0.8)] border-2 border-[#ff6422] shadow-[0_0_35px_rgba(255,100,34,0.45)] cursor-pointer hover:border-[#ffd13b] transition-all group"
                  >
                    <div className="text-[10px] uppercase tracking-widest text-[#ff803b] font-bold mb-1 group-hover:text-[#ffd13b]">
                      ★ CENTRAL BRAND BRAIN ★
                    </div>
                    <div className="w-full h-36 relative flex items-center justify-center overflow-hidden">
                      <canvas ref={brainCanvasRef} width={280} height={144} className="w-full h-full block" />
                    </div>
                    <div className="text-[10px] text-[#b8dcf2] text-center mt-1">
                      Shared Memory & Strategic Intelligence
                    </div>
                    <div className="text-[9px] text-[#ff6422] font-semibold mt-0.5">
                      1.4M Tokens Synaptic Memory Active
                    </div>
                  </div>

                  {/* Right Column: Editing & Publishing */}
                  <div className="space-y-3">
                    {/* Editing Dept Card */}
                    <div
                      onClick={() => setActiveTab('editing')}
                      className="p-3.5 rounded-xl bg-[#081522] border border-[rgba(240,74,255,0.25)] hover:border-[#f04aff] transition-all cursor-pointer shadow-lg hover:shadow-[0_0_18px_rgba(240,74,255,0.3)] group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-base">🎨</span>
                          <span className="text-white text-xs font-semibold uppercase group-hover:text-[#f04aff]">
                            Editing Room
                          </span>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[rgba(240,74,255,0.15)] text-[#f04aff] font-bold">
                          2 AGENTS
                        </span>
                      </div>
                      <div className="text-[10px] text-[#6492af] mt-1.5">
                        Timeline Editor · Cyberpunk Thumbnail · SFX
                      </div>
                      <div className="text-[10px] text-[#f04aff] mt-1 font-semibold flex items-center gap-1">
                        <span>● Status: 4K 60fps Storyboard Composited</span>
                      </div>
                    </div>

                    {/* Publishing Dept Card */}
                    <div
                      onClick={() => setActiveTab('publishing')}
                      className="p-3.5 rounded-xl bg-[#081522] border border-[rgba(0,245,160,0.25)] hover:border-[#00f5a0] transition-all cursor-pointer shadow-lg hover:shadow-[0_0_18px_rgba(0,245,160,0.3)] group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-base">🚀</span>
                          <span className="text-white text-xs font-semibold uppercase group-hover:text-[#00f5a0]">
                            Publishing Room
                          </span>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[rgba(0,245,160,0.15)] text-[#00f5a0] font-bold">
                          2 AGENTS
                        </span>
                      </div>
                      <div className="text-[10px] text-[#6492af] mt-1.5">
                        Auto-Scheduler · DM Responder · Multi-Platform
                      </div>
                      <div className="text-[10px] text-[#00f5a0] mt-1 font-semibold flex items-center gap-1">
                        <span>● Status: Trigger Keyword "CONTENT" Armed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Department Quick Stats Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-xl bg-[#081522] border border-[rgba(255,100,34,0.18)]">
                  <span className="text-[10px] text-[#6894b0] uppercase">Chief of Staff</span>
                  <div className="text-base sm:text-lg font-bold text-white mt-0.5">Zora (Agent 1)</div>
                  <span className="text-[9.5px] text-[#ff803b]">19 Delegated Agents</span>
                </div>

                <div className="p-3 rounded-xl bg-[#081522] border border-[rgba(255,100,34,0.18)]">
                  <span className="text-[10px] text-[#6894b0] uppercase">Knowledge Vault</span>
                  <div className="text-base sm:text-lg font-bold text-[#ffd13b] mt-0.5">Brand Brain</div>
                  <span className="text-[9.5px] text-[#00f5a0]">Real-time Sync</span>
                </div>

                <div className="p-3 rounded-xl bg-[#081522] border border-[rgba(255,100,34,0.18)]">
                  <span className="text-[10px] text-[#6894b0] uppercase">Viral Potential</span>
                  <div className="text-base sm:text-lg font-bold text-white mt-0.5">98.4 / 100</div>
                  <span className="text-[9.5px] text-[#00f5a0]">+450K Impressions</span>
                </div>

                <div className="p-3 rounded-xl bg-[#081522] border border-[rgba(255,100,34,0.18)]">
                  <span className="text-[10px] text-[#6894b0] uppercase">Autonomous Mode</span>
                  <div className="text-base sm:text-lg font-bold text-[#00f5a0] mt-0.5">ACTIVE SWARM</div>
                  <span className="text-[9.5px] text-[#6894b0]">Auto-Looping</span>
                </div>
              </div>
            </div>
          )}

          {/* 2. SPECIFIC DEPARTMENT DRILL-DOWNS */}
          {activeTab !== 'room' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#081522] border border-[rgba(255,100,34,0.25)] flex items-center justify-between">
                <div>
                  <h3 className="text-white text-base font-bold uppercase tracking-wider flex items-center gap-2">
                    <span>
                      {activeTab === 'chief'
                        ? '👑 CHIEF OF STAFF COMMAND'
                        : activeTab === 'brain'
                        ? '🧠 BRAND BRAIN KNOWLEDGE VAULT'
                        : activeTab === 'research'
                        ? '🛰️ RESEARCH & TREND SCOUT DEPT'
                        : activeTab === 'scripting'
                        ? '⚡ VIRAL SCRIPTING & HOOK DEPT'
                        : activeTab === 'editing'
                        ? '🎨 EDITING & THUMBNAIL STUDIO'
                        : '🚀 PUBLISHING & DISTRIBUTION DEPT'}
                    </span>
                  </h3>
                  <p className="text-[11px] text-[#6d96b0] mt-1">
                    Direct access to specialized sub-agents and their real-time production deliverables.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('room')}
                  className="px-3 py-1.5 rounded-lg border border-[rgba(255,100,34,0.4)] text-[#ff803b] hover:bg-[rgba(255,100,34,0.15)] text-xs font-semibold cursor-pointer"
                >
                  ← Back to Room
                </button>
              </div>

              {/* Agents in this department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {agents
                  .filter((a) => (activeTab === 'chief' || activeTab === 'brain' ? a.department === activeTab : a.department === activeTab))
                  .map((agent) => (
                    <div
                      key={agent.id}
                      onClick={() => setSelectedAgent(agent)}
                      className="p-4 rounded-xl bg-[#050f18] border border-[rgba(79,210,255,0.15)] hover:border-[#ff6422] transition-all cursor-pointer shadow-lg space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{agent.avatar}</span>
                          <div>
                            <div className="text-white font-bold text-xs">{agent.name}</div>
                            <div className="text-[9.5px] text-[#6d97b3]">{agent.role}</div>
                          </div>
                        </div>
                        <span className="text-[9px] px-2 py-0.5 rounded bg-[rgba(0,245,160,0.15)] text-[#00f5a0] font-bold">
                          {agent.status}
                        </span>
                      </div>

                      <div className="text-[10.5px] text-[#9fc0d8] bg-[#02070c] p-2 rounded-lg border border-[rgba(79,210,255,0.08)]">
                        <b className="text-[#ffd13b]">Task:</b> {agent.task}
                      </div>

                      <div className="text-[10px] text-[#4fd2ff] bg-[rgba(79,210,255,0.08)] p-2 rounded-lg border border-[rgba(79,210,255,0.12)] font-mono">
                        <b className="text-white">Output Preview:</b> "{agent.outputPreview}"
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-[#55829e] pt-1 border-t border-[rgba(79,210,255,0.08)]">
                        <span>{agent.metricLabel}:</span>
                        <b className="text-[#00f5a0]">{agent.metricValue}</b>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Live Autonomous Delegation Activity Logs */}
          <div className="p-3.5 rounded-xl bg-[#081522] border border-[rgba(255,100,34,0.18)] space-y-2">
            <div className="flex items-center justify-between border-b border-[rgba(255,100,34,0.1)] pb-1.5">
              <span className="text-[11px] font-semibold text-white tracking-wider uppercase flex items-center gap-2">
                <span>⚡ REAL-TIME MULTI-AGENT SWARM AUDIT FEED</span>
              </span>
              <span className="text-[9.5px] text-[#00f5a0] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f5a0] animate-ping" />
                Live Sync
              </span>
            </div>

            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1 text-[10px]">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="p-2 rounded-lg bg-[#050f18] border border-[rgba(255,100,34,0.08)] flex items-start justify-between gap-3"
                >
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[#55819c] font-mono text-[9px]">{log.time}</span>
                      <b className="text-white text-[10px]">{log.agent}</b>
                      <span className="text-[8.5px] px-1.5 py-0.2 rounded bg-[rgba(255,100,34,0.15)] text-[#ff803b] border border-[rgba(255,100,34,0.3)] font-semibold">
                        {log.department}
                      </span>
                    </div>
                    <p className="text-[9.5px] text-[#a1c6df] leading-relaxed">{log.message}</p>
                  </div>
                  {log.badge && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[rgba(0,245,160,0.15)] text-[#00f5a0] border border-[rgba(0,245,160,0.3)] font-bold whitespace-nowrap">
                      {log.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Interactive Navigation Bar (Exact match to monitor in video: Room | Chief | Brain | Research | Scripting | Editing | Publishing) */}
        <div className="px-4 py-2.5 sm:px-6 bg-[#04090f] border-t border-[rgba(255,100,34,0.2)] flex items-center justify-between overflow-x-auto gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {(
              [
                { id: 'room', label: 'Room', icon: '🏛️' },
                { id: 'chief', label: 'Chief', icon: '👑' },
                { id: 'brain', label: 'Brain', icon: '🧠' },
                { id: 'research', label: 'Research', icon: '🛰️' },
                { id: 'scripting', label: 'Scripting', icon: '⚡' },
                { id: 'editing', label: 'Editing', icon: '🎨' },
                { id: 'publishing', label: 'Publishing', icon: '🚀' },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer whitespace-nowrap border flex items-center gap-1.5 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-[#ff5522] to-[#ff7a18] text-[#140801] border-[#ff7a18] shadow-[0_0_12px_rgba(255,100,34,0.5)] font-bold'
                    : 'bg-[#081522] border-[rgba(255,100,34,0.15)] text-[#6d96b0] hover:text-white hover:border-[#ff803b]'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="text-[10px] text-[#6d96b0] whitespace-nowrap hidden md:block">
            Autonomous Multi-Agent Architecture · 19 Sub-Agents Active
          </div>
        </div>
      </div>
    </div>
  );
};

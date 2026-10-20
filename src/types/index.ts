export type MoodType =
  | 'idle'
  | 'listening'
  | 'thinking'
  | 'speaking'
  | 'happy'
  | 'excited'
  | 'sad'
  | 'angry'
  | 'surprised'
  | 'calm'
  | 'neutral';

export interface MoodConfig {
  core: [number, number, number];
  amt: number;
  label: string;
}

export interface SentimentResult {
  mood: MoodType;
  score: number; // 0 - 1
  valence: 'positive' | 'negative' | 'neutral' | 'surprise' | 'calm';
  detectedKeywords: string[];
  label: string;
  isExcited?: boolean;
}

export interface BiometricHeartState {
  bpm: number;
  targetBpm: number;
  pulse: number; // 0..1 instantaneous pulse amplitude
  phase: number; // 0..1 cardiac phase
  stateLabel: string;
  isElevated: boolean;
}

export interface TradingPosition {
  id: string;
  pair: string;
  type: 'LONG' | 'SHORT';
  entryPrice: number;
  currentPrice: number;
  amount: number;
  pnl: number;
  pnlPercent: number;
  timestamp: number;
  status: 'OPEN' | 'CLOSED';
}

export interface TradeOrderLog {
  id: string;
  time: string;
  pair: string;
  type: 'BUY' | 'SELL' | 'TAKE_PROFIT' | 'STOP_LOSS';
  price: number;
  amount: number;
  profit?: number;
  reason: string;
  sentimentTrigger: string;
}

export interface ChartTradeMarker {
  id: string;
  index: number;
  price: number;
  type: 'BUY' | 'SELL';
  time: string;
  profit?: number;
  label: string;
}

export interface AutoAnalysisItem {
  id: string;
  time: string;
  pair: string;
  analysis: string;
  signal: 'BUY_SIGNAL' | 'SELL_SIGNAL' | 'HOLD' | 'PROFIT_TAKE';
  confidence: number;
  timestamp?: number;
  sentimentScore?: number;
}

export interface MarketPairData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  rsi: number;
  macd: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  history: number[];
  markers?: ChartTradeMarker[];
}

export interface ThemeConfig {
  id: string;
  name: string;
  accent: [number, number, number];
  core: [number, number, number];
}

export interface CharacterConfig {
  id: string;
  name: string;
  head?: { cx: number; cy: number; cz: number; rx: number; ry: number; rz: number };
  jaw?: number;
  brow?: number;
  hair?: { n: number; r: number; lift: number; style: 'bob' | 'long' } | null;
  shoulders?: number;
  waist?: number;
  eyes?: { y: number; x: number; r: number; glow: number };
  rings?: number;
  armor?: number;
  src?: string;
  view?: {
    step?: number;
    scale?: number;
    y?: number;
    gain?: number;
    cutBg?: boolean;
    bgTol?: number;
    bgLum?: number;
  };
}

export interface Scene {
  caption: string;
  narration: string;
}

export interface YtPlan {
  title: string;
  description: string;
  tags: string[];
  thumbnailText: string;
  scenes: Scene[];
  note?: string;
}

export interface ContentPlan {
  hooks: string[];
  script: { t: number; line: string }[];
  caption: string;
  hashtags: string[];
  cta: string;
  thumbnailText: string;
  bestTime: string;
  whyItWorks: string;
}

export interface TopicResearch {
  id: string;
  title: string;
  category: string;
  hook: string;
  summary: string;
  angle: string;
  viralPotential: number; // 1-100
  searchKeywords: string[];
  facts: string[];
  targetAudience: string;
  whyTrending: string;
}

export type WorkflowStep =
  | 'idle'
  | 'researching'
  | 'scripting'
  | 'voicing'
  | 'rendering'
  | 'uploading'
  | 'completed'
  | 'error';

export interface WorkflowJob {
  id: string;
  timestamp: number;
  niche: string;
  topic: string;
  status: WorkflowStep;
  progress: number; // 0 - 100
  research?: TopicResearch;
  plan?: YtPlan;
  videoUrl?: string;
  thumbUrl?: string;
  youtubeId?: string;
  youtubeUrl?: string;
  privacyStatus?: 'public' | 'unlisted' | 'private';
  error?: string;
}

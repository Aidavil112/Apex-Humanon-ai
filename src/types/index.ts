export type MoodType = 'idle' | 'listening' | 'thinking' | 'speaking';

export interface MoodConfig {
  core: [number, number, number];
  amt: number;
  label: string;
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

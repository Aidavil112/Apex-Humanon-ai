import { MoodType, SentimentResult } from '../types';

interface EmotionPattern {
  words: string[];
  weight: number;
}

const EXCITED_LEXICON: EmotionPattern[] = [
  {
    words: [
      'excited', 'exciting', 'excitement', 'pump', 'pumping', 'pumped',
      'moon', 'mooning', 'bullish', 'jacked', 'hyped', 'hype', 'thrilled',
      'boom', 'lets go', "let's go", 'letsgo', 'super happy', 'super excited',
      'crazy good', 'ath', 'all time high', 'profit', 'profiting', 'big win',
      'huge win', 'epic', 'wild', 'electric', 'rally', 'breakout', 'trading bot',
      'algo bot', 'trade', 'crypto', 'bitcoin', 'btc', 'solana', 'sol', 'buy buy',
      // Hinglish / Hindi
      'utsahit', 'utsah', 'josh', 'dhamaka', 'bawal', 'faad diya', 'toofan',
      'chha gaye', 'ekdam mast', 'zabardast'
    ],
    weight: 1.35,
  },
  {
    words: ['🚀', '📈', '🔥', '⚡', '🤑', '🤩', '💎', '🙌', '🎉', '💥'],
    weight: 1.4,
  },
];

const HAPPY_LEXICON: EmotionPattern[] = [
  {
    words: [
      'happy', 'glad', 'joy', 'joyful', 'awesome', 'great', 'wonderful',
      'amazing', 'love', 'loved', 'loving', 'excellent', 'fantastic',
      'brilliant', 'delight', 'delighted', 'pleased', 'superb',
      'cool', 'perfect', 'yay', 'hooray', 'haha', 'hehe', 'lol', 'lmao',
      'sweet', 'good', 'nice', 'best', 'proud', 'blessed', 'celebrate',
      'grateful', 'thank', 'thanks', 'congrats', 'congratulations', 'terrific',
      'marvelous', 'fabulous', 'sunshine', 'fun', 'win', 'winning', 'winner',
      // Hinglish / Hindi Romanized
      'khush', 'khushi', 'badhiya', 'mast', 'shandar', 'achha',
      'achhi', 'sundar', 'pyar', 'sukhi', 'anand', 'badiya', 'dhanyawad',
      'shukriya', 'shabash', 'maja', 'maza'
    ],
    weight: 1.0,
  },
  {
    words: [':)', ':-)', ':d', ':-d', '<3', '❤️', '😊', '😃', '😄', '😁', '🥰', '✨'],
    weight: 1.2,
  },
];

const ANGRY_LEXICON: EmotionPattern[] = [
  {
    words: [
      'angry', 'mad', 'furious', 'rage', 'hate', 'hated', 'hating', 'annoyed',
      'annoying', 'irritate', 'irritated', 'pissed', 'stupid', 'idiot', 'fool',
      'dumb', 'trash', 'garbage', 'worst', 'terrible', 'horrible', 'awful',
      'shut up', 'shutup', 'nonsense', 'useless', 'disgust', 'disgusting',
      'offensive', 'bastard', 'hell', 'damn', 'crap', 'bullshit', 'sucks',
      'suck', 'broken', 'failure', 'fail', 'fraud', 'liar', 'scam', 'stop it',
      // Hinglish / Hindi Romanized
      'gussa', 'krodh', 'pagal', 'gadha', 'bakwaas', 'bekar', 'bewakoof',
      'kamina', 'chup', 'chutiya', 'ghatia', 'kharab', 'barbaad', 'jala'
    ],
    weight: 1.1,
  },
  {
    words: ['>:(', '>:-(', '😡', '🤬', '👿', '🖕', '💢', '😠'],
    weight: 1.3,
  },
];

const SAD_LEXICON: EmotionPattern[] = [
  {
    words: [
      'sad', 'unhappy', 'depressed', 'depressing', 'depression', 'sorrow',
      'crying', 'cry', 'cried', 'tears', 'heartbroken', 'heartbreak', 'lonely',
      'alone', 'hurt', 'hurting', 'pain', 'painful', 'grief', 'miserable',
      'hopeless', 'despair', 'gloomy', 'down', 'miss', 'missed', 'loss',
      'lost', 'sorry', 'apologize', 'pity', 'tragic', 'tragedy', 'unfortunate',
      'regret', 'mourn', 'suffer', 'suffering',
      // Hinglish / Hindi Romanized
      'udas', 'udasi', 'dukh', 'dukhi', 'dard', 'rona', 'ro raha', 'afsos',
      'bechara', 'dardnak', 'pareshan', 'tanha', 'tanhai', 'chot'
    ],
    weight: 1.0,
  },
  {
    words: [':(', ':-(', ':\'(', '😢', '😭', '💔', '😞', '😔', '🥺', '☹️'],
    weight: 1.2,
  },
];

const SURPRISED_LEXICON: EmotionPattern[] = [
  {
    words: [
      'wow', 'whoa', 'woah', 'omg', 'surprise', 'surprised', 'shock', 'shocked',
      'unbelievable', 'impossible', 'insane', 'crazy', 'really', 'seriously',
      'unreal', 'stunning', 'astounding', 'astonishing', 'jawdropping',
      'unexpected', 'wait what', 'what?!', 'no way',
      // Hinglish / Hindi Romanized
      'arre', 'baap re', 'kya baat', 'sach me', 'hairan', 'chamatkar', 'gajab', 'gazab'
    ],
    weight: 1.0,
  },
  {
    words: [':o', ':-o', '😲', '😮', '🤯', '😱', '👀', '⁉️'],
    weight: 1.2,
  },
];

const CALM_LEXICON: EmotionPattern[] = [
  {
    words: [
      'calm', 'peace', 'peaceful', 'serene', 'serenity', 'relax', 'relaxed',
      'relaxing', 'chill', 'chilling', 'soothe', 'soothing', 'tranquil',
      'meditation', 'meditate', 'zen', 'gentle', 'quiet', 'still', 'smooth',
      'breathe', 'breath', 'rest', 'comfortable', 'soft', 'cozy',
      // Hinglish / Hindi Romanized
      'shanti', 'sukoon', 'aram', 'thanda', 'chain', 'itminaan', 'santusht'
    ],
    weight: 1.0,
  },
  {
    words: ['😌', '🧘', '🕊️', '🍃', '🌊'],
    weight: 1.1,
  },
];

const NEGATION_WORDS = new Set([
  'not', 'no', 'never', 'neither', 'hardly', 'barely', 'scarcely',
  'nah', 'nahi', 'mat', 'na', 'don\'t', 'dont', 'didn\'t', 'didnt',
  'won\'t', 'wont', 'can\'t', 'cant', 'isn\'t', 'isnt'
]);

/**
 * Fast client-side sentiment analysis function that tokenizes user input,
 * accounts for negations and punctuation intensity, and maps to the optimal
 * character mood tone.
 */
export function analyzeSentiment(rawText: string): SentimentResult {
  if (!rawText || !rawText.trim()) {
    return {
      mood: 'neutral',
      score: 1.0,
      valence: 'neutral',
      detectedKeywords: [],
      label: 'neutral',
    };
  }

  const text = rawText.toLowerCase();

  // Exclamation and shouting boost
  const exclamationCount = (rawText.match(/!/g) || []).length;
  const isCaps = rawText.length > 5 && rawText === rawText.toUpperCase() && /[A-Z]/.test(rawText);
  const intensityMultiplier = 1.0 + Math.min(0.5, exclamationCount * 0.15) + (isCaps ? 0.35 : 0.0);

  // Split tokens (keeping words and simple emoticons)
  const tokens = text
    .replace(/[.,;?]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

  const scores: Record<'excited' | 'happy' | 'angry' | 'sad' | 'surprised' | 'calm', number> = {
    excited: 0,
    happy: 0,
    angry: 0,
    sad: 0,
    surprised: 0,
    calm: 0,
  };

  const matchedKeywords: Record<string, string[]> = {
    excited: [],
    happy: [],
    angry: [],
    sad: [],
    surprised: [],
    calm: [],
  };

  const evaluateCategory = (
    category: 'excited' | 'happy' | 'angry' | 'sad' | 'surprised' | 'calm',
    lexicon: EmotionPattern[]
  ) => {
    for (const pattern of lexicon) {
      for (const phrase of pattern.words) {
        // Multi-word phrase check in raw text
        if (phrase.includes(' ')) {
          if (text.includes(phrase)) {
            scores[category] += pattern.weight * 1.5 * intensityMultiplier;
            matchedKeywords[category].push(phrase);
          }
          continue;
        }

        // Single word token check
        for (let i = 0; i < tokens.length; i++) {
          const token = tokens[i];
          if (token === phrase || (token.length > 4 && phrase.length > 4 && token.startsWith(phrase))) {
            // Check preceding 1-2 tokens for negation
            const hasNegation =
              (i > 0 && NEGATION_WORDS.has(tokens[i - 1])) ||
              (i > 1 && NEGATION_WORDS.has(tokens[i - 2]));

            if (hasNegation) {
              // Negating happy/excited -> sadness/frustration; negating sad/angry -> relief/calm
              if (category === 'happy' || category === 'excited') {
                scores.sad += pattern.weight * 0.8;
                matchedKeywords.sad.push(`not ${phrase}`);
              } else if (category === 'angry' || category === 'sad') {
                scores.calm += pattern.weight * 0.7;
                matchedKeywords.calm.push(`not ${phrase}`);
              }
            } else {
              scores[category] += pattern.weight * intensityMultiplier;
              matchedKeywords[category].push(phrase);
            }
          }
        }
      }
    }
  };

  evaluateCategory('excited', EXCITED_LEXICON);
  evaluateCategory('happy', HAPPY_LEXICON);
  evaluateCategory('angry', ANGRY_LEXICON);
  evaluateCategory('sad', SAD_LEXICON);
  evaluateCategory('surprised', SURPRISED_LEXICON);
  evaluateCategory('calm', CALM_LEXICON);

  // If question with strong curiosity, boost surprise / neutral
  if (rawText.includes('?') && scores.surprised > 0) {
    scores.surprised *= 1.25;
  }

  // Find dominant emotion
  let dominantMood: MoodType = 'neutral';
  let maxScore = 0;

  const categories: ('excited' | 'happy' | 'angry' | 'sad' | 'surprised' | 'calm')[] = [
    'excited',
    'happy',
    'angry',
    'sad',
    'surprised',
    'calm',
  ];

  for (const cat of categories) {
    if (scores[cat] > maxScore) {
      maxScore = scores[cat];
      dominantMood = cat;
    }
  }

  // Fallback to neutral if below threshold
  if (maxScore < 0.65) {
    dominantMood = 'neutral';
  }

  const confidence = maxScore > 0 ? Math.min(0.98, Math.max(0.65, maxScore / 2.5)) : 1.0;

  const valenceMap: Record<MoodType, SentimentResult['valence']> = {
    excited: 'positive',
    happy: 'positive',
    calm: 'calm',
    surprised: 'surprise',
    angry: 'negative',
    sad: 'negative',
    neutral: 'neutral',
    idle: 'neutral',
    listening: 'neutral',
    thinking: 'neutral',
    speaking: 'neutral',
  };

  const isExcitedOrHappy = dominantMood === 'excited' || dominantMood === 'happy' || scores.excited > 0.8;

  return {
    mood: dominantMood,
    score: parseFloat(confidence.toFixed(2)),
    valence: valenceMap[dominantMood] || 'neutral',
    detectedKeywords: dominantMood === 'neutral' ? [] : matchedKeywords[dominantMood as keyof typeof matchedKeywords] || [],
    label: dominantMood,
    isExcited: isExcitedOrHappy,
  };
}

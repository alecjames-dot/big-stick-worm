export interface GameResult {
  xpGained: number;
  moodBoost: number;
  score: number;
  won: boolean;
}

export interface GameProps {
  onComplete: (result: GameResult) => void;
  onExit: () => void;
}

export type GameId = 'wiggle-race' | 'bug-catch' | 'memory-munch';

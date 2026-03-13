// ─── Domain Types (for analytics, dashboards, future backend) ─

export interface PlayerProfile {
  id: string;
  username: string;
  elo: number;
  tier: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  winRate: number;
  avgGameDuration: number;
  favoriteOpening: string;
  joinedAt: string;
}

export interface MatchSummary {
  id: string;
  goldPlayer: string;
  silverPlayer: string;
  winner: 'gold' | 'silver' | 'draw';
  reason: string;
  turns: number;
  duration: number;
  date: string;
  goldElo: number;
  silverElo: number;
}

export interface PieceStats {
  type: string;
  captures: number;
  losses: number;
  avgSurvivalTurns: number;
  usageRate: number;
}

export interface DashboardMetrics {
  totalMatches: number;
  avgDuration: number;
  avgTurns: number;
  goldWinRate: number;
  silverWinRate: number;
  drawRate: number;
  pressUsageRate: number;
  avgPressesPerGame: number;
  topOpenings: { name: string; count: number; winRate: number }[];
  dailyMatches: { date: string; count: number }[];
  pieceStats: PieceStats[];
  eloBrackets: { bracket: string; players: number }[];
  retentionByDay: { day: number; rate: number }[];
}

export interface AnalyticsEvent {
  id: string;
  type: string;
  timestamp: string;
  playerId: string;
  matchId?: string;
  data: Record<string, unknown>;
}

export type GameMode =
  | 'local'
  | 'vsAI'
  | 'ranked'
  | 'casual'
  | 'custom';

export interface GameSettings {
  mode: GameMode;
  timeControl?: number;
  aiDifficulty?: 'easy' | 'medium' | 'hard';
}

import type {
  PlayerProfile,
  MatchSummary,
  DashboardMetrics,
} from './types';

// ─── Mock Player Profiles ─────────────────────────────────────

export const MOCK_PLAYERS: PlayerProfile[] = [
  {
    id: 'p1',
    username: 'Leônidas',
    elo: 1542,
    tier: 'Ouro',
    gamesPlayed: 127,
    wins: 72,
    losses: 48,
    draws: 7,
    winRate: 56.7,
    avgGameDuration: 18.3,
    favoriteOpening: 'Avanço Central',
    joinedAt: '2025-09-15',
  },
  {
    id: 'p2',
    username: 'Atena',
    elo: 1680,
    tier: 'Platina',
    gamesPlayed: 203,
    wins: 128,
    losses: 64,
    draws: 11,
    winRate: 63.1,
    avgGameDuration: 22.1,
    favoriteOpening: 'Falange Dupla',
    joinedAt: '2025-08-01',
  },
  {
    id: 'p3',
    username: 'Themístocles',
    elo: 1390,
    tier: 'Prata',
    gamesPlayed: 84,
    wins: 38,
    losses: 41,
    draws: 5,
    winRate: 45.2,
    avgGameDuration: 15.7,
    favoriteOpening: 'Investida Rápida',
    joinedAt: '2025-11-20',
  },
  {
    id: 'p4',
    username: 'Aspásia',
    elo: 1815,
    tier: 'Diamante',
    gamesPlayed: 312,
    wins: 210,
    losses: 87,
    draws: 15,
    winRate: 67.3,
    avgGameDuration: 25.4,
    favoriteOpening: 'Tempestade de Tempo',
    joinedAt: '2025-07-10',
  },
  {
    id: 'p5',
    username: 'Péricles',
    elo: 1455,
    tier: 'Ouro',
    gamesPlayed: 95,
    wins: 50,
    losses: 40,
    draws: 5,
    winRate: 52.6,
    avgGameDuration: 19.8,
    favoriteOpening: 'Avanço Central',
    joinedAt: '2025-10-05',
  },
];

// ─── Mock Match History ───────────────────────────────────────

export const MOCK_MATCHES: MatchSummary[] = [
  {
    id: 'm1', goldPlayer: 'Leônidas', silverPlayer: 'Atena',
    winner: 'silver', reason: 'Arconte capturado', turns: 34,
    duration: 22, date: '2026-03-13', goldElo: 1542, silverElo: 1680,
  },
  {
    id: 'm2', goldPlayer: 'Aspásia', silverPlayer: 'Themístocles',
    winner: 'gold', reason: 'Arconte capturado', turns: 18,
    duration: 12, date: '2026-03-13', goldElo: 1815, silverElo: 1390,
  },
  {
    id: 'm3', goldPlayer: 'Péricles', silverPlayer: 'Leônidas',
    winner: 'gold', reason: 'Abandono', turns: 27,
    duration: 19, date: '2026-03-12', goldElo: 1455, silverElo: 1542,
  },
  {
    id: 'm4', goldPlayer: 'Atena', silverPlayer: 'Aspásia',
    winner: 'draw', reason: 'Material insuficiente', turns: 52,
    duration: 38, date: '2026-03-12', goldElo: 1680, silverElo: 1815,
  },
  {
    id: 'm5', goldPlayer: 'Themístocles', silverPlayer: 'Péricles',
    winner: 'silver', reason: 'Arconte capturado', turns: 41,
    duration: 28, date: '2026-03-11', goldElo: 1390, silverElo: 1455,
  },
  {
    id: 'm6', goldPlayer: 'Leônidas', silverPlayer: 'Aspásia',
    winner: 'silver', reason: 'Arconte capturado', turns: 30,
    duration: 21, date: '2026-03-11', goldElo: 1542, silverElo: 1815,
  },
  {
    id: 'm7', goldPlayer: 'Atena', silverPlayer: 'Themístocles',
    winner: 'gold', reason: 'Arconte capturado', turns: 25,
    duration: 17, date: '2026-03-10', goldElo: 1680, silverElo: 1390,
  },
  {
    id: 'm8', goldPlayer: 'Péricles', silverPlayer: 'Atena',
    winner: 'silver', reason: 'Arconte capturado', turns: 38,
    duration: 26, date: '2026-03-10', goldElo: 1455, silverElo: 1680,
  },
];

// ─── Mock Dashboard Metrics ───────────────────────────────────

export const MOCK_DASHBOARD: DashboardMetrics = {
  totalMatches: 1247,
  avgDuration: 19.4,
  avgTurns: 31.6,
  goldWinRate: 52.3,
  silverWinRate: 43.1,
  drawRate: 4.6,
  pressUsageRate: 73.8,
  avgPressesPerGame: 8.4,
  topOpenings: [
    { name: 'Avanço Central', count: 412, winRate: 54.2 },
    { name: 'Falange Dupla', count: 287, winRate: 51.8 },
    { name: 'Investida Rápida', count: 198, winRate: 48.5 },
    { name: 'Tempestade de Tempo', count: 156, winRate: 55.1 },
    { name: 'Arco Defensivo', count: 134, winRate: 46.3 },
  ],
  dailyMatches: [
    { date: '07/03', count: 142 },
    { date: '08/03', count: 168 },
    { date: '09/03', count: 155 },
    { date: '10/03', count: 189 },
    { date: '11/03', count: 201 },
    { date: '12/03', count: 178 },
    { date: '13/03', count: 214 },
  ],
  pieceStats: [
    { type: 'Arconte', captures: 0, losses: 897, avgSurvivalTurns: 28.3, usageRate: 100 },
    { type: 'Strategos', captures: 1.8, losses: 0.6, avgSurvivalTurns: 24.1, usageRate: 94.2 },
    { type: 'Hoplita', captures: 0.9, losses: 0.7, avgSurvivalTurns: 21.8, usageRate: 88.5 },
    { type: 'Toxotes', captures: 1.4, losses: 0.8, avgSurvivalTurns: 19.6, usageRate: 91.3 },
    { type: 'Hippeus', captures: 1.6, losses: 0.9, avgSurvivalTurns: 16.4, usageRate: 86.7 },
    { type: 'Doríforo', captures: 0.5, losses: 1.2, avgSurvivalTurns: 12.7, usageRate: 78.4 },
  ],
  eloBrackets: [
    { bracket: 'Bronze (0-999)', players: 823 },
    { bracket: 'Prata (1000-1299)', players: 1456 },
    { bracket: 'Ouro (1300-1599)', players: 2104 },
    { bracket: 'Platina (1600-1899)', players: 987 },
    { bracket: 'Diamante (1900-2199)', players: 342 },
    { bracket: 'Kairós (2200+)', players: 48 },
  ],
  retentionByDay: [
    { day: 1, rate: 68 },
    { day: 3, rate: 45 },
    { day: 7, rate: 32 },
    { day: 14, rate: 24 },
    { day: 30, rate: 18 },
    { day: 60, rate: 12 },
    { day: 90, rate: 9 },
  ],
};

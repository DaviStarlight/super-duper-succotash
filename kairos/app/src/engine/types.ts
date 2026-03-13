// ─── Core Game Types ──────────────────────────────────────────

export type Player = 'gold' | 'silver';

export type PieceType =
  | 'archon'
  | 'strategos'
  | 'hoplite'
  | 'toxotes'
  | 'hippeus'
  | 'doryphoros';

export interface Position {
  row: number; // 0 = rank 1 (gold home row), 7 = rank 8 (silver home row)
  col: number; // 0 = file a, 7 = file h
}

export interface Piece {
  type: PieceType;
  owner: Player;
  exhausted: boolean;
}

export type Board = (Piece | null)[][];

// ─── Move Types ───────────────────────────────────────────────

export type MoveKind = 'move' | 'capture' | 'rangedCapture';

export interface MoveTarget {
  pos: Position;
  kind: MoveKind;
}

// ─── Turn Phases ──────────────────────────────────────────────

export type TurnPhase =
  | 'mainMove'
  | 'charge'
  | 'promotion'
  | 'pressDecision'
  | 'pressMove'
  | 'chargeAfterPress'
  | 'promotionAfterPress'
  | 'gameOver';

// ─── Move History ─────────────────────────────────────────────

export interface MoveRecord {
  player: Player;
  pieceType: PieceType;
  from: Position;
  to: Position;
  kind: MoveKind;
  captured?: PieceType;
  promotion?: PieceType;
  isPress: boolean;
  chargeFrom?: Position;
  chargeTo?: Position;
  chargeCaptured?: PieceType;
}

// ─── Game Result ──────────────────────────────────────────────

export interface GameResult {
  winner?: Player;
  isDraw: boolean;
  reason: string;
}

// ─── Piece Metadata ───────────────────────────────────────────

export const PIECE_NAMES: Record<PieceType, string> = {
  archon: 'Arconte',
  strategos: 'Strategos',
  hoplite: 'Hoplita',
  toxotes: 'Toxotes',
  hippeus: 'Hippeus',
  doryphoros: 'Doríforo',
};

export const PIECE_ABBREV: Record<PieceType, string> = {
  archon: 'Ar',
  strategos: 'St',
  hoplite: 'Ho',
  toxotes: 'To',
  hippeus: 'Hi',
  doryphoros: 'Do',
};

export const PROMOTABLE_TYPES: PieceType[] = [
  'strategos',
  'hoplite',
  'toxotes',
  'hippeus',
];

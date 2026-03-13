import { create } from 'zustand';
import type {
  Board, Piece, Player, PieceType, Position,
  MoveTarget, MoveKind, TurnPhase, MoveRecord, GameResult,
} from '../engine/types';
import {
  createInitialBoard, cloneBoard, posEqual, boardHash,
  getLastRank, otherPlayer,
} from '../engine/board';
import { getMovesForPiece, hasAnyLegalMove, canPlayerPress } from '../engine/moves';
import { getChargeTargets, hasInsufficientMaterial } from '../engine/abilities';

// ─── Store Interface ──────────────────────────────────────────

interface GameStore {
  board: Board;
  currentPlayer: Player;
  turnNumber: number;
  turnPhase: TurnPhase;

  mainMoveActorPos: Position | null;
  chargePos: Position | null;
  promotionPos: Position | null;

  moves: MoveRecord[];
  capturedByGold: PieceType[];
  capturedBySilver: PieceType[];

  halfMoveClock: number;
  positionHashes: string[];
  result: GameResult | null;

  selectedPos: Position | null;
  validMoves: MoveTarget[];
  chargeTargets: Position[];
  canPress: boolean;

  clickSquare: (row: number, col: number) => void;
  startPress: () => void;
  endTurn: () => void;
  promote: (type: PieceType) => void;
  skipCharge: () => void;
  newGame: () => void;
  resign: () => void;
}

// ─── Store Implementation ─────────────────────────────────────

function initialState() {
  return {
    board: createInitialBoard(),
    currentPlayer: 'gold' as Player,
    turnNumber: 1,
    turnPhase: 'mainMove' as TurnPhase,
    mainMoveActorPos: null as Position | null,
    chargePos: null as Position | null,
    promotionPos: null as Position | null,
    moves: [] as MoveRecord[],
    capturedByGold: [] as PieceType[],
    capturedBySilver: [] as PieceType[],
    halfMoveClock: 0,
    positionHashes: [] as string[],
    result: null as GameResult | null,
    selectedPos: null as Position | null,
    validMoves: [] as MoveTarget[],
    chargeTargets: [] as Position[],
    canPress: false,
  };
}

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState(),

  // ─── Click Handler ────────────────────────────────────────
  clickSquare: (row: number, col: number) => {
    const s = get();
    const clicked: Position = { row, col };

    // Ignore clicks during non-interactive phases
    if (
      s.turnPhase === 'gameOver' ||
      s.turnPhase === 'pressDecision' ||
      s.turnPhase === 'promotion' ||
      s.turnPhase === 'promotionAfterPress'
    ) {
      return;
    }

    // ── Charge Phase ──
    if (s.turnPhase === 'charge' || s.turnPhase === 'chargeAfterPress') {
      const target = s.chargeTargets.find(t => posEqual(t, clicked));
      if (target) {
        executeCharge(set, get, clicked);
      }
      return;
    }

    // ── Main Move / Press Move ──
    if (s.turnPhase === 'mainMove' || s.turnPhase === 'pressMove') {
      // If we have a selected piece and click a valid target → execute
      if (s.selectedPos) {
        const validMove = s.validMoves.find(m => posEqual(m.pos, clicked));
        if (validMove) {
          executeMove(set, get, clicked, validMove.kind);
          return;
        }
      }

      // Try to select a piece
      const piece = s.board[row][col];
      if (piece && piece.owner === s.currentPlayer && !piece.exhausted) {
        // Press restrictions
        if (s.turnPhase === 'pressMove') {
          if (piece.type === 'archon') return;
          if (s.mainMoveActorPos && posEqual(clicked, s.mainMoveActorPos)) return;
        }

        const moves = getMovesForPiece(s.board, clicked);
        if (moves.length > 0) {
          set({ selectedPos: clicked, validMoves: moves });
          return;
        }
      }

      // Deselect
      set({ selectedPos: null, validMoves: [] });
    }
  },

  // ─── Press / End Turn ─────────────────────────────────────
  startPress: () => {
    const s = get();
    if (s.turnPhase !== 'pressDecision' || !s.canPress) return;
    set({ turnPhase: 'pressMove', selectedPos: null, validMoves: [] });
  },

  endTurn: () => {
    const s = get();
    if (s.turnPhase !== 'pressDecision') return;
    finishTurn(set, get, s.board);
  },

  // ─── Promotion ────────────────────────────────────────────
  promote: (type: PieceType) => {
    const s = get();
    if (s.turnPhase !== 'promotion' && s.turnPhase !== 'promotionAfterPress') return;
    if (type === 'archon') return;

    const board = cloneBoard(s.board);
    const pos = s.promotionPos!;
    const isAfterPress = s.turnPhase === 'promotionAfterPress';

    board[pos.row][pos.col] = {
      type,
      owner: s.currentPlayer,
      exhausted: isAfterPress,
    };

    // Update last move with promotion info
    const moves = [...s.moves];
    if (moves.length > 0) {
      moves[moves.length - 1] = { ...moves[moves.length - 1], promotion: type };
    }

    if (isAfterPress) {
      set({ board, promotionPos: null, moves });
      finishTurn(set, get, board);
    } else {
      const cp = s.canPress;
      const canPressNow = s.mainMoveActorPos
        ? canPlayerPress(board, s.currentPlayer, s.mainMoveActorPos)
        : false;
      set({
        board,
        promotionPos: null,
        turnPhase: 'pressDecision',
        moves,
        canPress: canPressNow,
      });
    }
  },

  // ─── Charge ───────────────────────────────────────────────
  skipCharge: () => {
    const s = get();
    if (s.turnPhase === 'charge') {
      const canPressNow = s.mainMoveActorPos
        ? canPlayerPress(s.board, s.currentPlayer, s.mainMoveActorPos)
        : false;
      set({
        chargePos: null,
        chargeTargets: [],
        turnPhase: 'pressDecision',
        canPress: canPressNow,
      });
    } else if (s.turnPhase === 'chargeAfterPress') {
      const board = cloneBoard(s.board);
      const cp = s.chargePos!;
      board[cp.row][cp.col]!.exhausted = true;
      set({ chargePos: null, chargeTargets: [] });
      finishTurn(set, get, board);
    }
  },

  // ─── New Game / Resign ────────────────────────────────────
  newGame: () => set(initialState()),

  resign: () => {
    const s = get();
    if (s.turnPhase === 'gameOver') return;
    set({
      turnPhase: 'gameOver',
      result: {
        winner: otherPlayer(s.currentPlayer),
        isDraw: false,
        reason: 'Abandono',
      },
      selectedPos: null,
      validMoves: [],
    });
  },
}));

// ─── Execute Move ─────────────────────────────────────────────

function executeMove(
  set: (s: Partial<GameStore>) => void,
  get: () => GameStore,
  targetPos: Position,
  kind: MoveKind,
) {
  const s = get();
  const board = cloneBoard(s.board);
  const from = s.selectedPos!;
  const piece = board[from.row][from.col]!;
  const isPress = s.turnPhase === 'pressMove';

  let captured: PieceType | undefined;
  let actorPos: Position;

  if (kind === 'rangedCapture') {
    // Toxotes ranged attack — piece stays, target removed
    const target = board[targetPos.row][targetPos.col]!;
    captured = target.type;
    board[targetPos.row][targetPos.col] = null;
    actorPos = from;
  } else {
    // Regular move or displacement capture
    if (kind === 'capture') {
      const target = board[targetPos.row][targetPos.col]!;
      captured = target.type;
    }
    board[targetPos.row][targetPos.col] = piece;
    board[from.row][from.col] = null;
    actorPos = targetPos;
  }

  // Build move record
  const record: MoveRecord = {
    player: s.currentPlayer,
    pieceType: piece.type,
    from,
    to: targetPos,
    kind,
    captured,
    isPress,
  };
  const moves = [...s.moves, record];

  // Track captures
  let capturedByGold = s.capturedByGold;
  let capturedBySilver = s.capturedBySilver;
  if (captured) {
    if (s.currentPlayer === 'gold') {
      capturedByGold = [...capturedByGold, captured];
    } else {
      capturedBySilver = [...capturedBySilver, captured];
    }
  }

  // Half-move clock (for 50-move rule)
  let halfMoveClock = s.halfMoveClock;
  if (captured || piece.type === 'doryphoros') {
    halfMoveClock = 0;
  } else if (!isPress) {
    halfMoveClock++;
  }

  // Check archon capture → victory
  if (captured === 'archon') {
    set({
      board,
      moves,
      capturedByGold,
      capturedBySilver,
      halfMoveClock,
      selectedPos: null,
      validMoves: [],
      turnPhase: 'gameOver',
      result: {
        winner: s.currentPlayer,
        isDraw: false,
        reason: 'Arconte capturado!',
      },
    });
    return;
  }

  // Check Hippeus capture → charge
  if (piece.type === 'hippeus' && kind === 'capture') {
    const targets = getChargeTargets(board, actorPos, s.currentPlayer);
    const nextPhase: TurnPhase = isPress ? 'chargeAfterPress' : 'charge';
    set({
      board,
      moves,
      capturedByGold,
      capturedBySilver,
      halfMoveClock,
      selectedPos: null,
      validMoves: [],
      chargePos: actorPos,
      chargeTargets: targets,
      turnPhase: nextPhase,
      mainMoveActorPos: isPress ? s.mainMoveActorPos : actorPos,
    });
    return;
  }

  // Check Doryphoros promotion
  if (piece.type === 'doryphoros' && actorPos.row === getLastRank(s.currentPlayer)) {
    const nextPhase: TurnPhase = isPress ? 'promotionAfterPress' : 'promotion';
    set({
      board,
      moves,
      capturedByGold,
      capturedBySilver,
      halfMoveClock,
      selectedPos: null,
      validMoves: [],
      promotionPos: actorPos,
      turnPhase: nextPhase,
      mainMoveActorPos: isPress ? s.mainMoveActorPos : actorPos,
    });
    return;
  }

  // Normal completion
  if (isPress) {
    // Exhaust pressed piece
    board[actorPos.row][actorPos.col]!.exhausted = true;
    set({
      board,
      moves,
      capturedByGold,
      capturedBySilver,
      halfMoveClock,
      selectedPos: null,
      validMoves: [],
    });
    finishTurn(set, get, board);
  } else {
    // Go to press decision
    const canPressNow = canPlayerPress(board, s.currentPlayer, actorPos);
    set({
      board,
      moves,
      capturedByGold,
      capturedBySilver,
      halfMoveClock,
      selectedPos: null,
      validMoves: [],
      turnPhase: 'pressDecision',
      mainMoveActorPos: actorPos,
      canPress: canPressNow,
    });
  }
}

// ─── Execute Charge ───────────────────────────────────────────

function executeCharge(
  set: (s: Partial<GameStore>) => void,
  get: () => GameStore,
  targetPos: Position,
) {
  const s = get();
  const board = cloneBoard(s.board);
  const from = s.chargePos!;
  const piece = board[from.row][from.col]!;
  const isAfterPress = s.turnPhase === 'chargeAfterPress';

  let chargeCaptured: PieceType | undefined;
  const target = board[targetPos.row][targetPos.col];
  if (target && target.owner !== s.currentPlayer) {
    chargeCaptured = target.type;
  }

  board[targetPos.row][targetPos.col] = piece;
  board[from.row][from.col] = null;

  // Update last move record with charge info
  const moves = [...s.moves];
  if (moves.length > 0) {
    const lastMove = { ...moves[moves.length - 1] };
    lastMove.chargeFrom = from;
    lastMove.chargeTo = targetPos;
    lastMove.chargeCaptured = chargeCaptured;
    moves[moves.length - 1] = lastMove;
  }

  // Update captured pieces
  let capturedByGold = s.capturedByGold;
  let capturedBySilver = s.capturedBySilver;
  if (chargeCaptured) {
    if (s.currentPlayer === 'gold') {
      capturedByGold = [...capturedByGold, chargeCaptured];
    } else {
      capturedBySilver = [...capturedBySilver, chargeCaptured];
    }
  }

  // Check archon capture via charge
  if (chargeCaptured === 'archon') {
    set({
      board,
      moves,
      capturedByGold,
      capturedBySilver,
      chargePos: null,
      chargeTargets: [],
      selectedPos: null,
      validMoves: [],
      turnPhase: 'gameOver',
      result: {
        winner: s.currentPlayer,
        isDraw: false,
        reason: 'Arconte capturado por Investida!',
      },
    });
    return;
  }

  if (isAfterPress) {
    // Exhaust the pressed piece (now at targetPos after charge)
    board[targetPos.row][targetPos.col]!.exhausted = true;
    set({
      board,
      moves,
      capturedByGold,
      capturedBySilver,
      chargePos: null,
      chargeTargets: [],
    });
    finishTurn(set, get, board);
  } else {
    // After main move charge → press decision
    const canPressNow = canPlayerPress(board, s.currentPlayer, targetPos);
    set({
      board,
      moves,
      capturedByGold,
      capturedBySilver,
      chargePos: null,
      chargeTargets: [],
      turnPhase: 'pressDecision',
      mainMoveActorPos: targetPos,
      canPress: canPressNow,
    });
  }
}

// ─── Finish Turn ──────────────────────────────────────────────

function finishTurn(
  set: (s: Partial<GameStore>) => void,
  get: () => GameStore,
  boardState?: Board,
) {
  const s = get();
  const board = boardState ? cloneBoard(boardState) : cloneBoard(s.board);
  const next = otherPlayer(s.currentPlayer);

  // Recovery: un-exhaust all of next player's pieces
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (p && p.owner === next && p.exhausted) {
        p.exhausted = false;
      }
    }
  }

  // Check insufficient material
  if (hasInsufficientMaterial(board)) {
    set({
      board,
      currentPlayer: next,
      turnPhase: 'gameOver',
      result: { isDraw: true, reason: 'Material insuficiente — empate' },
      selectedPos: null,
      validMoves: [],
    });
    return;
  }

  // Check stalemate
  if (!hasAnyLegalMove(board, next)) {
    set({
      board,
      currentPlayer: next,
      turnPhase: 'gameOver',
      result: { isDraw: true, reason: 'Sem movimentos legais — empate' },
      selectedPos: null,
      validMoves: [],
    });
    return;
  }

  // Check 50-move rule
  if (s.halfMoveClock >= 50) {
    set({
      board,
      currentPlayer: next,
      turnPhase: 'gameOver',
      result: { isDraw: true, reason: 'Regra dos 50 movimentos — empate' },
      selectedPos: null,
      validMoves: [],
    });
    return;
  }

  // Check triple repetition
  const hash = boardHash(board, next);
  const hashes = [...s.positionHashes, hash];
  const hashCount = hashes.filter(h => h === hash).length;
  if (hashCount >= 3) {
    set({
      board,
      currentPlayer: next,
      positionHashes: hashes,
      turnPhase: 'gameOver',
      result: { isDraw: true, reason: 'Repetição tripla — empate' },
      selectedPos: null,
      validMoves: [],
    });
    return;
  }

  // Advance turn
  const turnNumber = next === 'gold' ? s.turnNumber + 1 : s.turnNumber;

  set({
    board,
    currentPlayer: next,
    turnNumber,
    turnPhase: 'mainMove',
    mainMoveActorPos: null,
    chargePos: null,
    promotionPos: null,
    selectedPos: null,
    validMoves: [],
    chargeTargets: [],
    canPress: false,
    positionHashes: hashes,
  });
}

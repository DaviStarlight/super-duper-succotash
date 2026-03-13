import type { Board, Position, Player } from './types';
import { inBounds } from './board';

const ORTHO_DIRS: [number, number][] = [
  [-1, 0], [1, 0], [0, -1], [0, 1],
];

// ─── Shield Wall ──────────────────────────────────────────────
// Two allied Hoplites orthogonally adjacent = both immune to capture

export function isInShieldWall(board: Board, pos: Position): boolean {
  const piece = board[pos.row][pos.col];
  if (!piece || piece.type !== 'hoplite') return false;

  for (const [dr, dc] of ORTHO_DIRS) {
    const nr = pos.row + dr;
    const nc = pos.col + dc;
    if (inBounds(nr, nc)) {
      const neighbor = board[nr][nc];
      if (
        neighbor &&
        neighbor.type === 'hoplite' &&
        neighbor.owner === piece.owner
      ) {
        return true;
      }
    }
  }
  return false;
}

export function canBeCaptured(board: Board, pos: Position): boolean {
  return !isInShieldWall(board, pos);
}

// ─── Charge Targets ───────────────────────────────────────────
// After Hippeus captures, it can move 1 square in any direction

export function getChargeTargets(
  board: Board,
  pos: Position,
  owner: Player,
): Position[] {
  const targets: Position[] = [];
  const allDirs: [number, number][] = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1],
  ];

  for (const [dr, dc] of allDirs) {
    const nr = pos.row + dr;
    const nc = pos.col + dc;
    if (!inBounds(nr, nc)) continue;

    const target = board[nr][nc];
    if (target === null) {
      targets.push({ row: nr, col: nc });
    } else if (
      target.owner !== owner &&
      canBeCaptured(board, { row: nr, col: nc })
    ) {
      targets.push({ row: nr, col: nc });
    }
  }

  return targets;
}

// ─── Material Check ───────────────────────────────────────────

export function hasInsufficientMaterial(board: Board): boolean {
  let goldCount = 0;
  let silverCount = 0;

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (p) {
        if (p.owner === 'gold') goldCount++;
        else silverCount++;
      }
    }
  }

  // Only archons remain
  return goldCount === 1 && silverCount === 1;
}

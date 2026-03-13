import type { Piece, MoveKind } from '../engine/types';
import { isInShieldWall } from '../engine/abilities';
import { useGameStore } from '../store/gameStore';
import PieceIcon from './PieceIcon';

interface Props {
  row: number;
  col: number;
  piece: Piece | null;
  isSelected: boolean;
  moveKind: MoveKind | null;
  isChargeTarget: boolean;
}

export default function Square({
  row,
  col,
  piece,
  isSelected,
  moveKind,
  isChargeTarget,
}: Props) {
  const clickSquare = useGameStore(s => s.clickSquare);
  const board = useGameStore(s => s.board);

  const isLight = (row + col) % 2 === 1;
  const shieldWall = piece ? isInShieldWall(board, { row, col }) : false;

  let bgClass = isLight ? 'bg-kairos-board-light' : 'bg-kairos-board-dark';

  if (isSelected) {
    bgClass = 'bg-yellow-700/60';
  }

  let overlay: JSX.Element | null = null;

  if (moveKind === 'move') {
    overlay = (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-3 h-3 rounded-full bg-kairos-success/70" />
      </div>
    );
  } else if (moveKind === 'capture') {
    overlay = (
      <div className="absolute inset-0 rounded ring-2 ring-inset ring-kairos-danger/80 pointer-events-none" />
    );
  } else if (moveKind === 'rangedCapture') {
    overlay = (
      <div className="absolute inset-0 rounded ring-2 ring-inset ring-kairos-press/80 pointer-events-none">
        <div className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-kairos-press" />
      </div>
    );
  }

  if (isChargeTarget) {
    overlay = (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-4 h-4 rounded-full bg-amber-400/80 animate-pulse" />
      </div>
    );
  }

  return (
    <button
      type="button"
      className={`relative aspect-square ${bgClass} flex items-center justify-center transition-colors duration-100 focus:outline-none focus:ring-1 focus:ring-kairos-accent/50`}
      onClick={() => clickSquare(row, col)}
      aria-label={`${String.fromCharCode(97 + col)}${row + 1}${piece ? ` — ${piece.type}` : ''}`}
    >
      {piece && (
        <div className={`w-[80%] h-[80%] ${shieldWall ? 'ring-2 ring-kairos-shield rounded-full' : ''}`}>
          <PieceIcon type={piece.type} owner={piece.owner} exhausted={piece.exhausted} />
        </div>
      )}
      {overlay}
    </button>
  );
}

import { useGameStore } from '../store/gameStore';
import { posEqual } from '../engine/board';
import type { MoveKind } from '../engine/types';
import Square from './Square';

export default function Board() {
  const board = useGameStore(s => s.board);
  const selectedPos = useGameStore(s => s.selectedPos);
  const validMoves = useGameStore(s => s.validMoves);
  const chargeTargets = useGameStore(s => s.chargeTargets);

  // Pre-compute move lookup
  const moveMap = new Map<string, MoveKind>();
  for (const m of validMoves) {
    moveMap.set(`${m.pos.row},${m.pos.col}`, m.kind);
  }

  const chargeSet = new Set(chargeTargets.map(t => `${t.row},${t.col}`));

  return (
    <div className="w-full max-w-[560px] mx-auto">
      {/* Column labels (top) */}
      <div className="grid grid-cols-[1.5rem_repeat(8,1fr)] gap-0 mb-0.5">
        <div />
        {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(f => (
          <div key={f} className="text-center text-xs text-kairos-silver-dark font-body select-none">
            {f}
          </div>
        ))}
      </div>

      {/* Board grid */}
      <div className="grid grid-cols-[1.5rem_repeat(8,1fr)] gap-0">
        {Array.from({ length: 8 }, (_, i) => 7 - i).map(row => (
          <div key={row} className="contents">
            {/* Row label */}
            <div className="flex items-center justify-center text-xs text-kairos-silver-dark font-body select-none">
              {row + 1}
            </div>
            {Array.from({ length: 8 }, (_, col) => {
              const key = `${row},${col}`;
              const piece = board[row][col];
              const isSelected = selectedPos ? posEqual(selectedPos, { row, col }) : false;
              const moveKind = moveMap.get(key) ?? null;
              const isChargeTarget = chargeSet.has(key);

              return (
                <Square
                  key={key}
                  row={row}
                  col={col}
                  piece={piece}
                  isSelected={isSelected}
                  moveKind={moveKind}
                  isChargeTarget={isChargeTarget}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

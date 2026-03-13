import { useGameStore } from '../store/gameStore';
import { moveToNotation } from '../engine/notation';
import { useEffect, useRef } from 'react';

interface TurnGroup {
  turnNum: number;
  goldMoves: string[];
  silverMoves: string[];
}

function groupMoves(moves: ReturnType<typeof useGameStore.getState>['moves']): TurnGroup[] {
  const groups: TurnGroup[] = [];
  let current: TurnGroup = { turnNum: 1, goldMoves: [], silverMoves: [] };

  for (const move of moves) {
    const notation = moveToNotation(move);

    // A new gold main move (not press) when gold already has moves = new turn
    if (move.player === 'gold' && !move.isPress && current.goldMoves.length > 0) {
      groups.push(current);
      current = { turnNum: current.turnNum + 1, goldMoves: [], silverMoves: [] };
    }

    if (move.player === 'gold') {
      current.goldMoves.push(notation);
    } else {
      current.silverMoves.push(notation);
    }
  }

  if (current.goldMoves.length > 0 || current.silverMoves.length > 0) {
    groups.push(current);
  }

  return groups;
}

export default function MoveHistory() {
  const moves = useGameStore(s => s.moves);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [moves.length]);

  if (moves.length === 0) {
    return (
      <div className="bg-kairos-bg-alt rounded-lg p-3 border border-white/5">
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-2 font-body">
          Histórico
        </h3>
        <p className="text-xs text-white/30 font-body italic">Nenhum movimento ainda</p>
      </div>
    );
  }

  const grouped = groupMoves(moves);

  return (
    <div className="bg-kairos-bg-alt rounded-lg p-3 border border-white/5">
      <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-2 font-body">
        Histórico
      </h3>
      <div ref={scrollRef} className="max-h-48 overflow-y-auto space-y-0.5 scrollbar-thin">
        {grouped.map((g) => (
          <div key={g.turnNum} className="flex text-xs font-body">
            <span className="w-6 text-white/30 shrink-0">{g.turnNum}.</span>
            <span className="flex-1 text-kairos-gold/80 truncate">
              {g.goldMoves.join(' ')}
            </span>
            <span className="flex-1 text-kairos-silver/80 truncate ml-2">
              {g.silverMoves.join(' ')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

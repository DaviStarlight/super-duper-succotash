import { useGameStore } from '../store/gameStore';
import { PROMOTABLE_TYPES, PIECE_NAMES } from '../engine/types';
import PieceIcon from './PieceIcon';

export default function PromotionDialog() {
  const turnPhase = useGameStore(s => s.turnPhase);
  const currentPlayer = useGameStore(s => s.currentPlayer);
  const promote = useGameStore(s => s.promote);

  if (turnPhase !== 'promotion' && turnPhase !== 'promotionAfterPress') {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-kairos-bg-alt border border-white/10 rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl">
        <h2 className="text-lg font-display font-bold text-kairos-accent text-center mb-1">
          Promoção
        </h2>
        <p className="text-sm text-white/60 text-center mb-5 font-body">
          Escolha o tipo de peça para o Doríforo promovido
        </p>
        <div className="grid grid-cols-2 gap-3">
          {PROMOTABLE_TYPES.map(type => (
            <button
              key={type}
              type="button"
              onClick={() => promote(type)}
              className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 hover:border-kairos-accent/50 transition-colors"
            >
              <div className="w-12 h-12">
                <PieceIcon type={type} owner={currentPlayer} />
              </div>
              <span className="text-xs font-body font-semibold text-white/80">
                {PIECE_NAMES[type]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

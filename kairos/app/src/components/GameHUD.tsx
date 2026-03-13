import { useGameStore } from '../store/gameStore';
import type { PieceType } from '../engine/types';
import { PIECE_NAMES } from '../engine/types';

const PHASE_LABELS: Record<string, string> = {
  mainMove: 'Selecione uma peça para mover',
  charge: 'Investida! Mova 1 casa ou recuse',
  promotion: 'Escolha a promoção do Doríforo',
  pressDecision: 'Pressionar ou encerrar turno?',
  pressMove: 'Selecione peça para Press',
  chargeAfterPress: 'Investida (Press)! Mova 1 casa ou recuse',
  promotionAfterPress: 'Escolha a promoção',
  gameOver: 'Partida encerrada',
};

export default function GameHUD() {
  const currentPlayer = useGameStore(s => s.currentPlayer);
  const turnNumber = useGameStore(s => s.turnNumber);
  const turnPhase = useGameStore(s => s.turnPhase);
  const canPress = useGameStore(s => s.canPress);
  const result = useGameStore(s => s.result);
  const startPress = useGameStore(s => s.startPress);
  const endTurn = useGameStore(s => s.endTurn);
  const skipCharge = useGameStore(s => s.skipCharge);
  const capturedByGold = useGameStore(s => s.capturedByGold);
  const capturedBySilver = useGameStore(s => s.capturedBySilver);

  const playerColor = currentPlayer === 'gold' ? 'text-kairos-gold' : 'text-kairos-silver';
  const playerName = currentPlayer === 'gold' ? 'Ouro' : 'Prata';

  return (
    <div className="space-y-3">
      {/* Turn Indicator */}
      <div className="bg-kairos-bg-alt rounded-lg p-3 border border-white/5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-white/60 font-body">Turno {turnNumber}</span>
          <span className={`text-sm font-semibold ${playerColor}`}>
            ● {playerName}
          </span>
        </div>
        <p className="text-xs text-white/50 font-body">
          {PHASE_LABELS[turnPhase]}
        </p>
      </div>

      {/* Action Buttons */}
      {turnPhase === 'pressDecision' && (
        <div className="flex gap-2">
          {canPress && (
            <button
              type="button"
              onClick={startPress}
              className="flex-1 py-2 px-3 text-sm font-semibold rounded-lg bg-kairos-press text-black hover:bg-kairos-press/80 transition-colors font-body"
            >
              ⚡ Pressionar
            </button>
          )}
          <button
            type="button"
            onClick={endTurn}
            className="flex-1 py-2 px-3 text-sm font-semibold rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors font-body"
          >
            Encerrar Turno
          </button>
        </div>
      )}

      {(turnPhase === 'charge' || turnPhase === 'chargeAfterPress') && (
        <button
          type="button"
          onClick={skipCharge}
          className="w-full py-2 px-3 text-sm font-semibold rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors font-body"
        >
          Recusar Investida
        </button>
      )}

      {/* Captured Pieces */}
      <div className="bg-kairos-bg-alt rounded-lg p-3 border border-white/5">
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-2 font-body">
          Peças Capturadas
        </h3>
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <span className="text-xs text-kairos-gold w-12 font-body">Ouro:</span>
            <span className="text-xs text-white/70 font-body">
              {capturedByGold.length > 0
                ? capturedByGold.map((p: PieceType) => PIECE_NAMES[p]).join(', ')
                : '—'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-kairos-silver w-12 font-body">Prata:</span>
            <span className="text-xs text-white/70 font-body">
              {capturedBySilver.length > 0
                ? capturedBySilver.map((p: PieceType) => PIECE_NAMES[p]).join(', ')
                : '—'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

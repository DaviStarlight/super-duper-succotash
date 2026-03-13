import { useGameStore } from '../store/gameStore';
import { useAppStore } from '../store/appStore';

export default function GameOverModal() {
  const result = useGameStore(s => s.result);
  const turnPhase = useGameStore(s => s.turnPhase);
  const newGame = useGameStore(s => s.newGame);
  const navigate = useAppStore(s => s.navigate);

  if (turnPhase !== 'gameOver' || !result) return null;

  const isVictory = !result.isDraw;
  const winnerName = result.winner === 'gold' ? 'Ouro' : 'Prata';

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-kairos-bg-alt border border-white/10 rounded-xl p-8 max-w-sm w-full mx-4 shadow-2xl text-center">
        {/* Result Icon */}
        <div className="text-5xl mb-4">
          {isVictory ? '⚔️' : '🤝'}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-display font-bold mb-2">
          {isVictory ? (
            <span className={result.winner === 'gold' ? 'text-kairos-gold' : 'text-kairos-silver'}>
              {winnerName} vence!
            </span>
          ) : (
            <span className="text-white/80">Empate</span>
          )}
        </h2>

        {/* Reason */}
        <p className="text-sm text-white/50 font-body mb-6">
          {result.reason}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={newGame}
            className="w-full py-3 px-4 rounded-lg bg-kairos-accent text-black font-semibold font-body hover:bg-kairos-gold transition-colors"
          >
            Nova Partida
          </button>
          <button
            type="button"
            onClick={() => {
              newGame();
              navigate('home');
            }}
            className="w-full py-3 px-4 rounded-lg bg-white/10 text-white font-body hover:bg-white/20 transition-colors"
          >
            Voltar ao Menu
          </button>
        </div>
      </div>
    </div>
  );
}

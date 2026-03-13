import { useAppStore } from '../store/appStore';
import { useGameStore } from '../store/gameStore';

export default function HomeScreen() {
  const navigate = useAppStore(s => s.navigate);
  const newGame = useGameStore(s => s.newGame);

  const handlePlay = () => {
    newGame();
    navigate('game');
  };

  return (
    <div className="min-h-screen bg-kairos-bg flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Logo */}
        <div className="mb-2 text-6xl">⚔️</div>
        <h1 className="text-5xl md:text-6xl font-display font-black text-kairos-accent tracking-widest mb-2">
          KAIRÓS
        </h1>
        <p className="text-sm md:text-base text-white/50 font-body tracking-wide mb-10">
          O Jogo do Momento Decisivo
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button
            type="button"
            onClick={handlePlay}
            className="w-full py-4 px-6 rounded-xl bg-kairos-accent text-black font-display font-bold text-lg tracking-wide hover:bg-kairos-gold transition-colors shadow-lg shadow-kairos-accent/20"
          >
            JOGAR
          </button>
          <button
            type="button"
            onClick={() => navigate('tutorial')}
            className="w-full py-3 px-6 rounded-xl bg-white/5 border border-white/10 text-white font-body font-semibold hover:bg-white/10 transition-colors"
          >
            Como Jogar
          </button>
          <button
            type="button"
            onClick={() => navigate('dashboard')}
            className="w-full py-3 px-6 rounded-xl bg-white/5 border border-white/10 text-white font-body font-semibold hover:bg-white/10 transition-colors"
          >
            Dashboards
          </button>
        </div>
      </div>

      {/* Quick Info */}
      <div className="border-t border-white/5 px-4 py-8">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl mb-2">🏛️</div>
            <h3 className="font-display font-bold text-kairos-accent text-sm mb-1">
              Estratégia Grega
            </h3>
            <p className="text-xs text-white/40 font-body">
              Tabuleiro 8×8 com 6 tipos de peças únicas inspiradas na Grécia Antiga.
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-display font-bold text-kairos-accent text-sm mb-1">
              Sistema Press
            </h3>
            <p className="text-xs text-white/40 font-body">
              Mova 2 peças por turno ao custo de Exaustão. O tempo é um recurso estratégico.
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">👑</div>
            <h3 className="font-display font-bold text-kairos-accent text-sm mb-1">
              Captura Direta
            </h3>
            <p className="text-xs text-white/40 font-body">
              Sem xeque. Capture o Arconte adversário para vencer imediatamente.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-white/20 font-body py-4 border-t border-white/5">
        KAIRÓS v0.1.0 — Jogo original de estratégia abstrata
      </footer>
    </div>
  );
}

import { useGameStore } from '../store/gameStore';
import { useAppStore } from '../store/appStore';
import Board from '../components/Board';
import GameHUD from '../components/GameHUD';
import MoveHistory from '../components/MoveHistory';
import PromotionDialog from '../components/PromotionDialog';
import GameOverModal from '../components/GameOverModal';

export default function GameScreen() {
  const resign = useGameStore(s => s.resign);
  const turnPhase = useGameStore(s => s.turnPhase);
  const navigate = useAppStore(s => s.navigate);
  const newGame = useGameStore(s => s.newGame);

  return (
    <div className="min-h-screen bg-kairos-bg flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <button
          type="button"
          onClick={() => {
            newGame();
            navigate('home');
          }}
          className="text-sm text-white/50 hover:text-white transition-colors font-body"
        >
          ← Menu
        </button>
        <h1 className="text-lg font-display font-bold text-kairos-accent tracking-wider">
          KAIRÓS
        </h1>
        {turnPhase !== 'gameOver' ? (
          <button
            type="button"
            onClick={resign}
            className="text-sm text-kairos-danger/70 hover:text-kairos-danger transition-colors font-body"
          >
            Abandonar
          </button>
        ) : (
          <div className="w-16" />
        )}
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 max-w-6xl mx-auto w-full">
        {/* Left Panel (HUD) */}
        <div className="lg:w-56 shrink-0 order-2 lg:order-1">
          <GameHUD />
        </div>

        {/* Center (Board) */}
        <div className="flex-1 flex items-start justify-center order-1 lg:order-2">
          <Board />
        </div>

        {/* Right Panel (History) */}
        <div className="lg:w-56 shrink-0 order-3">
          <MoveHistory />
        </div>
      </div>

      {/* Modals */}
      <PromotionDialog />
      <GameOverModal />
    </div>
  );
}

import { useAppStore } from '../store/appStore';
import PieceIcon from '../components/PieceIcon';
import type { PieceType } from '../engine/types';

const PIECES: { type: PieceType; name: string; move: string; special: string }[] = [
  {
    type: 'archon',
    name: 'Arconte',
    move: '1 casa, qualquer direção',
    special: 'Nunca pode ser Pressado. Se capturado, você perde.',
  },
  {
    type: 'strategos',
    name: 'Strategos',
    move: 'Até 3 casas, qualquer direção reta',
    special: 'Peça mais poderosa e versátil do jogo.',
  },
  {
    type: 'hoplite',
    name: 'Hoplita',
    move: 'Até 2 casas, ortogonal',
    special: 'Muralha de Escudos: 2 Hoplitas adjacentes ficam invulneráveis.',
  },
  {
    type: 'toxotes',
    name: 'Toxotes',
    move: 'Até 2 casas, diagonal',
    special: 'Ataque à Distância: captura a 2 casas sem se mover.',
  },
  {
    type: 'hippeus',
    name: 'Hippeus',
    move: 'Em L (2+1 ou 3+1), salta peças',
    special: 'Investida: +1 casa após capturar, pode capturar novamente.',
  },
  {
    type: 'doryphoros',
    name: 'Doríforo',
    move: '1 frente (2 no primeiro). Captura na diagonal.',
    special: 'Promoção ao atingir a última linha.',
  },
];

export default function TutorialScreen() {
  const navigate = useAppStore(s => s.navigate);

  return (
    <div className="min-h-screen bg-kairos-bg">
      <header className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <button
          type="button"
          onClick={() => navigate('home')}
          className="text-sm text-white/50 hover:text-white transition-colors font-body"
        >
          ← Menu
        </button>
        <h1 className="text-lg font-display font-bold text-kairos-accent tracking-wider">
          COMO JOGAR
        </h1>
        <div className="w-12" />
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* Objective */}
        <section>
          <h2 className="font-display font-bold text-kairos-accent text-xl mb-3">
            Objetivo
          </h2>
          <p className="text-sm text-white/70 font-body leading-relaxed">
            Capture o <strong className="text-kairos-gold">Arconte</strong> adversário para vencer.
            Não existe aviso de "xeque" — se uma peça pode alcançar o Arconte inimigo, ela o captura
            e o jogo acaba imediatamente.
          </p>
        </section>

        {/* Turn Structure */}
        <section>
          <h2 className="font-display font-bold text-kairos-accent text-xl mb-3">
            Estrutura do Turno
          </h2>
          <div className="space-y-3">
            <Step num={1} title="Recuperação" desc="Peças Exaustas voltam ao normal automaticamente." />
            <Step num={2} title="Movimento Principal" desc="Mova uma peça obrigatoriamente." />
            <Step
              num={3}
              title="Press (Opcional)"
              desc="Mova uma segunda peça diferente (exceto o Arconte). Ela fica Exausta por 1 turno — não pode mover nem usar habilidades."
            />
          </div>
        </section>

        {/* Press System */}
        <section>
          <h2 className="font-display font-bold text-kairos-accent text-xl mb-3">
            Sistema Press
          </h2>
          <div className="bg-kairos-bg-alt rounded-lg p-4 border border-white/5">
            <p className="text-sm text-white/70 font-body leading-relaxed mb-3">
              O Press é o coração de Kairós. Após seu movimento principal, você pode opcionalmente
              mover uma <strong className="text-kairos-press">segunda peça</strong>, mas ela ficará
              <strong className="text-kairos-press"> Exausta</strong> — indisponível até seu próximo turno.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-body">
              <div className="bg-green-900/20 rounded p-2 text-kairos-success">
                ✓ Criar ameaças duplas
              </div>
              <div className="bg-green-900/20 rounded p-2 text-kairos-success">
                ✓ Posicionar com velocidade
              </div>
              <div className="bg-red-900/20 rounded p-2 text-kairos-danger">
                ✗ Peça fica vulnerável
              </div>
              <div className="bg-red-900/20 rounded p-2 text-kairos-danger">
                ✗ Não pode fugir depois
              </div>
            </div>
          </div>
        </section>

        {/* Pieces */}
        <section>
          <h2 className="font-display font-bold text-kairos-accent text-xl mb-3">
            Peças
          </h2>
          <div className="space-y-3">
            {PIECES.map(p => (
              <div
                key={p.type}
                className="bg-kairos-bg-alt rounded-lg p-4 border border-white/5 flex gap-4 items-start"
              >
                <div className="w-14 h-14 shrink-0">
                  <PieceIcon type={p.type} owner="gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-white text-sm mb-0.5">{p.name}</h3>
                  <p className="text-xs text-white/50 font-body mb-1">{p.move}</p>
                  <p className="text-xs text-kairos-accent/80 font-body">{p.special}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Special Abilities */}
        <section>
          <h2 className="font-display font-bold text-kairos-accent text-xl mb-3">
            Habilidades Especiais
          </h2>
          <div className="space-y-3">
            <Ability
              icon="🛡️"
              name="Muralha de Escudos"
              desc="Dois Hoplitas adjacentes ortogonalmente ficam imunes a captura. A muralha é automática e se desfaz quando um deles sai de posição."
              color="text-kairos-shield"
            />
            <Ability
              icon="🏹"
              name="Ataque à Distância"
              desc="Toxotes pode remover uma peça inimiga a 2 casas de distância em qualquer direção reta, sem se mover. A casa intermediária deve estar vazia."
              color="text-kairos-press"
            />
            <Ability
              icon="🐎"
              name="Investida"
              desc="Após capturar, o Hippeus pode mover 1 casa adicional em qualquer direção — podendo capturar uma segunda peça."
              color="text-kairos-gold"
            />
            <Ability
              icon="⬆️"
              name="Promoção"
              desc="Doríforo que atinge a última linha é obrigatoriamente promovido a Strategos, Hoplita, Toxotes ou Hippeus."
              color="text-kairos-success"
            />
          </div>
        </section>

        {/* Visual Legend */}
        <section>
          <h2 className="font-display font-bold text-kairos-accent text-xl mb-3">
            Legenda Visual
          </h2>
          <div className="bg-kairos-bg-alt rounded-lg p-4 border border-white/5 space-y-2 text-sm font-body">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-kairos-success/70" />
              <span className="text-white/60">Casa disponível para movimento</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded ring-2 ring-kairos-danger/80" />
              <span className="text-white/60">Captura por deslocamento</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded ring-2 ring-kairos-press/80" />
              <span className="text-white/60">Captura à distância (Toxotes)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-amber-400/80" />
              <span className="text-white/60">Destino de Investida</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded ring-2 ring-kairos-shield" />
              <span className="text-white/60">Peça protegida por Muralha de Escudos</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded bg-yellow-700/60" />
              <span className="text-white/60">Peça selecionada</span>
            </div>
          </div>
        </section>

        {/* Go Play */}
        <div className="text-center pt-4">
          <button
            type="button"
            onClick={() => {
              navigate('game');
            }}
            className="py-3 px-8 rounded-xl bg-kairos-accent text-black font-display font-bold tracking-wide hover:bg-kairos-gold transition-colors"
          >
            JOGAR AGORA
          </button>
        </div>
      </div>
    </div>
  );
}

function Step({ num, title, desc }: { num: number; title: string; desc: string }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-7 h-7 rounded-full bg-kairos-accent/20 flex items-center justify-center text-kairos-accent font-display font-bold text-sm shrink-0">
        {num}
      </div>
      <div>
        <h3 className="font-body font-semibold text-white text-sm">{title}</h3>
        <p className="text-xs text-white/50 font-body">{desc}</p>
      </div>
    </div>
  );
}

function Ability({
  icon,
  name,
  desc,
  color,
}: {
  icon: string;
  name: string;
  desc: string;
  color: string;
}) {
  return (
    <div className="bg-kairos-bg-alt rounded-lg p-4 border border-white/5">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{icon}</span>
        <h3 className={`font-display font-bold text-sm ${color}`}>{name}</h3>
      </div>
      <p className="text-xs text-white/50 font-body leading-relaxed">{desc}</p>
    </div>
  );
}

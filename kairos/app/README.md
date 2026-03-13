# KAIRÓS — O Jogo do Momento Decisivo

Jogo de estratégia abstrata original para 2 jogadores, inspirado na Grécia Antiga.

## Pré-requisitos

- **Node.js** 18+ (recomendado: 20 LTS)
- **npm** 9+

## Instalação e Execução

```bash
# Entrar na pasta do app
cd kairos/app

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Abrir no navegador
# http://localhost:5173
```

## Comandos Disponíveis

| Comando         | Descrição                                |
|-----------------|------------------------------------------|
| `npm run dev`   | Servidor de desenvolvimento (HMR)        |
| `npm run build` | Build de produção                        |
| `npm run preview` | Preview do build de produção           |

## Stack Técnica

| Camada       | Tecnologia                |
|--------------|---------------------------|
| Framework    | React 18 + TypeScript     |
| Build        | Vite                      |
| UI           | Tailwind CSS              |
| Estado       | Zustand                   |
| Gráficos     | Recharts                  |
| Tipografia   | Cinzel + Inter            |

## Estrutura do Projeto

```
app/
├── src/
│   ├── engine/           # Core: regras, movimentos, habilidades
│   │   ├── types.ts      # Tipos do domínio do jogo
│   │   ├── board.ts      # Tabuleiro, posição inicial, utilitários
│   │   ├── moves.ts      # Cálculo de movimentos legais por peça
│   │   ├── abilities.ts  # Muralha de Escudos, Investida, Ataque à Distância
│   │   └── notation.ts   # Notação KGN dos movimentos
│   ├── store/            # Gerenciamento de estado (Zustand)
│   │   ├── gameStore.ts  # Estado completo do jogo + máquina de turnos
│   │   └── appStore.ts   # Navegação entre telas
│   ├── components/       # Componentes React reutilizáveis
│   │   ├── Board.tsx     # Tabuleiro 8×8
│   │   ├── Square.tsx    # Casa individual com interação
│   │   ├── PieceIcon.tsx # Ícones SVG das peças
│   │   ├── GameHUD.tsx   # Painel de estado da partida
│   │   ├── MoveHistory.tsx         # Histórico de movimentos
│   │   ├── PromotionDialog.tsx     # Modal de promoção
│   │   └── GameOverModal.tsx       # Modal de fim de jogo
│   ├── screens/          # Telas da aplicação
│   │   ├── HomeScreen.tsx          # Tela inicial
│   │   ├── GameScreen.tsx          # Tela de partida
│   │   ├── TutorialScreen.tsx      # Como jogar
│   │   └── DashboardScreen.tsx     # Dashboards analíticos
│   ├── domain/           # Tipos de domínio e dados mockados
│   │   ├── types.ts      # Interfaces (Player, Match, Analytics)
│   │   └── mocks.ts      # Dados realistas para dashboards
│   ├── App.tsx           # Roteamento principal
│   ├── main.tsx          # Entry point
│   └── index.css         # Estilos globais + Tailwind
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── postcss.config.js
```

## Funcionalidades Implementadas

### Jogo Completo
- Tabuleiro 8×8 com posição inicial oficial
- 6 tipos de peças (Arconte, Strategos, Hoplita, Toxotes, Hippeus, Doríforo)
- Movimentação completa por tipo de peça
- Hippeus: L padrão (2+1) e Grande L (3+1)
- Validação de movimentos legais
- Seleção visual de peça + destinos possíveis
- Captura por deslocamento

### Sistema Press
- Fase 3 opcional: mover segunda peça
- Marcação de Exaustão
- Recuperação automática no início do turno
- Arconte protegido (nunca pode ser Pressado)

### Habilidades Especiais
- **Muralha de Escudos:** 2 Hoplitas ortogonalmente adjacentes ficam invulneráveis
- **Ataque à Distância:** Toxotes captura a 2 casas sem se mover
- **Investida:** Hippeus move +1 casa após captura (pode capturar novamente)
- **Promoção:** Doríforo na última linha → escolha entre 4 tipos

### Condições de Fim de Jogo
- Vitória por captura do Arconte
- Vitória por abandono
- Empate por material insuficiente
- Empate por regra dos 50 movimentos
- Empate por repetição tripla
- Empate por impossibilidade de mover

### Experiência de Produto
- Tela inicial com logo e navegação
- Tutorial interativo "Como Jogar"
- HUD com turno, fase, peças capturadas
- Histórico de movimentos com notação KGN
- Modal de promoção
- Modal de fim de jogo
- Dashboards analíticos com dados mockados
- Design responsivo (mobile + desktop)
- Identidade visual inspirada na Grécia Antiga

### Dashboards
- KPIs (partidas, duração média, turnos, uso de Press)
- Taxa de vitória Ouro vs Prata
- Partidas por dia
- Estatísticas por peça
- Retenção por dia
- Distribuição de Elo
- Aberturas populares
- Partidas recentes
- Jogadores em destaque

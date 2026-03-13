# Backlog Técnico — KAIRÓS v0.1.0

---

## 1. O que foi implementado (v0.1.0)

### Engine de Regras (`src/engine/`)
- [x] Representação do tabuleiro 8×8 com tipos fortes
- [x] Posição inicial oficial (Ouro + Prata, espelhamento horizontal)
- [x] Cálculo completo de movimentos legais para 6 tipos de peças
- [x] Arconte: 1 casa, qualquer direção
- [x] Strategos: até 3 casas, qualquer direção reta, sem saltar
- [x] Hoplita: até 2 casas ortogonais, sem saltar
- [x] Toxotes: até 2 casas diagonais, sem saltar
- [x] Hippeus: L padrão (2+1) + Grande L (3+1), salta peças
- [x] Doríforo: 1 frente (2 no primeiro), captura na diagonal frontal
- [x] Captura por deslocamento
- [x] Muralha de Escudos (2 Hoplitas adjacentes = invulneráveis)
- [x] Ataque à Distância (Toxotes: 2 casas qualquer direção, linha de visão livre)
- [x] Investida (Hippeus: +1 casa após captura, pode capturar novamente)
- [x] Promoção obrigatória (Doríforo na última linha → Strategos/Hoplita/Toxotes/Hippeus)
- [x] Sistema Press completo (Fase 3: mover segunda peça ≠ Arconte, marcação de Exaustão)
- [x] Recuperação automática de Exaustão no início do turno
- [x] Detecção de vitória por captura do Arconte
- [x] Detecção de empate: material insuficiente, 50 movimentos, repetição tripla, stalemate
- [x] Notação KGN (Kairós Game Notation) dos movimentos
- [x] Board hashing para detecção de repetição

### Interface (`src/components/` + `src/screens/`)
- [x] Tela inicial com logo, navegação, info do jogo
- [x] Tutorial "Como Jogar" com peças, habilidades, legendas visuais
- [x] Tabuleiro renderizado como CSS Grid responsivo
- [x] Peças com ícones SVG distintos por tipo
- [x] Seleção visual de peça (highlight amarelo)
- [x] Indicação de movimentos válidos (pontos verdes)
- [x] Indicação de capturas (borda vermelha)
- [x] Indicação de ataques à distância (borda laranja)
- [x] Indicação de destinos de Investida (pontos pulsantes)
- [x] Indicação visual de Muralha de Escudos (borda azul)
- [x] Indicação visual de Exaustão (cor escurecida + badge "Z")
- [x] Rótulos de arquivos (a-h) e linhas (1-8)
- [x] HUD com turno, fase, peças capturadas
- [x] Botões de ação: Pressionar, Encerrar Turno, Recusar Investida
- [x] Histórico de movimentos com notação KGN, auto-scroll
- [x] Modal de promoção com 4 opções visuais
- [x] Modal de fim de jogo com resultado e ações
- [x] Botão de abandonar
- [x] Navegação entre telas (Home, Jogo, Tutorial, Dashboards)

### Dashboards (`src/screens/DashboardScreen.tsx`)
- [x] 4 KPIs (partidas, duração, turnos, uso de Press)
- [x] Gráfico de pizza: taxa de vitória Ouro vs Prata vs Empate
- [x] Gráfico de barras: partidas por dia
- [x] Tabela: estatísticas por peça (capturas, perdas, sobrevivência, uso)
- [x] Gráfico de linha: retenção por dia
- [x] Gráfico de barras horizontal: distribuição de Elo
- [x] Barras de progresso: aberturas populares com win rate
- [x] Tabela: partidas recentes
- [x] Cards: jogadores em destaque
- [x] Dados mockados profissionais e realistas

### Infraestrutura
- [x] React 18 + TypeScript + Vite
- [x] Tailwind CSS com paleta customizada (kairos-*)
- [x] Zustand para estado global
- [x] Recharts para gráficos dos dashboards
- [x] Fontes Google Fonts (Cinzel + Inter)
- [x] Build de produção funcional
- [x] Responsivo mobile-first

---

## 2. O que ficou preparado (base para expansão)

| Funcionalidade | Status | Base Pronta |
|---|---|---|
| Modo vs IA | Não implementado | Engine é determinística e pura — integrar minimax é direto |
| Multiplayer online | Não implementado | Engine separa regras de UI — isomórfica para servidor |
| Ranking (Glicko-2) | Não implementado | `domain/types.ts` já modela Elo + tiers |
| Persistência em banco | Não implementado | `domain/types.ts` modela Match, Player, Event |
| Replay de partidas | Não implementado | `MoveRecord[]` serializa toda a partida |
| Relógio de partida | Não implementado | Integrar na store com `setInterval` |
| Puzzles diários | Não implementado | Engine aceita qualquer posição inicial |
| Cosméticos | Não implementado | PieceIcon aceita temas parametrizáveis |
| Event tracking | Não implementado | `domain/types.ts` define `AnalyticsEvent` |
| Matchmaking | Não implementado | `GameSettings` define modo + config |
| Torneios | Não implementado | Modelos existem em `domain/types.ts` |
| Animações de peças | Não implementado | Substituir CSS Grid por Canvas/Framer Motion |

---

## 3. Backlog de Próximas Features (priorizadas)

### P0 — Crítico para v1.0
| # | Feature | Esforço | Impacto |
|---|---|---|---|
| 1 | IA adversária (minimax α-β, profundidade 3-5) | 2-3 semanas | Jogabilidade solo |
| 2 | Relógio de partida (Blitz 3min, Rápido 10min, Clássico 30min) | 3-5 dias | Tensão competitiva |
| 3 | Tutorial interativo (5 lições jogáveis passo-a-passo) | 1-2 semanas | Onboarding |
| 4 | Efeitos sonoros (movimento, captura, Press, vitória) | 3-5 dias | Feedback sensorial |
| 5 | Animações de movimento (CSS transitions ou Framer Motion) | 1 semana | Polimento visual |
| 6 | Testes unitários da engine (>200 test cases com Vitest) | 1-2 semanas | Confiabilidade |

### P1 — Importante para v1.5
| # | Feature | Esforço |
|---|---|---|
| 7 | Backend (Node.js + Express + Socket.io) | 3-4 semanas |
| 8 | Multiplayer online (WebSocket rooms) | 2-3 semanas |
| 9 | Auth (JWT + OAuth Google/GitHub) | 1 semana |
| 10 | Perfil do jogador + dados persistidos | 1-2 semanas |
| 11 | Matchmaking com fila | 1-2 semanas |
| 12 | Sistema de Elo (Glicko-2) | 1 semana |
| 13 | Leaderboard | 3-5 dias |

### P2 — Expansão para v2.0
| # | Feature | Esforço |
|---|---|---|
| 14 | Replay e análise de partida | 2 semanas |
| 15 | Puzzles diários (6 tipos de desafio) | 2-3 semanas |
| 16 | Temporadas (sistema trimestral) | 2 semanas |
| 17 | IA avançada (MCTS / rede neural) | 4-6 semanas |
| 18 | Cosméticos (temas de tabuleiro, skins de peças) | 2 semanas |
| 19 | Passe de temporada | 2 semanas |
| 20 | Event tracking real (analytics pipeline) | 2-3 semanas |

---

## 4. Pontos de Atenção Técnicos

### Performance
- **Recharts**: bundle de ~200KB. Em v1.5, considerar lazy loading do dashboard ou trocar por chart lib mais leve (Lightweight Charts, uPlot).
- **SVG pieces**: estão inline — para muitas peças animadas, Canvas pode ser necessário.
- **Board re-rendering**: cada clique reconstrói o move map; para boards maiores ou IA, memoizar.

### Escalabilidade da Engine
- A engine está no frontend — para multiplayer, extrair para package compartilhado (`@kairos/engine`).
- `cloneBoard()` cria deep copy por spread — suficiente para 64 casas, mas para simulação em massa (IA), usar representação imutável (bitboard ou Uint8Array).
- `boardHash()` usa string concatenation — para detecção de repetição em escala, usar Zobrist hashing.

### UX
- **Mobile landscape**: o tabuleiro pode ficar pequeno em phones na horizontal. Testar e ajustar breakpoints.
- **Acessibilidade**: os squares têm `aria-label` básico. Adicionar navegação por teclado + screen reader support.
- **Drag and drop**: não implementado. Considerar para v1.0 (melhora a UX de movimento).

### Estado
- **Persistência local**: implementar `localStorage` para salvar/carregar partida em andamento.
- **Undo/Redo**: a engine é pura — adicionar historical state stack é direto.

---

## 5. Riscos de Evolução

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Engine com bug em regra obscura | Médio | Alto | Criar >200 testes unitários cobrindo edge cases |
| Performance da IA em mobile | Médio | Médio | Usar Web Worker para IA, limitar profundidade |
| Latência em multiplayer | Médio | Alto | Servidor autoritativo, reconciliação otimista |
| Balancing de peças incorreto | Baixo | Alto | Analytics detalhados, patches trimestrais |
| Bundle size crescente | Médio | Baixo | Code splitting, lazy loading de rotas |

---

## 6. Sugestões de Refatoração Futura

1. **Extrair `@kairos/engine` para package separado** — compartilhar entre frontend e backend
2. **Substituir screen routing por React Router** — para URLs, deep linking, back button
3. **Adicionar Vitest + Testing Library** — testes unitários da engine e testes de componentes
4. **Code splitting do Dashboard** — lazy load com `React.lazy()`
5. **Implementar Zustand middleware** — persist (localStorage), devtools, logger
6. **Canvas rendering do tabuleiro** — para animações suaves de movimento de peças
7. **Internacionalização (i18n)** — preparar para inglês/espanhol
8. **PWA** — service worker + manifest para instalação mobile

---

## 7. Prioridades para Versão 2

1. **IA jogável** com 3 níveis de dificuldade
2. **Multiplayer online** com salas e matchmaking
3. **Ranking competitivo** com Glicko-2
4. **Tutorial interativo** com 5 lições jogáveis
5. **Replay** com análise de partida turno-a-turno
6. **Puzzles diários** com 6 tipos de desafio

A base está pronta para tudo isso. O momento oportuno é agora. *Kairós.*

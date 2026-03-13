import { useAppStore } from '../store/appStore';
import { MOCK_DASHBOARD, MOCK_MATCHES, MOCK_PLAYERS } from '../domain/mocks';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid,
} from 'recharts';

const COLORS = ['#F0C040', '#A8B8CC', '#2ECC71', '#E74C3C', '#3498DB', '#F39C12'];

export default function DashboardScreen() {
  const navigate = useAppStore(s => s.navigate);
  const d = MOCK_DASHBOARD;

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
          DASHBOARDS
        </h1>
        <div className="w-12" />
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* ── KPI Cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <KPI label="Partidas" value={d.totalMatches.toLocaleString()} />
          <KPI label="Duração Média" value={`${d.avgDuration} min`} />
          <KPI label="Turnos Médios" value={d.avgTurns.toFixed(1)} />
          <KPI label="Uso de Press" value={`${d.pressUsageRate}%`} />
        </div>

        {/* ── Win Rate Overview ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Panel title="Taxa de Vitória">
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Ouro', value: d.goldWinRate },
                      { name: 'Prata', value: d.silverWinRate },
                      { name: 'Empate', value: d.drawRate },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, value }) => `${name} ${value}%`}
                  >
                    <Cell fill="#F0C040" />
                    <Cell fill="#A8B8CC" />
                    <Cell fill="#555" />
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: '#16213E', border: 'none', borderRadius: 8 }}
                    itemStyle={{ color: '#fff', fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel title="Partidas por Dia">
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={d.dailyMatches}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="date" tick={{ fill: '#ffffff60', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#ffffff60', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ background: '#16213E', border: 'none', borderRadius: 8 }}
                    itemStyle={{ color: '#fff', fontSize: 12 }}
                  />
                  <Bar dataKey="count" fill="#D4A843" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>

        {/* ── Piece Stats ── */}
        <Panel title="Estatísticas por Peça">
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-body">
              <thead>
                <tr className="text-white/40 border-b border-white/5">
                  <th className="text-left py-2 px-2">Peça</th>
                  <th className="text-right py-2 px-2">Capturas/jogo</th>
                  <th className="text-right py-2 px-2">Perdas/jogo</th>
                  <th className="text-right py-2 px-2">Sobrevivência (turnos)</th>
                  <th className="text-right py-2 px-2">Taxa de uso</th>
                </tr>
              </thead>
              <tbody>
                {d.pieceStats.map((p, i) => (
                  <tr key={p.type} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-2 px-2 text-white/80 font-semibold">{p.type}</td>
                    <td className="py-2 px-2 text-right text-kairos-success">{p.captures}</td>
                    <td className="py-2 px-2 text-right text-kairos-danger">{p.losses}</td>
                    <td className="py-2 px-2 text-right text-white/60">{p.avgSurvivalTurns}</td>
                    <td className="py-2 px-2 text-right text-white/60">{p.usageRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        {/* ── Retention & Elo ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Panel title="Retenção por Dia">
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={d.retentionByDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: '#ffffff60', fontSize: 11 }}
                    label={{ value: 'Dia', fill: '#ffffff40', fontSize: 11, position: 'insideBottomRight', offset: -5 }}
                  />
                  <YAxis
                    tick={{ fill: '#ffffff60', fontSize: 11 }}
                    label={{ value: '%', fill: '#ffffff40', fontSize: 11, position: 'insideTopLeft', offset: -5 }}
                  />
                  <Tooltip
                    contentStyle={{ background: '#16213E', border: 'none', borderRadius: 8 }}
                    itemStyle={{ color: '#fff', fontSize: 12 }}
                    formatter={(v: number) => `${v}%`}
                  />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="#D4A843"
                    strokeWidth={2}
                    dot={{ fill: '#D4A843', r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel title="Distribuição de Elo">
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={d.eloBrackets} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis type="number" tick={{ fill: '#ffffff60', fontSize: 11 }} />
                  <YAxis
                    type="category"
                    dataKey="bracket"
                    tick={{ fill: '#ffffff60', fontSize: 10 }}
                    width={130}
                  />
                  <Tooltip
                    contentStyle={{ background: '#16213E', border: 'none', borderRadius: 8 }}
                    itemStyle={{ color: '#fff', fontSize: 12 }}
                  />
                  <Bar dataKey="players" radius={[0, 4, 4, 0]}>
                    {d.eloBrackets.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>

        {/* ── Top Openings ── */}
        <Panel title="Aberturas Mais Populares">
          <div className="space-y-2">
            {d.topOpenings.map((o, i) => (
              <div key={o.name} className="flex items-center gap-3">
                <span className="text-xs text-white/30 w-4 font-body">{i + 1}.</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm text-white/80 font-body font-semibold">{o.name}</span>
                    <span className="text-xs text-white/40 font-body">{o.count} usos</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5">
                    <div
                      className="bg-kairos-accent rounded-full h-1.5"
                      style={{ width: `${o.winRate}%` }}
                    />
                  </div>
                  <span className="text-xs text-kairos-accent/60 font-body">{o.winRate}% WR</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* ── Recent Matches ── */}
        <Panel title="Partidas Recentes">
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-body">
              <thead>
                <tr className="text-white/40 border-b border-white/5">
                  <th className="text-left py-2 px-2">Data</th>
                  <th className="text-left py-2 px-2">Ouro</th>
                  <th className="text-left py-2 px-2">Prata</th>
                  <th className="text-center py-2 px-2">Resultado</th>
                  <th className="text-right py-2 px-2">Turnos</th>
                  <th className="text-right py-2 px-2">Duração</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_MATCHES.map(m => (
                  <tr key={m.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-2 px-2 text-white/40">{m.date}</td>
                    <td className="py-2 px-2 text-kairos-gold">{m.goldPlayer}</td>
                    <td className="py-2 px-2 text-kairos-silver">{m.silverPlayer}</td>
                    <td className="py-2 px-2 text-center">
                      {m.winner === 'draw' ? (
                        <span className="text-white/50">Empate</span>
                      ) : (
                        <span className={m.winner === 'gold' ? 'text-kairos-gold' : 'text-kairos-silver'}>
                          {m.winner === 'gold' ? m.goldPlayer : m.silverPlayer}
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-2 text-right text-white/60">{m.turns}</td>
                    <td className="py-2 px-2 text-right text-white/60">{m.duration}m</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        {/* ── Top Players ── */}
        <Panel title="Jogadores em Destaque">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {MOCK_PLAYERS.slice(0, 6).map(p => (
              <div key={p.id} className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-body font-semibold text-sm text-white/80">{p.username}</span>
                  <span className="text-xs text-kairos-accent font-body">{p.elo} ELO</span>
                </div>
                <div className="text-xs text-white/40 font-body">
                  {p.tier} · {p.gamesPlayed} jogos · {p.winRate}% WR
                </div>
                <div className="mt-2 w-full bg-white/5 rounded-full h-1">
                  <div
                    className="bg-kairos-success rounded-full h-1"
                    style={{ width: `${p.winRate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function KPI({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-kairos-bg-alt rounded-lg p-4 border border-white/5 text-center">
      <div className="text-xl font-display font-bold text-kairos-accent">{value}</div>
      <div className="text-xs text-white/40 font-body mt-1">{label}</div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-kairos-bg-alt rounded-lg p-4 border border-white/5">
      <h3 className="text-sm font-display font-bold text-white/70 mb-3">{title}</h3>
      {children}
    </div>
  );
}

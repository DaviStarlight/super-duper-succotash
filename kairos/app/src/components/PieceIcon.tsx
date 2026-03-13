import type { PieceType, Player } from '../engine/types';

interface Props {
  type: PieceType;
  owner: Player;
  exhausted?: boolean;
}

const SHAPES: Record<PieceType, (color: string) => JSX.Element> = {
  archon: (c) => (
    <>
      {/* Star / Crown */}
      <path
        d="M50 12 L58 36 L84 36 L63 52 L72 78 L50 62 L28 78 L37 52 L16 36 L42 36 Z"
        fill={c}
        stroke="#111"
        strokeWidth="2"
      />
    </>
  ),
  strategos: (c) => (
    <>
      {/* Diamond */}
      <path
        d="M50 10 L85 50 L50 90 L15 50 Z"
        fill={c}
        stroke="#111"
        strokeWidth="2"
      />
    </>
  ),
  hoplite: (c) => (
    <>
      {/* Shield (double circle) */}
      <circle cx="50" cy="50" r="36" fill={c} stroke="#111" strokeWidth="2" />
      <circle cx="50" cy="50" r="22" fill="none" stroke="#111" strokeWidth="2" opacity="0.5" />
    </>
  ),
  toxotes: (c) => (
    <>
      {/* Arrow / Upward triangle */}
      <path
        d="M50 12 L82 78 L50 62 L18 78 Z"
        fill={c}
        stroke="#111"
        strokeWidth="2"
      />
    </>
  ),
  hippeus: (c) => (
    <>
      {/* Horse head / L-shape */}
      <path
        d="M30 82 L30 30 L50 14 L70 30 L70 50 L56 50 L56 38 L44 38 L44 82 Z"
        fill={c}
        stroke="#111"
        strokeWidth="2"
      />
    </>
  ),
  doryphoros: (c) => (
    <>
      {/* Small filled circle — spear point */}
      <circle cx="50" cy="50" r="24" fill={c} stroke="#111" strokeWidth="2" />
    </>
  ),
};

const ABBREV: Record<PieceType, string> = {
  archon: 'Ar',
  strategos: 'St',
  hoplite: 'Ho',
  toxotes: 'To',
  hippeus: 'Hi',
  doryphoros: 'Do',
};

export default function PieceIcon({ type, owner, exhausted }: Props) {
  const baseColor = owner === 'gold' ? '#F0C040' : '#A8B8CC';
  const color = exhausted ? (owner === 'gold' ? '#8B7530' : '#5C6B7A') : baseColor;

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
      {SHAPES[type](color)}
      <text
        x="50"
        y="56"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="18"
        fontWeight="bold"
        fill={owner === 'gold' ? '#1A1A2E' : '#1A1A2E'}
        fontFamily="Inter, sans-serif"
        pointerEvents="none"
      >
        {ABBREV[type]}
      </text>
      {exhausted && (
        <g>
          <circle cx="82" cy="18" r="12" fill="#F39C12" stroke="#111" strokeWidth="1.5" />
          <text
            x="82" y="22"
            textAnchor="middle"
            fontSize="14"
            fill="#111"
            fontWeight="bold"
            fontFamily="Inter, sans-serif"
          >
            Z
          </text>
        </g>
      )}
    </svg>
  );
}

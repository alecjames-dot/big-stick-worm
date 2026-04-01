import { COLOR_MAP, GLOW_MAP, type WormColor, type WormHat, type WormShades } from '../types';

interface WormSVGProps {
  color: WormColor;
  hat: WormHat;
  shades: WormShades;
  animated?: boolean;
  size?: number;
}

function HatLayer({ hat, cx }: { hat: WormHat; cx: number }) {
  if (hat === 'none') return null;
  const y = 38; // base of hat — sits at crown of worm's head

  // ── Fedora ── soft felt, wide brim, pinched crown
  if (hat === 'fedora') return (
    <g>
      <ellipse cx={cx} cy={y} rx={26} ry={5} fill="#5a3518" />
      <path d={`M${cx-14},${y} C${cx-16},${y-7} ${cx-11},${y-20} ${cx},${y-22} C${cx+11},${y-20} ${cx+16},${y-7} ${cx+14},${y} Z`} fill="#7a4a28" />
      <path d={`M${cx-4},${y-22} Q${cx},${y-17} ${cx+4},${y-22}`} stroke="#5a3518" strokeWidth={1.5} fill="none" />
      <path d={`M${cx-13},${y-6} C${cx-15},${y-4} ${cx+15},${y-4} ${cx+13},${y-6}`} stroke="#c9a030" strokeWidth={3} fill="none" strokeLinecap="round" />
    </g>
  );

  // ── Panama ── lightweight cream straw, wide brim, green band
  if (hat === 'panama') return (
    <g>
      <ellipse cx={cx} cy={y} rx={27} ry={5} fill="#b89a50" />
      <path d={`M${cx-13},${y} C${cx-15},${y-7} ${cx-10},${y-19} ${cx},${y-21} C${cx+10},${y-19} ${cx+15},${y-7} ${cx+13},${y} Z`} fill="#e8d5a3" />
      {[y-6,y-11,y-16].map((ly,i) => <line key={i} x1={cx-10+i} y1={ly} x2={cx+10-i} y2={ly} stroke="#c9a96e" strokeWidth={0.8}/>)}
      <path d={`M${cx-13},${y-5} C${cx-15},${y-3} ${cx+15},${y-3} ${cx+13},${y-5}`} stroke="#3a6b3a" strokeWidth={3} fill="none" strokeLinecap="round" />
    </g>
  );

  // ── Bowler ── round hard crown, narrow brim, black
  if (hat === 'bowler') return (
    <g>
      <ellipse cx={cx} cy={y} rx={22} ry={4} fill="#111" />
      <ellipse cx={cx} cy={y-14} rx={16} ry={15} fill="#1e1e1e" />
      <ellipse cx={cx-4} cy={y-22} rx={5} ry={3} fill="rgba(255,255,255,0.06)" />
    </g>
  );

  // ── Trilby ── shorter than fedora, jaunty upturned brim
  if (hat === 'trilby') return (
    <g>
      <ellipse cx={cx} cy={y} rx={22} ry={4} fill="#2c1a10" />
      <ellipse cx={cx} cy={y-1} rx={18} ry={3} fill="#3d2518" />
      <path d={`M${cx-12},${y} C${cx-13},${y-6} ${cx-10},${y-16} ${cx},${y-18} C${cx+10},${y-16} ${cx+13},${y-6} ${cx+12},${y} Z`} fill="#3d2518" />
      <path d={`M${cx-11},${y-5} C${cx-13},${y-3} ${cx+13},${y-3} ${cx+11},${y-5}`} stroke="#b8860b" strokeWidth={2.5} fill="none" strokeLinecap="round" />
    </g>
  );

  // ── Akubra ── rugged Australian wide-brim felt
  if (hat === 'akubra') return (
    <g>
      <ellipse cx={cx} cy={y} rx={30} ry={5} fill="#7a5230" />
      <path d={`M${cx-14},${y} C${cx-16},${y-6} ${cx-11},${y-21} ${cx},${y-23} C${cx+11},${y-21} ${cx+16},${y-6} ${cx+14},${y} Z`} fill="#8b6040" />
      <line x1={cx} y1={y} x2={cx} y2={y-23} stroke="#6b4a28" strokeWidth={1.5} />
      <path d={`M${cx-14},${y-5} C${cx-16},${y-3} ${cx+16},${y-3} ${cx+14},${y-5}`} stroke="#3a2010" strokeWidth={2.5} fill="none" strokeLinecap="round" />
    </g>
  );

  // ── Bucket ── soft downward-sloping brim, utilitarian
  if (hat === 'bucket') return (
    <g>
      <ellipse cx={cx} cy={y+3} rx={25} ry={5} fill="#3a6b3a" />
      <rect x={cx-14} y={y-18} width={28} height={21} rx={5} fill="#4a8050" />
      <ellipse cx={cx} cy={y-18} rx={14} ry={4} fill="#4a8050" />
      <circle cx={cx-5} cy={y-8} r={1.5} fill="rgba(0,0,0,0.25)" />
      <circle cx={cx+5} cy={y-8} r={1.5} fill="rgba(0,0,0,0.25)" />
      <ellipse cx={cx} cy={y+2} rx={25} ry={3} fill="#336633" opacity={0.5} />
    </g>
  );

  // ── Baseball ── dome crown, forward visor
  if (hat === 'baseball') return (
    <g>
      <path d={`M${cx-16},${y} C${cx-18},${y-10} ${cx-14},${y-21} ${cx},${y-23} C${cx+14},${y-21} ${cx+18},${y-10} ${cx+16},${y} Z`} fill="#1e3a5f" />
      <path d={`M${cx-12},${y} Q${cx+4},${y+5} ${cx+24},${y-1} Q${cx+26},${y-5} ${cx+16},${y} Z`} fill="#163058" />
      <circle cx={cx} cy={y-23} r={2} fill="#163058" />
      <line x1={cx} y1={y} x2={cx} y2={y-23} stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
    </g>
  );

  // ── Newsboy ── puffy 8-panel crown, short stiff brim
  if (hat === 'newsboy') return (
    <g>
      <path d={`M${cx-13},${y} Q${cx+2},${y+5} ${cx+22},${y-1} Q${cx+24},${y-4} ${cx+14},${y} Z`} fill="#5c4a2a" />
      <ellipse cx={cx-2} cy={y-14} rx={18} ry={13} fill="#6b5534" />
      {[[-2,y-2,-2,y-28],[-2,y-2,-18,y-16],[-2,y-2,14,y-18]].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1+cx} y1={y1} x2={x2+cx} y2={y2} stroke="rgba(0,0,0,0.18)" strokeWidth={1}/>
      ))}
      <circle cx={cx-2} cy={y-26} r={2} fill="#5c4a2a" />
    </g>
  );

  // ── Beanie ── close-fitting knit, pompom
  if (hat === 'beanie') return (
    <g>
      <ellipse cx={cx} cy={y-12} rx={20} ry={14} fill="#ef4444" />
      <rect x={cx-20} y={y-4} width={40} height={8} rx={4} fill="#dc2626" />
      {[-14,-9,-4,1,6,11,16].map((dx) => (
        <line key={dx} x1={cx+dx} y1={y-4} x2={cx+dx} y2={y+4} stroke="rgba(0,0,0,0.15)" strokeWidth={1}/>
      ))}
      <circle cx={cx} cy={y-24} r={4} fill="#fca5a5" />
    </g>
  );

  // ── Cowboy ── wide-brimmed, high-crowned
  if (hat === 'cowboy') return (
    <g>
      <ellipse cx={cx} cy={y-6} rx={28} ry={5} fill="#7a3c08" />
      <path d={`M${cx-14},${y-6} Q${cx},${y-34} ${cx+14},${y-6}`} fill="#92400e" />
      <path d={`M${cx-12},${y-10} Q${cx},${y-11} ${cx+12},${y-10}`} stroke="#5a2800" strokeWidth={2} fill="none" />
    </g>
  );

  // ── Boater ── stiff straw, flat top, ribbon
  if (hat === 'boater') return (
    <g>
      <ellipse cx={cx} cy={y} rx={24} ry={4} fill="#b89a50" />
      <rect x={cx-13} y={y-18} width={26} height={18} fill="#e8d5a3" />
      <ellipse cx={cx} cy={y-18} rx={13} ry={4} fill="#ddc88a" />
      <rect x={cx-13} y={y-9} width={26} height={4} fill="#1e3a5f" />
      <line x1={cx-13} y1={y-8} x2={cx+13} y2={y-8} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
    </g>
  );

  // ── Homburg ── formal felt, curled brim, indented crown
  if (hat === 'homburg') return (
    <g>
      <ellipse cx={cx} cy={y} rx={24} ry={5} fill="#2a2a2a" />
      <ellipse cx={cx} cy={y-1} rx={19} ry={3} fill="#1a1a1a" />
      <path d={`M${cx-14},${y} C${cx-16},${y-7} ${cx-11},${y-22} ${cx},${y-24} C${cx+11},${y-22} ${cx+16},${y-7} ${cx+14},${y} Z`} fill="#222" />
      <path d={`M${cx-3},${y-24} Q${cx},${y-19} ${cx+3},${y-24}`} stroke="rgba(255,255,255,0.12)" strokeWidth={1.5} fill="none" />
      <line x1={cx-13} y1={y-7} x2={cx+13} y2={y-7} stroke="#444" strokeWidth={3} />
    </g>
  );

  // ── Beret ── soft round, droops to one side
  if (hat === 'beret') return (
    <g>
      <ellipse cx={cx+5} cy={y-11} rx={20} ry={11} fill="#cc2200" transform={`rotate(-8,${cx+5},${y-11})`} />
      <ellipse cx={cx} cy={y-2} rx={13} ry={3} fill="#991a00" />
      <circle cx={cx+12} cy={y-19} r={2} fill="#991a00" />
    </g>
  );

  // ── Snapback ── flat-brim cap, streetwear star logo
  if (hat === 'snapback') return (
    <g>
      <path d={`M${cx-16},${y} C${cx-18},${y-10} ${cx-14},${y-21} ${cx},${y-23} C${cx+14},${y-21} ${cx+18},${y-10} ${cx+16},${y} Z`} fill="#111" />
      <rect x={cx-16} y={y-3} width={36} height={5} rx={1} fill="#0a0a0a" />
      <circle cx={cx} cy={y-13} r={7} fill="rgba(255,255,255,0.05)" />
      <text x={cx} y={y-10} textAnchor="middle" fontSize={8} fill="#ff00cc" fontFamily="sans-serif">★</text>
      <circle cx={cx-13} cy={y-1} r={1.5} fill="#333" />
      <circle cx={cx-9}  cy={y-1} r={1.5} fill="#333" />
    </g>
  );

  // ── Top Hat ── tall cylindrical, ultimate formal
  if (hat === 'tophat') return (
    <g>
      <rect x={cx-18} y={y-30} width={36} height={24} rx={2} fill="#1a1a1a" />
      <rect x={cx-22} y={y-8} width={44} height={6} rx={3} fill="#111" />
      <line x1={cx-18} y1={y-7} x2={cx+18} y2={y-7} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
      <ellipse cx={cx-4} cy={y-26} rx={4} ry={2.5} fill="rgba(255,255,255,0.05)" />
    </g>
  );

  return null;
}

function ShadesLayer({ shades, cx, cy }: { shades: WormShades; cx: number; cy: number }) {
  if (shades === 'none') return null;

  if (shades === 'round') {
    return (
      <g>
        <circle cx={cx - 10} cy={cy} r={7} fill="#1a1a1a" opacity={0.85} />
        <circle cx={cx + 10} cy={cy} r={7} fill="#1a1a1a" opacity={0.85} />
        <line x1={cx - 3} y1={cy} x2={cx + 3} y2={cy} stroke="#1a1a1a" strokeWidth={2} />
        <line x1={cx - 17} y1={cy} x2={cx - 22} y2={cy - 2} stroke="#1a1a1a" strokeWidth={2} />
        <line x1={cx + 17} y1={cy} x2={cx + 22} y2={cy - 2} stroke="#1a1a1a" strokeWidth={2} />
      </g>
    );
  }
  if (shades === 'star') {
    const star = (x: number, y: number) => {
      const pts = [];
      for (let i = 0; i < 10; i++) {
        const r = i % 2 === 0 ? 7 : 3.5;
        const angle = (i * Math.PI * 2) / 10 - Math.PI / 2;
        pts.push(`${x + r * Math.cos(angle)},${y + r * Math.sin(angle)}`);
      }
      return pts.join(' ');
    };
    return (
      <g>
        <polygon points={star(cx - 10, cy)} fill="#fbbf24" opacity={0.9} />
        <polygon points={star(cx + 10, cy)} fill="#fbbf24" opacity={0.9} />
        <line x1={cx - 3} y1={cy} x2={cx + 3} y2={cy} stroke="#92400e" strokeWidth={2} />
      </g>
    );
  }
  if (shades === 'heart') {
    const heart = (x: number, y: number) =>
      `M${x},${y + 2} C${x},${y - 2} ${x - 6},${y - 6} ${x - 6},${y} C${x - 6},${y + 5} ${x},${y + 8} ${x},${y + 8} C${x},${y + 8} ${x + 6},${y + 5} ${x + 6},${y} C${x + 6},${y - 6} ${x},${y - 2} ${x},${y + 2}Z`;
    return (
      <g>
        <path d={heart(cx - 10, cy - 2)} fill="#f43f5e" opacity={0.9} />
        <path d={heart(cx + 10, cy - 2)} fill="#f43f5e" opacity={0.9} />
        <line x1={cx - 3} y1={cy} x2={cx + 3} y2={cy} stroke="#9f1239" strokeWidth={2} />
      </g>
    );
  }
  if (shades === 'visor') {
    return (
      <g>
        <rect x={cx - 22} y={cy - 5} width={44} height={10} rx={5} fill="#06b6d4" opacity={0.7} />
        <line x1={cx - 22} y1={cy - 5} x2={cx - 28} y2={cy - 3} stroke="#0e7490" strokeWidth={2} />
        <line x1={cx + 22} y1={cy - 5} x2={cx + 28} y2={cy - 3} stroke="#0e7490" strokeWidth={2} />
      </g>
    );
  }
  return null;
}

export function WormSVG({ color, hat, shades, animated = true, size = 200 }: WormSVGProps) {
  const bodyColor = COLOR_MAP[color];
  const glowColor = GLOW_MAP[color];
  const cx = 100;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible', filter: `drop-shadow(0 0 8px ${glowColor}) drop-shadow(0 0 20px ${glowColor.replace('0.7', '0.3')})` }}
    >
      <defs>
        <style>{`
          @keyframes wobble {
            0%, 100% { transform: rotate(-4deg) translateY(0px); }
            25% { transform: rotate(4deg) translateY(-4px); }
            50% { transform: rotate(-2deg) translateY(2px); }
            75% { transform: rotate(3deg) translateY(-2px); }
          }
          @keyframes blink {
            0%, 90%, 100% { transform: scaleY(1); }
            95% { transform: scaleY(0.1); }
          }
          .worm-body { transform-origin: 100px 120px; ${animated ? 'animation: wobble 1.8s ease-in-out infinite;' : ''} }
          .worm-eye { transform-origin: center; ${animated ? 'animation: blink 3s ease-in-out infinite;' : ''} }
        `}</style>
        <radialGradient id={`bodyGrad-${color}`} cx="35%" cy="30%" r="55%">
          <stop offset="0%" stopColor="white" stopOpacity="0.45" />
          <stop offset="60%" stopColor="white" stopOpacity="0.1" />
          <stop offset="100%" stopColor={bodyColor} stopOpacity="0" />
        </radialGradient>
        <filter id={`innerGlow-${color}`}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g className="worm-body">
        {/* Tail segments */}
        <ellipse cx={cx} cy={168} rx={14} ry={10} fill={bodyColor} />
        <ellipse cx={cx} cy={156} rx={17} ry={12} fill={bodyColor} />
        <ellipse cx={cx} cy={143} rx={20} ry={13} fill={bodyColor} />
        <ellipse cx={cx} cy={130} rx={22} ry={14} fill={bodyColor} />

        {/* Body */}
        <ellipse cx={cx} cy={115} rx={26} ry={20} fill={bodyColor} />

        {/* Segment lines */}
        <ellipse cx={cx} cy={143} rx={20} ry={3} fill="black" opacity={0.2} />
        <ellipse cx={cx} cy={156} rx={17} ry={3} fill="black" opacity={0.2} />

        {/* Shine */}
        <ellipse cx={cx} cy={115} rx={26} ry={20} fill={`url(#bodyGrad-${color})`} />

        {/* Head */}
        <ellipse cx={cx} cy={88} rx={32} ry={30} fill={bodyColor} />
        <ellipse cx={cx} cy={88} rx={32} ry={30} fill={`url(#bodyGrad-${color})`} />

        {/* Eyes */}
        <g className="worm-eye" style={{ transformOrigin: `${cx - 12}px 82px` }}>
          <circle cx={cx - 12} cy={82} r={9} fill="white" />
          <circle cx={cx - 10} cy={81} r={5} fill="#1a1a1a" />
          <circle cx={cx - 9} cy={79} r={1.5} fill="white" />
        </g>
        <g className="worm-eye" style={{ transformOrigin: `${cx + 12}px 82px` }}>
          <circle cx={cx + 12} cy={82} r={9} fill="white" />
          <circle cx={cx + 14} cy={81} r={5} fill="#1a1a1a" />
          <circle cx={cx + 15} cy={79} r={1.5} fill="white" />
        </g>

        {/* Smile */}
        <path
          d={`M${cx - 10},${98} Q${cx},${108} ${cx + 10},${98}`}
          stroke="#1a1a1a"
          strokeWidth={2.5}
          fill="none"
          strokeLinecap="round"
        />

        {/* Cheeks */}
        <ellipse cx={cx - 20} cy={96} rx={7} ry={4} fill={bodyColor} opacity={0.6} />
        <ellipse cx={cx + 20} cy={96} rx={7} ry={4} fill={bodyColor} opacity={0.6} />

        {/* Cosmetics */}
        <HatLayer hat={hat} cx={cx} />
        <ShadesLayer shades={shades} cx={cx} cy={82} />
      </g>
    </svg>
  );
}

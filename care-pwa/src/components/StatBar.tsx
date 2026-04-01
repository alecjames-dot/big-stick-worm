interface StatBarProps {
  label: string;
  value: number; // 0–100
  color: string;
  glowColor: string;
  icon: string;
}

export function StatBar({ label, value, color, glowColor, icon }: StatBarProps) {
  const pct = Math.round(Math.max(0, Math.min(100, value)));
  const isLow = pct < 25;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 10, color: isLow ? '#ff0055' : 'rgba(180,180,220,0.7)', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: 5 }}>
          <span>{icon}</span>
          <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7 }}>{label}</span>
        </span>
        <span
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 7,
            color: isLow ? '#ff0055' : color,
            textShadow: isLow ? '0 0 8px rgba(255,0,85,0.6)' : `0 0 6px ${glowColor}`,
          }}
        >
          {pct}%
        </span>
      </div>

      {/* Track */}
      <div
        style={{
          height: 10,
          borderRadius: 5,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Fill */}
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            borderRadius: 5,
            background: isLow
              ? 'linear-gradient(90deg, #ff0055, #ff4488)'
              : `linear-gradient(90deg, ${color}aa, ${color})`,
            boxShadow: isLow ? '0 0 6px rgba(255,0,85,0.5)' : `0 0 6px ${glowColor}`,
            transition: 'width 0.4s ease, background 0.4s ease',
          }}
        />
        {/* Scanline shimmer */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(255,255,255,0.04) 6px, rgba(255,255,255,0.04) 7px)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
}

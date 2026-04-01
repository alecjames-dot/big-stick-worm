import type { GameId } from './gameTypes';

interface GameMenuProps {
  onSelect: (game: GameId) => void;
  onClose: () => void;
}

const GAMES: { id: GameId; emoji: string; title: string; desc: string; xp: number; color: string }[] = [
  { id: 'wiggle-race',   emoji: '🏁', title: 'Wiggle Race',   desc: 'Tap like crazy to win the race',       xp: 15, color: '#00f5ff' },
  { id: 'bug-catch',     emoji: '🐛', title: 'Bug Catch',     desc: 'Catch bugs, dodge rocks',               xp: 20, color: '#aaff00' },
  { id: 'memory-munch',  emoji: '🧠', title: 'Memory Munch',  desc: 'Repeat the food sequence',              xp: 25, color: '#ff00cc' },
];

export function GameMenu({ onSelect, onClose }: GameMenuProps) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 50,
      background: 'rgba(6,0,15,0.96)',
      display: 'flex', flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid rgba(0,245,255,0.12)',
        flexShrink: 0,
      }}>
        <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: '#00f5ff', textShadow: '0 0 10px #00f5ff' }}>
          mini games
        </span>
        <button onClick={onClose} style={{
          background: 'none', border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 4, color: 'rgba(200,200,220,0.6)', fontSize: 13,
          padding: '6px 14px', cursor: 'pointer',
        }}>
          ← back
        </button>
      </div>

      {/* Game cards */}
      <div style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto' }}>
        {GAMES.map((g) => (
          <button
            key={g.id}
            onClick={() => onSelect(g.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 16,
              padding: '18px 20px',
              background: `${g.color}08`,
              border: `1px solid ${g.color}33`,
              borderRadius: 8,
              cursor: 'pointer',
              boxShadow: `0 0 12px ${g.color}18`,
              textAlign: 'left',
              WebkitTapHighlightColor: 'transparent',
              transition: 'all 0.15s',
            }}
          >
            <span style={{ fontSize: 40, lineHeight: 1, flexShrink: 0 }}>{g.emoji}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: g.color, textShadow: `0 0 8px ${g.color}`, margin: '0 0 6px 0', lineHeight: 1.5 }}>
                {g.title}
              </p>
              <p style={{ margin: '0 0 8px 0', color: 'rgba(180,180,220,0.65)', fontSize: 12 }}>{g.desc}</p>
              <span style={{
                fontFamily: "'Press Start 2P', monospace", fontSize: 7,
                color: '#fbbf24', textShadow: '0 0 6px rgba(251,191,36,0.5)',
              }}>
                +{g.xp} XP
              </span>
            </div>
            <span style={{ color: g.color, fontSize: 20, flexShrink: 0 }}>›</span>
          </button>
        ))}
      </div>
    </div>
  );
}

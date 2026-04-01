import type { GameResult } from './gameTypes';

interface GameResultProps {
  result: GameResult;
  gameName: string;
  onContinue: () => void;
}

export function GameResultScreen({ result, gameName, onContinue }: GameResultProps) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 10,
      background: 'rgba(6,0,15,0.95)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 28, padding: 32, textAlign: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      <div style={{ fontSize: 64, lineHeight: 1 }}>{result.won ? '🏆' : '💪'}</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{
          fontFamily: "'Press Start 2P', monospace", fontSize: 13, margin: 0,
          color: result.won ? '#aaff00' : '#00f5ff',
          textShadow: result.won ? '0 0 12px rgba(170,255,0,0.7)' : '0 0 12px rgba(0,245,255,0.7)',
          lineHeight: 1.8,
        }}>
          {result.won ? 'you won!' : 'nice try!'}
        </p>
        <p style={{ margin: 0, color: 'rgba(150,150,200,0.6)', fontSize: 12 }}>{gameName}</p>
      </div>

      {/* Stats */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(0,245,255,0.15)',
        borderRadius: 8, padding: '16px 28px',
        display: 'flex', gap: 32,
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 16, color: '#fbbf24', textShadow: '0 0 10px rgba(251,191,36,0.6)', margin: '0 0 6px 0' }}>
            +{result.xpGained}
          </p>
          <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: 'rgba(150,150,200,0.5)', margin: 0 }}>XP</p>
        </div>
        <div style={{ width: 1, background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 16, color: '#ff00cc', textShadow: '0 0 10px rgba(255,0,204,0.6)', margin: '0 0 6px 0' }}>
            +{result.moodBoost}
          </p>
          <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: 'rgba(150,150,200,0.5)', margin: 0 }}>MOOD</p>
        </div>
      </div>

      <button
        onClick={onContinue}
        style={{
          fontFamily: "'Press Start 2P', monospace", fontSize: 9,
          padding: '14px 28px', borderRadius: 4,
          border: '1px solid rgba(0,245,255,0.4)',
          background: 'rgba(0,245,255,0.08)',
          color: '#00f5ff', textShadow: '0 0 8px #00f5ff',
          cursor: 'pointer', letterSpacing: '0.04em',
          boxShadow: '0 0 12px rgba(0,245,255,0.2)',
        }}
      >
        back to worm →
      </button>
    </div>
  );
}

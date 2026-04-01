import { type WormState, type WormExpression, COLOR_MAP, GLOW_MAP } from '../types';
import { WormSVG } from './WormSVG';
import { StatBar } from './StatBar';
import { ActionButton } from './ActionButton';

interface CareScreenProps {
  worm: WormState;
  onFeed: () => void;
  onCuddle: () => void;
  onOpenGames: () => void;
  onHeal: () => void;
}

const STAGE_LABEL: Record<WormState['stage'], string> = {
  baby: 'BABY',
  adult: 'ADULT',
  elder: 'ELDER',
};

const STAGE_COLOR: Record<WormState['stage'], string> = {
  baby:  '#00f5ff',
  adult: '#aaff00',
  elder: '#fbbf24',
};

function deriveExpression(worm: WormState): WormExpression {
  if (worm.isSick)       return 'sick';
  if (worm.mood < 30)    return 'sad';
  if (worm.mood > 75)    return 'happy';
  return 'neutral';
}

function StageBadge({ stage }: { stage: WormState['stage'] }) {
  const color = STAGE_COLOR[stage];
  return (
    <span
      style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: 7,
        color,
        textShadow: `0 0 8px ${color}`,
        border: `1px solid ${color}55`,
        background: `${color}12`,
        borderRadius: 3,
        padding: '4px 8px',
        letterSpacing: '0.06em',
      }}
    >
      {STAGE_LABEL[stage]}
    </span>
  );
}

function XpBar({ xp, stage }: { xp: number; stage: WormState['stage'] }) {
  const nextThreshold = stage === 'baby' ? 500 : stage === 'adult' ? 2000 : null;
  if (!nextThreshold) return null;
  const pct = Math.min(100, Math.round((xp / nextThreshold) * 100));

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: 'rgba(150,150,200,0.5)', whiteSpace: 'nowrap' }}>
        XP {xp}/{nextThreshold}
      </span>
      <div style={{ flex: 1, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          borderRadius: 2,
          background: 'linear-gradient(90deg, #cc00ff, #00f5ff)',
          boxShadow: '0 0 4px rgba(0,245,255,0.4)',
          transition: 'width 0.4s ease',
        }} />
      </div>
    </div>
  );
}

export function CareScreen({ worm, onFeed, onCuddle, onOpenGames, onHeal }: CareScreenProps) {
  const color    = COLOR_MAP[worm.color];
  const glow     = GLOW_MAP[worm.color];
  const expr     = deriveExpression(worm);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100dvh',
      background: 'linear-gradient(160deg, #06000f 0%, #0a0020 50%, #060010 100%)',
      color: '#e0e0ff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflow: 'hidden',
      position: 'relative',
    }}>

      {/* ── Nebula blobs ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', top: '-15%', left: '-10%',
          background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`, transition: 'background 0.6s' }} />
        <div style={{ position: 'absolute', width: 350, height: 350, borderRadius: '50%', bottom: '0', right: '-10%',
          background: 'radial-gradient(circle, rgba(0,120,255,0.10) 0%, transparent 70%)' }} />
      </div>

      {/* ── Header ── */}
      <div style={{
        position: 'relative', zIndex: 1,
        padding: '16px 20px 12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(0,245,255,0.1)',
        background: 'rgba(6,0,15,0.6)',
        backdropFilter: 'blur(8px)',
        flexShrink: 0,
      }}>
        <div>
          <p style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 10,
            margin: '0 0 4px 0',
            color,
            textShadow: `0 0 10px ${glow}`,
            lineHeight: 1.4,
          }}>
            {worm.name}
          </p>
          {worm.isSick && (
            <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: '#ff0055',
              textShadow: '0 0 6px rgba(255,0,85,0.7)', animation: 'pulse 1s ease-in-out infinite' }}>
              😷 sick
            </span>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          <StageBadge stage={worm.stage} />
          <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: 'rgba(150,150,200,0.4)' }}>
            🔥 {worm.loginStreak}d
          </span>
        </div>
      </div>

      {/* ── Worm hero ── */}
      <div style={{
        position: 'relative', zIndex: 1,
        flex: '1 1 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 0,
        padding: '8px 0',
      }}>
        <div style={{
          background: `radial-gradient(circle at 45% 40%, ${color}14 0%, transparent 65%)`,
          border: `1px solid ${color}22`,
          borderRadius: 16,
          padding: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 0 30px ${glow.replace('0.7','0.1')}`,
          transition: 'all 0.5s ease',
        }}>
          <WormSVG
            color={worm.color}
            hat={worm.hat}
            shades={worm.shades}
            expression={expr}
            size={200}
          />
        </div>
      </div>

      {/* ── Stats panel ── */}
      <div style={{
        position: 'relative', zIndex: 1,
        padding: '12px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        flexShrink: 0,
      }}>
        <StatBar label="MOOD"  value={worm.mood}   color={color} glowColor={glow} icon="💜" />
        <StatBar label="FOOD"  value={worm.hunger} color="#aaff00" glowColor="rgba(170,255,0,0.6)" icon="🍕" />
        <XpBar xp={worm.xp} stage={worm.stage} />
      </div>

      {/* ── Action buttons ── */}
      <div style={{
        position: 'relative', zIndex: 1,
        padding: '8px 12px 20px',
        display: 'flex',
        gap: 8,
        flexShrink: 0,
        paddingBottom: 'max(20px, env(safe-area-inset-bottom, 20px))',
      }}>
        <ActionButton label="FEED"   emoji="🍕" color={color} glowColor={glow} onClick={onFeed} />
        <ActionButton label="PLAY"   emoji="🎮" color={color} glowColor={glow} onClick={onOpenGames} />
        <ActionButton label="CUDDLE" emoji="🤗" color={color} glowColor={glow} onClick={onCuddle} />
        {worm.isSick && (
          <ActionButton label="HEAL" emoji="💊" color="#ff0055" glowColor="rgba(255,0,85,0.7)" onClick={onHeal} />
        )}
      </div>
    </div>
  );
}

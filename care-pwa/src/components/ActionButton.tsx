import { useState } from 'react';

interface ActionButtonProps {
  label: string;
  emoji: string;
  color: string;
  glowColor: string;
  onClick: () => void;
  disabled?: boolean;
}

export function ActionButton({ label, emoji, color, glowColor, onClick, disabled = false }: ActionButtonProps) {
  const [pressed, setPressed] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    setPressed(true);
    onClick();
    setTimeout(() => setPressed(false), 150);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      style={{
        flex: '1 1 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        padding: '14px 8px',
        borderRadius: 6,
        border: `1px solid ${disabled ? 'rgba(255,255,255,0.06)' : `${color}55`}`,
        background: disabled
          ? 'rgba(255,255,255,0.02)'
          : pressed
          ? `${color}20`
          : 'rgba(255,255,255,0.03)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: disabled ? 'none' : pressed ? `0 0 16px ${glowColor}` : `0 0 6px ${glowColor.replace('0.7','0.15')}`,
        transform: pressed ? 'scale(0.94)' : 'scale(1)',
        transition: 'all 0.12s ease',
        WebkitTapHighlightColor: 'transparent',
        userSelect: 'none',
      }}
    >
      <span style={{ fontSize: 26, lineHeight: 1 }}>{emoji}</span>
      <span
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 7,
          color: disabled ? 'rgba(255,255,255,0.2)' : color,
          textShadow: disabled ? 'none' : `0 0 6px ${glowColor}`,
          letterSpacing: '0.04em',
        }}
      >
        {label}
      </span>
    </button>
  );
}

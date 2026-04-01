export function WelcomeScreen() {
  return (
    <div style={{
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(160deg, #06000f 0%, #0a0020 50%, #060010 100%)',
      color: '#e0e0ff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: 32,
      textAlign: 'center',
      gap: 32,
    }}>
      {/* Animated worm egg */}
      <div style={{ position: 'relative' }}>
        <div style={{
          width: 120,
          height: 140,
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          background: 'linear-gradient(135deg, #cc00ff44, #00f5ff22)',
          border: '2px solid rgba(0,245,255,0.3)',
          boxShadow: '0 0 30px rgba(0,245,255,0.2), 0 0 60px rgba(204,0,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 48,
          animation: 'eggFloat 3s ease-in-out infinite',
        }}>
          🪱
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 12,
          margin: 0,
          color: '#00f5ff',
          textShadow: '0 0 12px #00f5ff, 0 0 30px rgba(0,245,255,0.4)',
          lineHeight: 1.8,
        }}>
          Worm Care
        </h1>
        <p style={{ margin: 0, color: 'rgba(150,150,200,0.6)', fontSize: 13, lineHeight: 1.6 }}>
          Your worm is waiting to be hatched.
        </p>
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(0,245,255,0.15)',
        borderRadius: 8,
        padding: '20px 24px',
        maxWidth: 300,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}>
        <p style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 7,
          color: '#00f5ff',
          textShadow: '0 0 6px #00f5ff',
          margin: 0,
          lineHeight: 2,
        }}>
          How to get started:
        </p>
        <ol style={{ margin: 0, paddingLeft: 20, color: 'rgba(180,180,220,0.7)', fontSize: 12, lineHeight: 2, textAlign: 'left' }}>
          <li>Visit the <strong style={{ color: '#e0e0ff' }}>Worm Creator Studio</strong> on desktop</li>
          <li>Design your worm</li>
          <li>Scan the QR code with this phone</li>
        </ol>
      </div>

      <style>{`
        @keyframes eggFloat {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50%       { transform: translateY(-12px) rotate(2deg); }
        }
      `}</style>
    </div>
  );
}

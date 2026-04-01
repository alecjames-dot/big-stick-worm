import { useMemo, useState } from 'react';
import { useWorm } from './hooks/useWorm';
import { CareScreen } from './components/CareScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { GameMenu } from './components/games/GameMenu';
import { WiggleRace } from './components/games/WiggleRace';
import { BugCatch } from './components/games/BugCatch';
import { MemoryMunch } from './components/games/MemoryMunch';
import type { GameId, GameResult } from './components/games/gameTypes';

type Screen = 'care' | 'game-menu' | GameId;

function getToken(): string | null {
  const params = new URLSearchParams(window.location.search);
  const urlToken = params.get('token');
  if (urlToken) {
    localStorage.setItem('worm_token', urlToken);
    window.history.replaceState({}, '', window.location.pathname + window.location.hash);
    return urlToken;
  }
  return localStorage.getItem('worm_token');
}

export default function App() {
  const token = useMemo(() => getToken(), []);
  const { worm, feed, cuddle, completeGame, heal } = useWorm(token);
  const [screen, setScreen] = useState<Screen>('care');

  if (!token || !worm) return <WelcomeScreen />;

  const handleGameComplete = (result: GameResult) => {
    completeGame(result.xpGained, result.moodBoost);
    setScreen('care');
  };

  const gameProps = { onComplete: handleGameComplete, onExit: () => setScreen('care') };

  return (
    <>
      <CareScreen
        worm={worm}
        onFeed={feed}
        onCuddle={cuddle}
        onOpenGames={() => setScreen('game-menu')}
        onHeal={heal}
      />

      {screen === 'game-menu' && (
        <GameMenu onSelect={(id) => setScreen(id)} onClose={() => setScreen('care')} />
      )}
      {screen === 'wiggle-race'  && <WiggleRace  {...gameProps} />}
      {screen === 'bug-catch'    && <BugCatch    {...gameProps} />}
      {screen === 'memory-munch' && <MemoryMunch {...gameProps} />}
    </>
  );
}

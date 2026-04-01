export type WormColor = 'pink' | 'green' | 'purple' | 'orange' | 'blue' | 'red' | 'yellow';

export type WormHat =
  | 'none'
  | 'fedora'
  | 'panama'
  | 'bowler'
  | 'trilby'
  | 'akubra'
  | 'bucket'
  | 'baseball'
  | 'newsboy'
  | 'beanie'
  | 'cowboy'
  | 'boater'
  | 'homburg'
  | 'beret'
  | 'snapback'
  | 'tophat';

export type WormShades = 'none' | 'round' | 'star' | 'heart' | 'visor';

export type WormTrait = 'sleepy' | 'hyper' | 'grumpy' | 'chill' | 'bubbly' | 'spooky';

export interface WormConfig {
  name: string;
  color: WormColor;
  hat: WormHat;
  shades: WormShades;
  trait: WormTrait;
}

export interface CreatedWorm {
  id: string;
  ownerToken: string;
  config: WormConfig;
}

export const COLOR_MAP: Record<WormColor, string> = {
  pink: '#ff00cc',
  green: '#aaff00',
  purple: '#cc00ff',
  orange: '#ff6600',
  blue: '#00f5ff',
  red: '#ff0055',
  yellow: '#ffff00',
};

export const GLOW_MAP: Record<WormColor, string> = {
  pink: 'rgba(255, 0, 204, 0.7)',
  green: 'rgba(170, 255, 0, 0.7)',
  purple: 'rgba(204, 0, 255, 0.7)',
  orange: 'rgba(255, 102, 0, 0.7)',
  blue: 'rgba(0, 245, 255, 0.7)',
  red: 'rgba(255, 0, 85, 0.7)',
  yellow: 'rgba(255, 255, 0, 0.7)',
};

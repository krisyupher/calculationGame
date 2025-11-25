import { GameType } from './game-type.enum';

/**
 * Game Metadata Interface
 * Describes properties and information about each game
 */
export interface GameMetadata {
  id: GameType;
  title: string;
  description: string;
  icon: string;
  route: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  skills: string[];
  color: string;
}

/**
 * Game Metadata Map
 * Contains metadata for all available games
 */
export const GAME_METADATA_MAP: Record<GameType, GameMetadata> = {
  [GameType.SUM_MEMORY]: {
    id: GameType.SUM_MEMORY,
    title: 'Sum Memory Game',
    description: 'Watch numbers appear one by one, remember them, and calculate their sum!',
    icon: '🧮',
    route: '/sum-memory',
    difficulty: 'Medium',
    skills: ['Memory', 'Mental Math', 'Focus'],
    color: '#6366f1',
  },
  [GameType.POSITION_NUMBER]: {
    id: GameType.POSITION_NUMBER,
    title: 'Position the Number',
    description: 'See a number and click where it belongs on the range bar. Test your number sense!',
    icon: '🎯',
    route: '/position-number',
    difficulty: 'Easy',
    skills: ['Number Sense', 'Spatial Reasoning', 'Estimation'],
    color: '#10b981',
  },
};

/**
 * Game Models Index
 * Centralized exports for all game models
 */

export type {
  GameConfig,
} from './game-config.model';
export {
  DEFAULT_GAME_CONFIG,
  GameConfigValidator,
} from './game-config.model';
export type {
  GameState,
  GameResult,
} from './game-state.model';
export {
  INITIAL_GAME_STATE,
  calculateGameResult,
} from './game-state.model';
export {
  ScreenType,
  isValidScreenType,
  getScreenName,
} from './screen-type.enum';
export type {
  CountdownStep,
} from './countdown-step.model';
export {
  COUNTDOWN_SEQUENCE,
  getLightColor,
} from './countdown-step.model';

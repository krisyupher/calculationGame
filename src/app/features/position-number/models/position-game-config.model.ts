/**
 * Position Game Configuration
 * Defines configurable parameters for the Position Number game
 */
export interface PositionGameConfig {
  minNumber: number;
  maxNumber: number;
  roundCount: number;
  feedbackDuration: number; // milliseconds
  barWidth: number; // pixels, for position calculation
}

/**
 * Default Position Game Configuration
 */
export const DEFAULT_POSITION_GAME_CONFIG: PositionGameConfig = {
  minNumber: 0,
  maxNumber: 100,
  roundCount: 10,
  feedbackDuration: 1500,
  barWidth: 400,
};

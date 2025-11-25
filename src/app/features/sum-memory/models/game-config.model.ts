/**
 * Game Configuration Model
 * Defines the configuration structure for game difficulty and timing settings
 */

export interface GameConfig {
  /** Number of numbers to display in each game */
  numberCount: number;

  /** Minimum value for random number generation */
  minNumber: number;

  /** Maximum value for random number generation */
  maxNumber: number;

  /** Duration in milliseconds to display each number */
  displayDuration: number;

  /** Pause duration in milliseconds between numbers */
  pauseDuration: number;
}

/**
 * Default game configuration
 * Used as fallback and initial values
 */
export const DEFAULT_GAME_CONFIG: GameConfig = {
  numberCount: 5,
  minNumber: 1,
  maxNumber: 10,
  displayDuration: 1500, // 1.5 seconds per number
  pauseDuration: 500, // 0.5 seconds pause between numbers
};

/**
 * Game configuration validation rules
 */
export class GameConfigValidator {
  /**
   * Validate game configuration
   * @param config Configuration to validate
   * @returns true if valid, false otherwise
   */
  static validate(config: GameConfig): boolean {
    return (
      config.numberCount > 0 &&
      config.minNumber >= 0 &&
      config.maxNumber > config.minNumber &&
      config.displayDuration >= 100 &&
      config.pauseDuration >= 0
    );
  }

  /**
   * Get validation error message
   * @param config Configuration to validate
   * @returns Error message or empty string if valid
   */
  static getErrorMessage(config: GameConfig): string {
    if (config.numberCount <= 0) {
      return 'Number count must be greater than 0';
    }
    if (config.minNumber < 0) {
      return 'Minimum number cannot be negative';
    }
    if (config.maxNumber <= config.minNumber) {
      return 'Maximum number must be greater than minimum number';
    }
    if (config.displayDuration < 100) {
      return 'Display duration must be at least 100ms';
    }
    if (config.pauseDuration < 0) {
      return 'Pause duration cannot be negative';
    }
    return '';
  }
}

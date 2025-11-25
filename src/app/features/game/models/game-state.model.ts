/**
 * Game State Model
 * Represents the current state of a game session
 */

export interface GameState {
  /** Array of numbers generated for the current game */
  numbers: number[];

  /** Calculated correct sum of all numbers */
  sum: number;

  /** Index of current number being displayed (0-based) */
  currentNumberIndex: number;

  /** User's answer, null if not submitted yet */
  userAnswer: number | null;

  /** Whether the game is currently in playing state */
  isPlaying: boolean;

  /** Timestamp of game start */
  startTime?: number;
}

/**
 * Initial/default game state
 * Used to reset the state between games
 */
export const INITIAL_GAME_STATE: GameState = {
  numbers: [],
  sum: 0,
  currentNumberIndex: 0,
  userAnswer: null,
  isPlaying: false,
};

/**
 * Game Result Interface
 * Represents the result of a completed game
 */
export interface GameResult {
  /** Whether the user's answer was correct */
  isCorrect: boolean;

  /** The user's submitted answer */
  userAnswer: number;

  /** The correct sum */
  correctAnswer: number;

  /** Result title (Correct! / Wrong!) */
  title: string;

  /** Result message for display */
  message: string;

  /** Emoji icon to display */
  icon: string;
}

/**
 * Helper function to determine game result
 * @param userAnswer User's submitted answer
 * @param correctSum The correct sum
 * @returns GameResult object
 */
export function calculateGameResult(
  userAnswer: number,
  correctSum: number
): GameResult {
  const isCorrect = userAnswer === correctSum;

  return {
    isCorrect,
    userAnswer,
    correctAnswer: correctSum,
    title: isCorrect ? 'Correct!' : 'Wrong!',
    message: isCorrect
      ? 'Great memory and calculation skills!'
      : 'Close, but not quite. Try again!',
    icon: isCorrect ? '🎉' : '❌',
  };
}

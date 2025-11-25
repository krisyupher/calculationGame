import { PositionGuess } from './position-guess.interface';

/**
 * Position Round
 * Represents a single round of the Position Number game
 */
export interface PositionRound {
  roundNumber: number;
  targetNumber: number; // The number player needs to position
  playerGuess?: PositionGuess; // Player's position guess
  accuracy: number; // 0-100, how close they were
  points: number; // Points earned in this round
}

/**
 * Position Game State
 * Represents the complete game state for Position Number game
 */
export interface PositionGameState {
  rounds: PositionRound[];
  currentRoundNumber: number;
  totalScore: number;
  isGameOver: boolean;
  startTime: number; // Date.now() when game started
  endTime?: number; // Date.now() when game ended
}

/**
 * Initial Position Game State
 */
export const getInitialPositionGameState = (): PositionGameState => ({
  rounds: [],
  currentRoundNumber: 1,
  totalScore: 0,
  isGameOver: false,
  startTime: Date.now(),
});

/**
 * Position Guess Interface
 * Represents a player's guess on the position bar
 */
export interface PositionGuess {
  position: number; // 0-100, representing percentage on the bar
  timestamp: number; // Date.now() when guess was made
}

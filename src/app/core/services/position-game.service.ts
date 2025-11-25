import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  PositionGameConfig,
  DEFAULT_POSITION_GAME_CONFIG,
  PositionGameState,
  PositionRound,
  PositionGuess,
  getInitialPositionGameState,
} from '@app/features/position-number/models';

/**
 * Position Game Service
 * Manages game logic for the Position Number game
 */
@Injectable({ providedIn: 'root' })
export class PositionGameService {
  private config: PositionGameConfig = DEFAULT_POSITION_GAME_CONFIG;
  private gameState = new BehaviorSubject<PositionGameState>(
    getInitialPositionGameState()
  );

  gameState$: Observable<PositionGameState> = this.gameState.asObservable();

  /**
   * Initialize game with configuration
   */
  initializeGame(config: PositionGameConfig): void {
    this.config = config;
    this.gameState.next(getInitialPositionGameState());
  }

  /**
   * Start a new round
   */
  startNewRound(): PositionRound {
    const state = this.gameState.value;
    const targetNumber = this.generateRandomNumber();

    const newRound: PositionRound = {
      roundNumber: state.currentRoundNumber,
      targetNumber,
      accuracy: 0,
      points: 0,
    };

    return newRound;
  }

  /**
   * Process player's position guess
   * Calculates accuracy and points based on the guess
   */
  submitGuess(round: PositionRound, positionGuess: PositionGuess): PositionRound {
    const updatedRound = { ...round, playerGuess: positionGuess };

    // Calculate accuracy based on target number and position guess
    // Position is 0-100, target number needs to be normalized to 0-100 range
    const normalizedTarget = this.normalizeNumberToPosition(round.targetNumber);
    const difference = Math.abs(normalizedTarget - positionGuess.position);

    // Accuracy: 100 - difference (100 is perfect, 0 is completely wrong)
    updatedRound.accuracy = Math.max(0, 100 - difference);

    // Points calculation: round accuracy to nearest integer
    updatedRound.points = Math.round(updatedRound.accuracy);

    return updatedRound;
  }

  /**
   * Complete current round and prepare for next
   */
  completeRound(round: PositionRound): void {
    const state = this.gameState.value;
    const updatedRounds = [...state.rounds, round];
    const newScore = state.totalScore + round.points;
    const isGameOver = updatedRounds.length >= this.config.roundCount;

    const newState: PositionGameState = {
      ...state,
      rounds: updatedRounds,
      currentRoundNumber: state.currentRoundNumber + 1,
      totalScore: newScore,
      isGameOver,
      endTime: isGameOver ? Date.now() : undefined,
    };

    this.gameState.next(newState);
  }

  /**
   * End game prematurely
   */
  endGame(): void {
    const state = this.gameState.value;
    state.isGameOver = true;
    state.endTime = Date.now();
    this.gameState.next(state);
  }

  /**
   * Get current game state
   */
  getGameState(): PositionGameState {
    return this.gameState.value;
  }

  /**
   * Reset game state
   */
  resetGame(): void {
    this.gameState.next(getInitialPositionGameState());
  }

  /**
   * Generate random number within configured range
   */
  private generateRandomNumber(): number {
    const min = Math.ceil(this.config.minNumber);
    const max = Math.floor(this.config.maxNumber);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Normalize a number to 0-100 position range
   * Maps minNumber -> 0 and maxNumber -> 100
   */
  private normalizeNumberToPosition(number: number): number {
    const range = this.config.maxNumber - this.config.minNumber;
    if (range === 0) return 50; // Edge case: min equals max

    return (
      ((number - this.config.minNumber) / range) * 100
    );
  }

  /**
   * Calculate game duration in seconds
   */
  getGameDuration(): number {
    const state = this.gameState.value;
    const endTime = state.endTime || Date.now();
    return Math.round((endTime - state.startTime) / 1000);
  }

  /**
   * Get average accuracy across all rounds
   */
  getAverageAccuracy(): number {
    const state = this.gameState.value;
    if (state.rounds.length === 0) return 0;

    const totalAccuracy = state.rounds.reduce(
      (sum, round) => sum + round.accuracy,
      0
    );
    return Math.round(totalAccuracy / state.rounds.length);
  }

  /**
   * Get best round based on accuracy
   */
  getBestRound(): PositionRound | null {
    const state = this.gameState.value;
    if (state.rounds.length === 0) return null;

    return state.rounds.reduce((best, current) =>
      current.accuracy > best.accuracy ? current : best
    );
  }

  /**
   * Get worst round based on accuracy
   */
  getWorstRound(): PositionRound | null {
    const state = this.gameState.value;
    if (state.rounds.length === 0) return null;

    return state.rounds.reduce((worst, current) =>
      current.accuracy < worst.accuracy ? current : worst
    );
  }
}

import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  GameConfig,
  GameState,
  ScreenType,
  CountdownStep,
  COUNTDOWN_SEQUENCE,
  DEFAULT_GAME_CONFIG,
  INITIAL_GAME_STATE,
  calculateGameResult,
} from '@app/features/sum-memory/models';
import { ConfigService } from './config.service';

/**
 * Sum Memory Game Service
 * Manages sum memory game state, flow, and logic
 */
@Injectable({ providedIn: 'root' })
export class SumMemoryGameService {
  private configService = inject(ConfigService);

  // State management
  private gameStateSubject = new BehaviorSubject<GameState>(INITIAL_GAME_STATE);
  public gameState$ = this.gameStateSubject.asObservable();

  private currentScreenSubject = new BehaviorSubject<ScreenType>(
    ScreenType.START
  );
  public currentScreen$ = this.currentScreenSubject.asObservable();

  private configSubject = new BehaviorSubject<GameConfig>(
    this.configService.loadConfig()
  );
  public config$ = this.configSubject.asObservable();

  private countdownStepSubject = new BehaviorSubject<CountdownStep | null>(
    null
  );
  public countdownStep$ = this.countdownStepSubject.asObservable();

  private countdownTimeSubject = new BehaviorSubject<number>(0);
  public countdownTime$ = this.countdownTimeSubject.asObservable();

  private currentNumberSubject = new BehaviorSubject<number | null>(null);
  public currentNumber$ = this.currentNumberSubject.asObservable();

  private numberIndexSubject = new BehaviorSubject<number>(0);
  public numberIndex$ = this.numberIndexSubject.asObservable();

  private countdownIntervalId: any;
  private numberSequenceTimeoutId: any;

  constructor() {}

  /**
   * Start a new game
   */
  startGame(config?: GameConfig): void {
    const gameConfig = config || this.configSubject.value;

    // Validate and save config
    if (config) {
      this.configService.saveConfig(gameConfig);
      this.configSubject.next(gameConfig);
    }

    // Generate numbers
    const numbers = this.generateNumbers(gameConfig);
    const sum = this.calculateSum(numbers);

    // Initialize game state
    const newGameState: GameState = {
      numbers,
      sum,
      currentNumberIndex: 0,
      userAnswer: null,
      isPlaying: true,
    };

    this.gameStateSubject.next(newGameState);

    // Start countdown
    this.runCountdown();
  }

  /**
   * Start the countdown sequence (red → yellow → green)
   */
  private runCountdown(): void {
    let stepIndex = 0;
    const steps = COUNTDOWN_SEQUENCE;

    const showNextStep = () => {
      if (stepIndex < steps.length) {
        const step = steps[stepIndex];
        this.countdownStepSubject.next(step);
        this.currentScreenSubject.next(ScreenType.COUNTDOWN);

        this.countdownIntervalId = setTimeout(() => {
          stepIndex++;
          showNextStep();
        }, step.duration);
      } else {
        // Countdown complete, start number sequence
        this.countdownStepSubject.next(null);
        this.playNumberSequence();
      }
    };

    showNextStep();
  }

  /**
   * Play the number sequence one by one
   */
  private playNumberSequence(): void {
    const state = this.gameStateSubject.value;
    const config = this.configSubject.value;
    let numberIndex = 0;

    const showNextNumber = () => {
      if (numberIndex < state.numbers.length) {
        const number = state.numbers[numberIndex];

        // Update screen and display number
        this.currentScreenSubject.next(ScreenType.PLAYING);
        this.currentNumberSubject.next(number);
        this.numberIndexSubject.next(numberIndex);

        // Clear number after display duration
        this.numberSequenceTimeoutId = setTimeout(() => {
          this.currentNumberSubject.next(null);

          // Show pause, then next number
          setTimeout(() => {
            numberIndex++;
            showNextNumber();
          }, config.pauseDuration);
        }, config.displayDuration);
      } else {
        // All numbers shown, transition to input
        this.transitionToInput();
      }
    };

    showNextNumber();
  }

  /**
   * Transition to input screen
   */
  private transitionToInput(): void {
    this.currentScreenSubject.next(ScreenType.INPUT);
    this.currentNumberSubject.next(null);
  }

  /**
   * Submit user's answer
   */
  submitAnswer(answer: number): void {
    const state = this.gameStateSubject.value;
    const result = calculateGameResult(answer, state.sum);

    // Update game state
    const updatedState: GameState = {
      ...state,
      userAnswer: answer,
      isPlaying: false,
    };
    this.gameStateSubject.next(updatedState);

    // Transition to result screen
    this.currentScreenSubject.next(ScreenType.RESULT);
  }

  /**
   * Reset game and return to start screen
   */
  resetGame(): void {
    // Clear any pending timeouts
    if (this.countdownIntervalId) clearTimeout(this.countdownIntervalId);
    if (this.numberSequenceTimeoutId) clearTimeout(this.numberSequenceTimeoutId);

    // Reset state
    this.gameStateSubject.next(INITIAL_GAME_STATE);
    this.currentScreenSubject.next(ScreenType.START);
    this.countdownStepSubject.next(null);
    this.currentNumberSubject.next(null);
    this.numberIndexSubject.next(0);
  }

  /**
   * Update game configuration
   */
  updateConfig(config: GameConfig): void {
    this.configService.saveConfig(config);
    this.configSubject.next(config);
  }

  /**
   * Navigate to settings screen
   */
  goToSettings(): void {
    this.currentScreenSubject.next(ScreenType.SETTINGS);
  }

  /**
   * Generate random numbers
   */
  private generateNumbers(config: GameConfig): number[] {
    const numbers: number[] = [];
    for (let i = 0; i < config.numberCount; i++) {
      const randomNum = Math.floor(
        Math.random() * (config.maxNumber - config.minNumber + 1) +
          config.minNumber
      );
      numbers.push(randomNum);
    }
    return numbers;
  }

  /**
   * Calculate sum of numbers
   */
  private calculateSum(numbers: number[]): number {
    return numbers.reduce((sum, num) => sum + num, 0);
  }

  /**
   * Get current game state
   */
  getGameState(): GameState {
    return this.gameStateSubject.value;
  }

  /**
   * Get current config
   */
  getConfig(): GameConfig {
    return this.configSubject.value;
  }

  /**
   * Get current screen
   */
  getCurrentScreen(): ScreenType {
    return this.currentScreenSubject.value;
  }
}

import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  PositionGameService,
  ConfigService,
} from '@app/core/services';
import {
  PositionScreenType,
  PositionGameConfig,
  DEFAULT_POSITION_GAME_CONFIG,
  PositionRound,
  PositionGuess,
} from '../models';
import {
  PositionStartScreenComponent,
  PositionSettingsScreenComponent,
  PositionPlayingScreenComponent,
  PositionResultScreenComponent,
} from '../screens';

/**
 * Position Game Container Component
 * Orchestrates the entire Position Number game flow
 */
@Component({
  selector: 'app-position-game-container',
  standalone: true,
  imports: [
    CommonModule,
    PositionStartScreenComponent,
    PositionSettingsScreenComponent,
    PositionPlayingScreenComponent,
    PositionResultScreenComponent,
  ],
  template: `
    <app-position-start-screen
      *ngIf="screenType() === ScreenType.START"
      (start)="startGame()"
      (settings)="openSettings()"
    ></app-position-start-screen>

    <app-position-settings-screen
      *ngIf="screenType() === ScreenType.SETTINGS"
      [config]="config()"
      (updateConfig)="updateConfig($event)"
      (back)="goBackFromSettings()"
    ></app-position-settings-screen>

    <app-position-playing-screen
      *ngIf="screenType() === ScreenType.PLAYING"
      [round]="currentRound()"
      [totalScore]="gameState()?.totalScore ?? 0"
      [minNumber]="config().minNumber"
      [maxNumber]="config().maxNumber"
      (nextRound)="handleNextRound($event)"
      (quit)="quitGame()"
    ></app-position-playing-screen>

    <app-position-result-screen
      *ngIf="screenType() === ScreenType.RESULT"
      [rounds]="gameState()?.rounds ?? []"
      [totalScore]="gameState()?.totalScore ?? 0"
      (playAgain)="resetAndStartGame()"
      (backToMenu)="backToMenu()"
    ></app-position-result-screen>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `,
})
export class PositionGameContainerComponent implements OnInit, OnDestroy {
  private gameService = inject(PositionGameService);
  private configService = inject(ConfigService);
  private location = inject(Location);
  private destroy$ = new Subject<void>();

  protected ScreenType = PositionScreenType;

  screenType = signal<PositionScreenType>(PositionScreenType.START);
  config = signal<PositionGameConfig>(DEFAULT_POSITION_GAME_CONFIG);
  currentRound = signal<PositionRound>(this.createEmptyRound());
  gameState = toSignal(this.gameService.gameState$);

  private previousScreenType: PositionScreenType | null = null;

  ngOnInit(): void {
    this.loadConfig();
    this.initializeGame();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openSettings(): void {
    this.previousScreenType = this.screenType();
    this.screenType.set(PositionScreenType.SETTINGS);
  }

  updateConfig(newConfig: PositionGameConfig): void {
    this.config.set(newConfig);
    this.configService.savePositionConfig(newConfig);
    this.screenType.set(this.previousScreenType || PositionScreenType.START);
  }

  goBackFromSettings(): void {
    this.screenType.set(this.previousScreenType || PositionScreenType.START);
  }

  startGame(): void {
    this.gameService.initializeGame(this.config());
    this.startNewRound();
  }

  startNewRound(): void {
    const round = this.gameService.startNewRound();
    this.currentRound.set(round);
    this.screenType.set(PositionScreenType.PLAYING);
  }

  handleNextRound(guess: PositionGuess): void {
    const currentState = this.gameState();
    if (!currentState) return;

    // Process the guess and update the round
    let updatedRound = this.gameService.submitGuess(
      this.currentRound(),
      guess
    );

    // Complete the round
    this.gameService.completeRound(updatedRound);

    // Check if game is over
    const newState = this.gameService.getGameState();
    if (newState.isGameOver) {
      this.screenType.set(PositionScreenType.RESULT);
    } else {
      // Start next round
      this.startNewRound();
    }
  }

  quitGame(): void {
    this.gameService.endGame();
    this.screenType.set(PositionScreenType.RESULT);
  }

  resetAndStartGame(): void {
    this.gameService.resetGame();
    this.startGame();
  }

  backToMenu(): void {
    this.location.back();
  }

  private initializeGame(): void {
    this.gameService.initializeGame(this.config());
  }

  private loadConfig(): void {
    const savedConfig = this.configService.loadPositionConfig();
    this.config.set(savedConfig);
  }

  private createEmptyRound(): PositionRound {
    return {
      roundNumber: 1,
      targetNumber: 0,
      accuracy: 0,
      points: 0,
    };
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { GameService } from '@app/core/services';
import { ScreenType } from '@app/features/game/models';
import { StartScreenComponent } from '../screens/start-screen.component';
import { SettingsScreenComponent } from '../screens/settings-screen.component';
import { CountdownScreenComponent } from '../screens/countdown-screen.component';
import { NumberDisplayScreenComponent } from '../screens/number-display-screen.component';
import { InputScreenComponent } from '../screens/input-screen.component';
import { ResultScreenComponent } from '../screens/result-screen.component';

/**
 * Game Container Component
 * Orchestrates game flow and renders appropriate screens
 */
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    StartScreenComponent,
    SettingsScreenComponent,
    CountdownScreenComponent,
    NumberDisplayScreenComponent,
    InputScreenComponent,
    ResultScreenComponent,
  ],
  template: `
    <div class="game-container">
      @switch (currentScreen()) {
        @case (screenType.START) {
          <app-start-screen
            (startGame)="onStartGame()"
            (goToSettings)="onGoToSettings()"
          />
        }
        @case (screenType.SETTINGS) {
          <app-settings-screen
            [config]="config()"
            (updateConfig)="onUpdateConfig($event)"
            (back)="onBackToStart()"
          />
        }
        @case (screenType.COUNTDOWN) {
          <app-countdown-screen [step]="countdownStep()" />
        }
        @case (screenType.PLAYING) {
          <app-number-display-screen
            [currentNumber]="currentNumber()"
            [numberIndex]="numberIndex()"
            [totalNumbers]="gameState().numbers.length"
          />
        }
        @case (screenType.INPUT) {
          <app-input-screen
            [totalNumbers]="gameState().numbers.length"
            (submitAnswer)="onSubmitAnswer($event)"
          />
        }
        @case (screenType.RESULT) {
          <app-result-screen
            [gameState]="gameState()"
            (playAgain)="onPlayAgain()"
            (goToSettings)="onGoToSettings()"
          />
        }
      }
    </div>
  `,
  styles: `
    .game-container {
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
      font-family: var(--font-family);
    }
  `,
})
export class GameContainerComponent implements OnInit {
  private gameService = inject(GameService);
  protected screenType = ScreenType;

  // Convert observables to signals
  currentScreen = toSignal(this.gameService.currentScreen$, {
    initialValue: ScreenType.START,
  });
  gameState = toSignal(this.gameService.gameState$, {
    initialValue: this.gameService.getGameState(),
  });
  config = toSignal(this.gameService.config$, {
    initialValue: this.gameService.getConfig(),
  });
  countdownStep = toSignal(this.gameService.countdownStep$, {
    initialValue: null,
  });
  currentNumber = toSignal(this.gameService.currentNumber$, {
    initialValue: null,
  });
  numberIndex = toSignal(this.gameService.numberIndex$, {
    initialValue: 0,
  });

  ngOnInit(): void {
    // Initialize game if needed
    // GameService starts in START screen
  }

  onStartGame(): void {
    this.gameService.startGame();
  }

  onGoToSettings(): void {
    this.gameService.goToSettings();
  }

  onBackToStart(): void {
    this.gameService.resetGame();
  }

  onUpdateConfig(config: any): void {
    this.gameService.updateConfig(config);
  }

  onSubmitAnswer(answer: number): void {
    this.gameService.submitAnswer(answer);
  }

  onPlayAgain(): void {
    this.gameService.startGame();
  }
}

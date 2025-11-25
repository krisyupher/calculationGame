import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameState, calculateGameResult } from '@app/features/game/models';

/**
 * Result Screen Component
 * Displays game result and feedback to user
 */
@Component({
  selector: 'app-result-screen',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="result-screen" [ngClass]="resultClass">
      <div class="result-container">
        <div class="result-icon">{{ result.icon }}</div>

        <h2 class="result-title">{{ result.title }}</h2>

        <p class="result-message">{{ result.message }}</p>

        <div class="result-details">
          <div class="detail-item">
            <span class="label">Your Answer:</span>
            <span class="value">{{ gameState.userAnswer }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Correct Answer:</span>
            <span class="value">{{ sum }}</span>
          </div>
        </div>

        <div class="numbers-recap">
          <h3>Numbers:</h3>
          <div class="numbers-list">
            @for (num of gameState.numbers; track $index) {
              <div class="number-badge">{{ num }}</div>
            }
          </div>
        </div>

        <div class="actions">
          <button class="btn btn-primary" (click)="onPlayAgain()">
            Play Again
          </button>
          <button class="btn btn-secondary" (click)="onGoToSettings()">
            Settings
          </button>
        </div>
      </div>
    </div>
  `,
  styles: `
    .result-screen {
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      animation: fadeIn 0.6s ease-out;
    }

    .result-screen.correct {
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
    }

    .result-screen.incorrect {
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%);
    }

    .result-container {
      background: var(--card-bg);
      border-radius: var(--border-radius-lg);
      padding: 3rem;
      max-width: 500px;
      width: 100%;
      box-shadow: var(--shadow-lg);
      text-align: center;
    }

    .result-icon {
      font-size: 5rem;
      margin-bottom: 1rem;
      animation: popIn 0.5s ease-out;
    }

    .result-title {
      font-size: 2rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
      color: var(--text-primary);
    }

    .result-title.correct {
      color: #10b981;
    }

    .result-title.incorrect {
      color: #ef4444;
    }

    .result-message {
      font-size: 1rem;
      color: var(--text-secondary);
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .result-details {
      background: #f9fafb;
      border-radius: var(--border-radius-md);
      padding: 1.5rem;
      margin-bottom: 2rem;
      display: flex;
      gap: 2rem;
      justify-content: space-around;
    }

    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .label {
      font-size: 0.85rem;
      color: var(--text-secondary);
      font-weight: 600;
      text-transform: uppercase;
    }

    .value {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--text-primary);
    }

    .numbers-recap {
      margin-bottom: 2rem;
    }

    .numbers-recap h3 {
      font-size: 0.95rem;
      color: var(--text-secondary);
      margin-bottom: 1rem;
      text-transform: uppercase;
      font-weight: 600;
    }

    .numbers-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      justify-content: center;
    }

    .number-badge {
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: var(--border-radius-md);
      font-weight: 600;
      font-size: 0.9rem;
    }

    .actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      justify-content: center;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      font-size: 0.95rem;
      font-weight: 600;
      border: none;
      border-radius: var(--border-radius-md);
      cursor: pointer;
      transition: all 0.3s ease;
      flex: 1;
      min-width: 140px;
    }

    .btn-primary {
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: white;
      box-shadow: var(--shadow-md);
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }

    .btn-secondary {
      background: #f3f4f6;
      color: var(--text-primary);
      border: 1px solid #e5e7eb;
    }

    .btn-secondary:hover {
      background: #e5e7eb;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes popIn {
      from {
        opacity: 0;
        transform: scale(0);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  `,
})
export class ResultScreenComponent {
  @Input() gameState!: GameState;
  @Output() playAgain = new EventEmitter<void>();
  @Output() goToSettings = new EventEmitter<void>();

  get result() {
    if (!this.gameState || this.gameState.userAnswer === null) {
      return {
        isCorrect: false,
        userAnswer: 0,
        correctAnswer: 0,
        title: 'Error',
        message: 'Unable to calculate result',
        icon: '❌',
      };
    }

    return calculateGameResult(this.gameState.userAnswer, this.gameState.sum);
  }

  get sum(): number {
    return this.gameState?.sum || 0;
  }

  get resultClass(): string {
    return this.result.isCorrect ? 'correct' : 'incorrect';
  }

  onPlayAgain(): void {
    this.playAgain.emit();
  }

  onGoToSettings(): void {
    this.goToSettings.emit();
  }
}

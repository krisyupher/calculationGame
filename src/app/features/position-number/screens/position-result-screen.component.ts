import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionRound } from '../models';

/**
 * Position Result Screen Component
 * Displays final game results and statistics
 */
@Component({
  selector: 'app-position-result-screen',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="result-screen">
      <div class="result-container">
        <h2 class="title">Game Over!</h2>

        <div class="score-display">
          <span class="label">Total Score</span>
          <span class="score">{{ totalScore }}</span>
        </div>

        <div class="statistics">
          <div class="stat-card">
            <span class="stat-label">Rounds Completed</span>
            <span class="stat-value">{{ rounds.length }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Average Accuracy</span>
            <span class="stat-value">{{ averageAccuracy }}%</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Best Round</span>
            <span class="stat-value">{{ bestAccuracy }}%</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Worst Round</span>
            <span class="stat-value">{{ worstAccuracy }}%</span>
          </div>
        </div>

        <div class="rounds-summary">
          <h3>Round Summary</h3>
          <div class="rounds-list">
            <div *ngFor="let round of rounds" class="round-item">
              <div class="round-number">
                Round {{ round.roundNumber }}
              </div>
              <div class="round-target">
                Target: {{ round.targetNumber }}
              </div>
              <div class="round-stats">
                <span *ngIf="round.playerGuess" class="round-guess"
                  >Guess: {{ round.playerGuess.position | number: '1.0-0' }}</span
                >
                <span class="round-accuracy">{{ round.accuracy }}%</span>
                <span class="round-points">+{{ round.points }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="actions">
          <button class="btn btn-primary" (click)="onPlayAgain()">
            Play Again
          </button>
          <button class="btn btn-secondary" (click)="onBackToMenu()">
            Back to Menu
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
      overflow-y: auto;
    }

    .result-container {
      background: var(--card-bg);
      border-radius: var(--border-radius-lg);
      padding: 3rem;
      max-width: 700px;
      width: 100%;
      box-shadow: var(--shadow-lg);
      animation: slideIn 0.4s ease-out;
    }

    .title {
      font-size: 2rem;
      font-weight: 800;
      margin-bottom: 2rem;
      color: var(--text-primary);
      text-align: center;
    }

    .score-display {
      text-align: center;
      margin-bottom: 2rem;
      padding: 2rem;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      border-radius: var(--border-radius-md);
      color: white;
    }

    .label {
      display: block;
      font-size: 0.9rem;
      font-weight: 600;
      opacity: 0.9;
      margin-bottom: 0.5rem;
    }

    .score {
      display: block;
      font-size: 3rem;
      font-weight: 800;
    }

    .statistics {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: #f3f4f6;
      padding: 1.5rem;
      border-radius: var(--border-radius-md);
      border-left: 4px solid #6366f1;
    }

    .stat-label {
      display: block;
      font-size: 0.85rem;
      color: var(--text-secondary);
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .stat-value {
      display: block;
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .rounds-summary {
      margin-bottom: 2rem;
    }

    .rounds-summary h3 {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1rem;
      margin-top: 0;
    }

    .rounds-list {
      max-height: 300px;
      overflow-y: auto;
      border: 1px solid #e5e7eb;
      border-radius: var(--border-radius-md);
      padding: 1rem;
    }

    .round-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid #e5e7eb;
      font-size: 0.95rem;
    }

    .round-item:last-child {
      border-bottom: none;
    }

    .round-number {
      font-weight: 600;
      color: var(--text-primary);
      min-width: 100px;
    }

    .round-target {
      color: var(--text-secondary);
      min-width: 100px;
    }

    .round-stats {
      display: flex;
      gap: 1rem;
      text-align: right;
    }

    .round-guess {
      color: var(--text-secondary);
      font-size: 0.9rem;
    }

    .round-accuracy {
      font-weight: 600;
      color: var(--text-primary);
      min-width: 50px;
    }

    .round-points {
      font-weight: 700;
      color: #6366f1;
      min-width: 60px;
    }

    .actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    .btn {
      flex: 1;
      padding: 0.75rem 1.5rem;
      font-size: 0.95rem;
      font-weight: 600;
      border: none;
      border-radius: var(--border-radius-md);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: white;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .btn-secondary {
      background: #f3f4f6;
      color: var(--text-primary);
      border: 1px solid #e5e7eb;
    }

    .btn-secondary:hover {
      background: #e5e7eb;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
})
export class PositionResultScreenComponent {
  @Input() rounds: PositionRound[] = [];
  @Input() totalScore: number = 0;
  @Output() playAgain = new EventEmitter<void>();
  @Output() backToMenu = new EventEmitter<void>();

  get averageAccuracy(): number {
    if (this.rounds.length === 0) return 0;
    const sum = this.rounds.reduce((total, round) => total + round.accuracy, 0);
    return Math.round(sum / this.rounds.length);
  }

  get bestAccuracy(): number {
    if (this.rounds.length === 0) return 0;
    return Math.max(...this.rounds.map(r => r.accuracy));
  }

  get worstAccuracy(): number {
    if (this.rounds.length === 0) return 0;
    return Math.min(...this.rounds.map(r => r.accuracy));
  }

  onPlayAgain(): void {
    this.playAgain.emit();
  }

  onBackToMenu(): void {
    this.backToMenu.emit();
  }
}

import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionRound, PositionGuess } from '../models';

/**
 * Playing Screen Component
 * Main game screen where player positions numbers on a bar
 */
@Component({
  selector: 'app-position-playing-screen',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="playing-screen">
      <div class="playing-container">
        <div class="header">
          <h2>Round {{ round.roundNumber }}</h2>
          <span class="round-info">Score: {{ totalScore }}</span>
        </div>

        <div class="game-area">
          <div class="number-display">
            <span class="label">Find this number:</span>
            <span class="number">{{ round.targetNumber }}</span>
          </div>

          <div class="position-bar-container">
            <div class="scale-labels">
              <span>{{ minNumber }}</span>
              <span>{{ maxNumber }}</span>
            </div>

            <div
              class="position-bar"
              #positionBar
              (click)="onBarClick($event)"
            >
              <div
                *ngIf="playerGuess"
                class="player-guess"
                [style.left.%]="playerGuess.position"
              >
                <div class="guess-marker"></div>
              </div>

              <div
                *ngIf="showFeedback && playerGuess && correctPosition"
                class="correct-position"
                [style.left.%]="correctPosition"
              >
                <div class="correct-marker"></div>
              </div>
            </div>

            <div class="bar-labels">
              <small>Click on the bar to position the number</small>
            </div>
          </div>

          <div *ngIf="showFeedback" class="feedback" [ngClass]="feedbackClass">
            <p class="feedback-message">{{ feedbackMessage }}</p>
            <p class="accuracy">Accuracy: {{ accuracy }}%</p>
          </div>
        </div>

        <div class="actions">
          <button
            class="btn btn-primary"
            [disabled]="!playerGuess || showFeedback"
            (click)="submitGuess()"
          >
            {{ showFeedback ? 'Next Round' : 'Submit' }}
          </button>
          <button class="btn btn-secondary" (click)="quitGame()">
            Quit Game
          </button>
        </div>
      </div>
    </div>
  `,
  styles: `
    .playing-screen {
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      overflow-y: auto;
    }

    .playing-container {
      background: var(--card-bg);
      border-radius: var(--border-radius-lg);
      padding: 3rem;
      max-width: 700px;
      width: 100%;
      box-shadow: var(--shadow-lg);
      animation: slideIn 0.4s ease-out;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .header h2 {
      font-size: 1.5rem;
      color: var(--text-primary);
      margin: 0;
    }

    .round-info {
      font-weight: 600;
      color: #6366f1;
      font-size: 1.1rem;
    }

    .game-area {
      margin: 2rem 0;
    }

    .number-display {
      text-align: center;
      margin-bottom: 3rem;
    }

    .label {
      display: block;
      font-size: 0.9rem;
      color: var(--text-secondary);
      margin-bottom: 0.5rem;
    }

    .number {
      display: block;
      font-size: 4rem;
      font-weight: 800;
      color: transparent;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .position-bar-container {
      margin: 3rem 0;
    }

    .scale-labels {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      font-size: 0.85rem;
      color: var(--text-secondary);
      font-weight: 600;
    }

    .position-bar {
      position: relative;
      width: 100%;
      height: 40px;
      background: linear-gradient(90deg, #e5e7eb 0%, #e5e7eb 100%);
      border-radius: var(--border-radius-md);
      cursor: pointer;
      border: 2px solid #d1d5db;
      transition: all 0.2s ease;
    }

    .position-bar:hover {
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }

    .player-guess {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      transition: left 0.1s ease;
    }

    .guess-marker {
      width: 8px;
      height: 24px;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
    }

    .correct-position {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .correct-marker {
      width: 8px;
      height: 24px;
      background: #10b981;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
      opacity: 0.7;
    }

    .bar-labels {
      text-align: center;
      margin-top: 0.5rem;
    }

    .bar-labels small {
      color: var(--text-secondary);
      font-size: 0.85rem;
    }

    .feedback {
      margin-top: 2rem;
      padding: 1.5rem;
      border-radius: var(--border-radius-md);
      text-align: center;
      animation: fadeIn 0.3s ease-out;
    }

    .feedback.excellent {
      background: #d1fae5;
      border-left: 4px solid #10b981;
    }

    .feedback.good {
      background: #dbeafe;
      border-left: 4px solid #3b82f6;
    }

    .feedback.okay {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
    }

    .feedback.poor {
      background: #fee2e2;
      border-left: 4px solid #ef4444;
    }

    .feedback-message {
      margin: 0 0 0.5rem 0;
      font-weight: 600;
      color: var(--text-primary);
    }

    .accuracy {
      margin: 0;
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--text-primary);
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

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    .btn-primary {
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
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

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `,
})
export class PositionPlayingScreenComponent implements OnInit {
  @Input() round!: PositionRound;
  @Input() totalScore: number = 0;
  @Input() minNumber: number = 0;
  @Input() maxNumber: number = 100;
  @Output() nextRound = new EventEmitter<PositionGuess>();
  @Output() quit = new EventEmitter<void>();

  @ViewChild('positionBar') positionBar!: ElementRef;

  playerGuess: PositionGuess | null = null;
  showFeedback = false;
  accuracy = 0;
  correctPosition = 0;
  feedbackMessage = '';
  feedbackClass = '';

  ngOnInit(): void {
    this.showFeedback = false;
    this.playerGuess = null;
  }

  onBarClick(event: MouseEvent): void {
    if (this.showFeedback) return;

    const bar = this.positionBar.nativeElement;
    const rect = bar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const position = (clickX / rect.width) * 100;

    this.playerGuess = {
      position: Math.max(0, Math.min(100, position)),
      timestamp: Date.now(),
    };
  }

  submitGuess(): void {
    if (!this.playerGuess) return;

    if (this.showFeedback) {
      this.nextRound.emit(this.playerGuess);
      return;
    }

    // Calculate feedback
    const normalizedTarget = this.normalizeNumberToPosition(
      this.round.targetNumber
    );
    const difference = Math.abs(normalizedTarget - this.playerGuess.position);
    this.accuracy = Math.max(0, 100 - difference);
    this.correctPosition = normalizedTarget;

    // Show feedback
    this.showFeedback = true;
    this.setFeedbackMessage();

    // Auto-advance after delay
    setTimeout(() => {
      this.nextRound.emit(this.playerGuess!);
    }, 2000);
  }

  quitGame(): void {
    this.quit.emit();
  }

  private normalizeNumberToPosition(number: number): number {
    const range = this.maxNumber - this.minNumber;
    if (range === 0) return 50;
    return (
      ((number - this.minNumber) / range) * 100
    );
  }

  private setFeedbackMessage(): void {
    if (this.accuracy >= 90) {
      this.feedbackMessage = 'Excellent!';
      this.feedbackClass = 'excellent';
    } else if (this.accuracy >= 75) {
      this.feedbackMessage = 'Good!';
      this.feedbackClass = 'good';
    } else if (this.accuracy >= 50) {
      this.feedbackMessage = 'Not bad!';
      this.feedbackClass = 'okay';
    } else {
      this.feedbackMessage = 'Try again!';
      this.feedbackClass = 'poor';
    }
  }
}

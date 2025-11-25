import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Start Screen Component
 * Displays welcome screen with game start and settings buttons
 */
@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="start-screen">
      <div class="content">
        <h1 class="title">Sum Memory Game</h1>
        <p class="subtitle">Watch, Remember, Calculate</p>

        <div class="description">
          <p>Numbers will appear one by one on the screen.</p>
          <p>Remember them and calculate their sum!</p>
        </div>

        <div class="actions">
          <button class="btn btn-primary" (click)="onStartGame()">
            Start Game
          </button>
          <button class="btn btn-secondary" (click)="onGoToSettings()">
            Settings
          </button>
        </div>
      </div>
    </div>
  `,
  styles: `
    .start-screen {
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .content {
      text-align: center;
      animation: fadeIn 0.6s ease-out;
    }

    .title {
      font-size: 3rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
      color: var(--text-primary);
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .subtitle {
      font-size: 1.25rem;
      color: var(--text-secondary);
      margin-bottom: 2rem;
      font-weight: 600;
    }

    .description {
      background: var(--card-bg);
      border-radius: var(--border-radius-lg);
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: var(--shadow-md);
    }

    .description p {
      margin: 0.5rem 0;
      color: var(--text-primary);
      font-size: 1rem;
      line-height: 1.6;
    }

    .actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn {
      padding: 1rem 2rem;
      font-size: 1rem;
      font-weight: 600;
      border: none;
      border-radius: var(--border-radius-md);
      cursor: pointer;
      transition: all 0.3s ease;
      min-width: 150px;
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
      background: var(--card-bg);
      color: var(--text-primary);
      border: 2px solid #e5e7eb;
    }

    .btn-secondary:hover {
      background: #f3f4f6;
      border-color: #d1d5db;
    }

    @keyframes fadeIn {
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
export class StartScreenComponent {
  @Output() startGame = new EventEmitter<void>();
  @Output() goToSettings = new EventEmitter<void>();

  onStartGame(): void {
    this.startGame.emit();
  }

  onGoToSettings(): void {
    this.goToSettings.emit();
  }
}

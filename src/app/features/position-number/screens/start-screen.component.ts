import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Start Screen Component
 * Displays game introduction and difficulty selection
 */
@Component({
  selector: 'app-position-start-screen',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="start-screen">
      <div class="start-container">
        <h1 class="title">Position the Number</h1>
        <p class="description">
          A number will appear at the top. Place it on the bar below by clicking
          where you think the number belongs on a scale of
          {{ minNumber }} to {{ maxNumber }}.
        </p>

        <div class="game-rules">
          <h3>How to Play</h3>
          <ul>
            <li>Look at the number shown at the top</li>
            <li>Click on the position bar where you think it belongs</li>
            <li>The closer your guess, the higher your score</li>
            <li>Complete all rounds to finish the game</li>
          </ul>
        </div>

        <div class="actions">
          <button class="btn btn-primary" (click)="startGame()">
            Start Game
          </button>
          <button class="btn btn-secondary" (click)="openSettings()">
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
      overflow-y: auto;
    }

    .start-container {
      background: var(--card-bg);
      border-radius: var(--border-radius-lg);
      padding: 3rem;
      max-width: 600px;
      width: 100%;
      box-shadow: var(--shadow-lg);
      animation: slideIn 0.4s ease-out;
    }

    .title {
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: 1rem;
      color: var(--text-primary);
      text-align: center;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .description {
      font-size: 1rem;
      color: var(--text-secondary);
      text-align: center;
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .game-rules {
      background: #f3f4f6;
      border-left: 4px solid #6366f1;
      padding: 1.5rem;
      border-radius: var(--border-radius-md);
      margin-bottom: 2rem;
    }

    .game-rules h3 {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1rem;
      margin-top: 0;
    }

    .game-rules ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .game-rules li {
      color: var(--text-secondary);
      margin-bottom: 0.75rem;
      padding-left: 1.5rem;
      position: relative;
      font-size: 0.95rem;
    }

    .game-rules li:before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #6366f1;
      font-weight: bold;
    }

    .game-rules li:last-child {
      margin-bottom: 0;
    }

    .actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    .btn {
      flex: 1;
      padding: 1rem;
      font-size: 1rem;
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
export class PositionStartScreenComponent {
  @Output() start = new EventEmitter<void>();
  @Output() settings = new EventEmitter<void>();

  minNumber = 0;
  maxNumber = 100;

  startGame(): void {
    this.start.emit();
  }

  openSettings(): void {
    this.settings.emit();
  }
}

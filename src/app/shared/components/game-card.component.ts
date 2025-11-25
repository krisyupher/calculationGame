import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GameMetadata } from '@app/core/models';
import { GameType } from '@app/core/models';

/**
 * Game Card Component
 * Displays a game option on the landing page with metadata and selection button
 */
@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="game-card" [style.--card-color]="metadata.color">
      <div class="card-header">
        <div class="game-icon">{{ metadata.icon }}</div>
        <span class="difficulty-badge">{{ metadata.difficulty }}</span>
      </div>

      <div class="card-content">
        <h2 class="game-title">{{ metadata.title }}</h2>
        <p class="game-description">{{ metadata.description }}</p>

        <div class="skills-container">
          <span class="skills-label">Skills:</span>
          <div class="skills-list">
            @for (skill of metadata.skills; track skill) {
              <span class="skill-tag">{{ skill }}</span>
            }
          </div>
        </div>
      </div>

      <div class="card-footer">
        <button class="play-button" [routerLink]="metadata.route" (click)="onSelectGame()">
          Play Now
        </button>
      </div>
    </div>
  `,
  styles: `
    .game-card {
      background: white;
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-md);
      overflow: hidden;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      height: 100%;
      cursor: pointer;
    }

    .game-card:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-lg);
    }

    .card-header {
      background: linear-gradient(135deg, var(--card-color) 0%, var(--card-color)80%);
      padding: 2rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      color: white;
    }

    .game-icon {
      font-size: 3.5rem;
      line-height: 1;
    }

    .difficulty-badge {
      background: rgba(255, 255, 255, 0.3);
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      backdrop-filter: blur(10px);
    }

    .card-content {
      padding: 1.5rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .game-title {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .game-description {
      margin: 0;
      color: var(--text-secondary);
      font-size: 0.95rem;
      line-height: 1.5;
    }

    .skills-container {
      margin-top: auto;
    }

    .skills-label {
      display: block;
      font-size: 0.8rem;
      text-transform: uppercase;
      color: var(--text-secondary);
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .skills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .skill-tag {
      background: #f0f4f8;
      color: var(--text-primary);
      padding: 0.4rem 0.8rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 500;
      border: 1px solid #e0e4e8;
    }

    .card-footer {
      padding: 1rem 1.5rem;
      border-top: 1px solid #e5e7eb;
    }

    .play-button {
      width: 100%;
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, var(--card-color) 0%, var(--card-color)80%);
      color: white;
      border: none;
      border-radius: var(--border-radius-md);
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .play-button:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .play-button:active {
      transform: scale(0.98);
    }

    @media (max-width: 640px) {
      .game-icon {
        font-size: 2.5rem;
      }

      .game-title {
        font-size: 1.25rem;
      }

      .game-description {
        font-size: 0.9rem;
      }
    }
  `,
})
export class GameCardComponent {
  @Input() metadata!: GameMetadata;
  @Output() selectGame = new EventEmitter<GameType>();

  onSelectGame(): void {
    this.selectGame.emit(this.metadata.id);
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameCardComponent } from '@app/shared/components';
import { GameType, GAME_METADATA_MAP } from '@app/core/models';

/**
 * Landing Page Component
 * Displays available games for the user to choose from
 */
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, GameCardComponent],
  template: `
    <div class="landing-container">
      <header class="landing-header">
        <div class="header-content">
          <h1 class="main-title">Calculation Games</h1>
          <p class="subtitle">Choose your game to train your brain and have fun!</p>
        </div>
      </header>

      <main class="landing-main">
        <div class="games-grid">
          <app-game-card
            [metadata]="gameMetadataMap[GameType.SUM_MEMORY]"
            (selectGame)="onSelectGame($event)"
          />
          <app-game-card
            [metadata]="gameMetadataMap[GameType.POSITION_NUMBER]"
            (selectGame)="onSelectGame($event)"
          />
        </div>
      </main>

      <footer class="landing-footer">
        <p>Challenge yourself and improve your mental math skills!</p>
      </footer>
    </div>
  `,
  styles: `
    .landing-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
      font-family: var(--font-family);
    }

    .landing-header {
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: white;
      padding: 3rem 2rem;
      text-align: center;
    }

    .header-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .main-title {
      margin: 0;
      font-size: 3rem;
      font-weight: 800;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      animation: fadeInDown 0.6s ease-out;
    }

    .subtitle {
      margin: 0.5rem 0 0 0;
      font-size: 1.25rem;
      opacity: 0.95;
      animation: fadeInUp 0.6s ease-out 0.2s both;
    }

    .landing-main {
      flex: 1;
      padding: 3rem 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .games-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
      max-width: 900px;
      width: 100%;
      animation: fadeIn 0.8s ease-out 0.4s both;
    }

    .landing-footer {
      background: rgba(0, 0, 0, 0.05);
      color: var(--text-secondary);
      padding: 1.5rem 2rem;
      text-align: center;
      font-size: 0.95rem;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }

    .landing-footer p {
      margin: 0;
    }

    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeInUp {
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

    @media (max-width: 768px) {
      .landing-header {
        padding: 2rem 1.5rem;
      }

      .main-title {
        font-size: 2rem;
      }

      .subtitle {
        font-size: 1rem;
      }

      .landing-main {
        padding: 2rem 1rem;
      }

      .games-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
        padding: 0;
      }
    }
  `,
})
export class LandingPageComponent {
  protected gameMetadataMap = GAME_METADATA_MAP;
  protected GameType = GameType;
  private router = inject(Router);

  onSelectGame(gameType: GameType): void {
    // Router navigation is handled by routerLink on the button
    // This is just for any additional logic if needed
  }
}

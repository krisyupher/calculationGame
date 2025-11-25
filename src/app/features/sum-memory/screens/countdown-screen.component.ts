import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountdownStep } from '../models';

/**
 * Countdown Screen Component
 * Displays countdown sequence (Red → Yellow → Green)
 */
@Component({
  selector: 'app-countdown-screen',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="countdown-screen">
      <div class="countdown-content">
        <div class="light-display" [ngClass]="'light-' + step?.light">
          <div class="light-circle"></div>
        </div>
        <p class="countdown-text">{{ step?.text }}</p>
      </div>
    </div>
  `,
  styles: `
    .countdown-screen {
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .countdown-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      animation: popIn 0.3s ease-out;
    }

    .light-display {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);
      background: #f5f5f5;
      border: 4px solid #ddd;
    }

    .light-circle {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      animation: pulse 0.6s ease-in-out;
    }

    .light-red .light-circle {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      box-shadow: 0 0 30px rgba(239, 68, 68, 0.6);
    }

    .light-yellow .light-circle {
      background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
      box-shadow: 0 0 30px rgba(251, 191, 36, 0.6);
    }

    .light-green .light-circle {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      box-shadow: 0 0 30px rgba(16, 185, 129, 0.6);
    }

    .countdown-text {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }

    @keyframes popIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
    }
  `,
})
export class CountdownScreenComponent {
  @Input() step: CountdownStep | null = null;
}

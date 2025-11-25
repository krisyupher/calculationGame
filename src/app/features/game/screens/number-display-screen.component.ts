import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Number Display Screen Component
 * Shows each number one by one during the game
 */
@Component({
  selector: 'app-number-display-screen',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="number-display-screen">
      <div class="display-container">
        @if (currentNumber !== null) {
          <div class="number-display" [@fadeInOut]="animationState">
            <span class="number-value">{{ currentNumber }}</span>
          </div>
        }

        <div class="progress-info">
          <p class="progress-text">
            Number {{ numberIndex + 1 }} of {{ totalNumbers }}
          </p>
          <div class="progress-bar">
            <div
              class="progress-fill"
              [style.width.%]="(numberIndex + 1) / totalNumbers * 100"
            ></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .number-display-screen {
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .display-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3rem;
    }

    .number-display {
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      border-radius: 20px;
      padding: 4rem;
      box-shadow: var(--shadow-xl);
      animation: popIn 0.3s ease-out;
      min-width: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .number-value {
      font-size: 6rem;
      font-weight: 800;
      color: white;
      line-height: 1;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }

    .progress-info {
      width: 100%;
      max-width: 400px;
      text-align: center;
    }

    .progress-text {
      color: var(--text-primary);
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .progress-bar {
      height: 8px;
      background: #e5e7eb;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
      transition: width 0.3s ease;
    }

    @keyframes popIn {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  `,
})
export class NumberDisplayScreenComponent {
  @Input() currentNumber: number | null = null;
  @Input() numberIndex: number = 0;
  @Input() totalNumbers: number = 0;

  animationState: string = 'in';
}

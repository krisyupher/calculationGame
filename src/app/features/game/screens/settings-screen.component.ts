import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameConfig } from '@app/features/game/models';

/**
 * Settings Screen Component
 * Allows users to configure game parameters
 */
@Component({
  selector: 'app-settings-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="settings-screen">
      <div class="settings-container">
        <h2 class="title">Game Settings</h2>

        <form (ngSubmit)="saveSettings()" class="settings-form">
          <div class="form-group">
            <label for="numberCount">Number of Numbers: {{ localConfig.numberCount }}</label>
            <input
              id="numberCount"
              type="range"
              min="1"
              max="10"
              [(ngModel)]="localConfig.numberCount"
              name="numberCount"
              class="slider"
            />
            <small>How many numbers should appear?</small>
          </div>

          <div class="form-group">
            <label for="minNumber">Minimum Number: {{ localConfig.minNumber }}</label>
            <input
              id="minNumber"
              type="range"
              min="0"
              max="50"
              [(ngModel)]="localConfig.minNumber"
              name="minNumber"
              class="slider"
            />
            <small>Smallest number that can appear</small>
          </div>

          <div class="form-group">
            <label for="maxNumber">Maximum Number: {{ localConfig.maxNumber }}</label>
            <input
              id="maxNumber"
              type="range"
              min="1"
              max="100"
              [(ngModel)]="localConfig.maxNumber"
              name="maxNumber"
              class="slider"
            />
            <small>Largest number that can appear</small>
          </div>

          <div class="form-group">
            <label for="displayDuration">Display Duration: {{ localConfig.displayDuration }}ms</label>
            <input
              id="displayDuration"
              type="range"
              min="500"
              max="5000"
              step="100"
              [(ngModel)]="localConfig.displayDuration"
              name="displayDuration"
              class="slider"
            />
            <small>How long each number is shown (milliseconds)</small>
          </div>

          <div class="form-group">
            <label for="pauseDuration">Pause Duration: {{ localConfig.pauseDuration }}ms</label>
            <input
              id="pauseDuration"
              type="range"
              min="100"
              max="2000"
              step="50"
              [(ngModel)]="localConfig.pauseDuration"
              name="pauseDuration"
              class="slider"
            />
            <small>Pause between numbers (milliseconds)</small>
          </div>

          <div class="actions">
            <button type="submit" class="btn btn-primary">
              Save Settings
            </button>
            <button type="button" class="btn btn-secondary" (click)="goBack()">
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: `
    .settings-screen {
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      overflow-y: auto;
    }

    .settings-container {
      background: var(--card-bg);
      border-radius: var(--border-radius-lg);
      padding: 3rem;
      max-width: 500px;
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

    .settings-form {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    label {
      font-weight: 600;
      color: var(--text-primary);
      font-size: 0.95rem;
    }

    .slider {
      width: 100%;
      height: 6px;
      border-radius: 3px;
      background: #e5e7eb;
      outline: none;
      -webkit-appearance: none;
      appearance: none;
      cursor: pointer;
    }

    .slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(99, 102, 241, 0.4);
    }

    .slider::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      cursor: pointer;
      border: none;
      box-shadow: 0 2px 6px rgba(99, 102, 241, 0.4);
    }

    small {
      color: var(--text-secondary);
      font-size: 0.85rem;
    }

    .actions {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
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
export class SettingsScreenComponent implements OnInit {
  @Input() config!: GameConfig;
  @Output() updateConfig = new EventEmitter<GameConfig>();
  @Output() back = new EventEmitter<void>();

  localConfig!: GameConfig;

  ngOnInit(): void {
    // Create a local copy to allow cancellation
    this.localConfig = { ...this.config };
  }

  saveSettings(): void {
    this.updateConfig.emit(this.localConfig);
  }

  goBack(): void {
    this.back.emit();
  }
}

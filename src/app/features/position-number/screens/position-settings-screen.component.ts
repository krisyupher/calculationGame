import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PositionGameConfig } from '../models';

/**
 * Position Settings Screen Component
 * Allows users to configure position game parameters
 */
@Component({
  selector: 'app-position-settings-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="settings-screen">
      <div class="settings-container">
        <h2 class="title">Game Settings</h2>

        <form (ngSubmit)="saveSettings()" class="settings-form">
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
            <label for="roundCount">Number of Rounds: {{ localConfig.roundCount }}</label>
            <input
              id="roundCount"
              type="range"
              min="1"
              max="20"
              [(ngModel)]="localConfig.roundCount"
              name="roundCount"
              class="slider"
            />
            <small>How many rounds to play</small>
          </div>

          <div class="form-group">
            <label for="feedbackDuration"
              >Feedback Duration: {{ localConfig.feedbackDuration }}ms</label
            >
            <input
              id="feedbackDuration"
              type="range"
              min="500"
              max="3000"
              step="100"
              [(ngModel)]="localConfig.feedbackDuration"
              name="feedbackDuration"
              class="slider"
            />
            <small>How long to show feedback after your guess</small>
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
export class PositionSettingsScreenComponent implements OnInit {
  @Input() config!: PositionGameConfig;
  @Output() updateConfig = new EventEmitter<PositionGameConfig>();
  @Output() back = new EventEmitter<void>();

  localConfig!: PositionGameConfig;

  ngOnInit(): void {
    this.localConfig = { ...this.config };
  }

  saveSettings(): void {
    this.updateConfig.emit(this.localConfig);
  }

  goBack(): void {
    this.back.emit();
  }
}

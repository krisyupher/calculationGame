import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Input Screen Component
 * Allows user to input their answer (sum of displayed numbers)
 */
@Component({
  selector: 'app-input-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="input-screen">
      <div class="input-container">
        <h2 class="title">What's the sum?</h2>

        <p class="instruction">
          You saw {{ totalNumbers }} number{{ totalNumbers !== 1 ? 's' : '' }}. What's their sum?
        </p>

        <form (ngSubmit)="onSubmitAnswer()">
          <div class="input-group">
            <input
              #answerInput
              type="number"
              [(ngModel)]="answer"
              name="answer"
              placeholder="Enter your answer"
              class="answer-input"
              (keyup.enter)="onSubmitAnswer()"
              autofocus
            />
            <span class="input-focus-border"></span>
          </div>

          <button
            type="submit"
            class="btn btn-primary"
            [disabled]="answer === null"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  `,
  styles: `
    .input-screen {
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .input-container {
      background: var(--card-bg);
      border-radius: var(--border-radius-lg);
      padding: 3rem;
      max-width: 400px;
      width: 100%;
      box-shadow: var(--shadow-lg);
      animation: slideIn 0.4s ease-out;
    }

    .title {
      font-size: 2rem;
      font-weight: 800;
      text-align: center;
      margin-bottom: 1rem;
      color: var(--text-primary);
    }

    .instruction {
      text-align: center;
      color: var(--text-secondary);
      font-size: 1rem;
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .input-group {
      position: relative;
    }

    .answer-input {
      width: 100%;
      padding: 1rem;
      font-size: 1.25rem;
      text-align: center;
      border: 2px solid #e5e7eb;
      border-radius: var(--border-radius-md);
      transition: all 0.3s ease;
      font-weight: 600;
      color: var(--text-primary);
      background: white;
    }

    .answer-input:focus {
      outline: none;
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }

    .answer-input::placeholder {
      color: #9ca3af;
    }

    .input-focus-border {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 3px;
      background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
      border-radius: 2px;
      transition: width 0.3s ease;
    }

    .answer-input:focus ~ .input-focus-border {
      width: 100%;
    }

    .btn {
      padding: 1rem 2rem;
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
      box-shadow: var(--shadow-md);
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }

    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
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
export class InputScreenComponent {
  @Input() totalNumbers: number = 0;
  @Output() submitAnswer = new EventEmitter<number>();

  answer: number | null = null;

  onSubmitAnswer(): void {
    if (this.answer !== null) {
      this.submitAnswer.emit(Number(this.answer));
    }
  }
}

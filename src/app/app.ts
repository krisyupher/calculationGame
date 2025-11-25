import { Component } from '@angular/core';
import { GameContainerComponent } from '@app/features/game/containers';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GameContainerComponent],
  template: `<app-game></app-game>`,
  styles: `
    :host {
      display: block;
      width: 100%;
      height: 100vh;
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }
  `,
})
export class App {}

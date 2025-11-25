import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/landing-page.component').then(
        m => m.LandingPageComponent
      ),
    title: 'Calculation Games - Choose Your Game'
  },
  {
    path: 'sum-memory',
    loadComponent: () =>
      import('./features/sum-memory/containers/sum-memory-game.container').then(
        m => m.SumMemoryGameContainerComponent
      ),
    title: 'Sum Memory Game'
  },
  {
    path: 'position-number',
    loadComponent: () =>
      import('./features/position-number/containers/position-game.container').then(
        m => m.PositionGameContainerComponent
      ),
    title: 'Position the Number Game'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

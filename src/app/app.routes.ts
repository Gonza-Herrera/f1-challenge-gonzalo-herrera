import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'teams', pathMatch: 'full' },
  {
    path: 'teams',
    loadComponent: () =>
      import('./features/teams/team-list-component/team-list.component')
  },
  {
    path: 'teams/:id',
    loadComponent: () =>
      import('./features/teams/team-detail-component/team-detail.component').then(m => m.TeamDetailComponent)
  },
  {
    path: 'pilots',
    loadComponent: () =>
      import('./features/pilots/pilot-search.component').then(m => m.PilotSearchComponent)
  },
  {
    path: 'stats',
    loadComponent: () =>
      import('./features/stats/graphs.component').then(m => m.GraphsComponent)
  },
  { path: '**', redirectTo: 'teams' }
];

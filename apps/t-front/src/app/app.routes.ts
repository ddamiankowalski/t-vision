import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('@t-vision/monitor').then((m) => m.MonitorComponent),
  },
  { path: '*', redirectTo: 'dashboard' },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

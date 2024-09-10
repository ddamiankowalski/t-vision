import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'dashboard' },
  { path: '*', redirectTo: 'dashboard' },
];

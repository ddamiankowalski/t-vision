import { Component } from '@angular/core';
import { DashboardComponent } from './features/dashboard/components/dashboard/dashboard.component';

@Component({
  standalone: true,
  selector: 'tv-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [DashboardComponent],
})
export class AppComponent {}

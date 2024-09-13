import { Component, ViewEncapsulation } from '@angular/core';
import { DashboardComponent } from './features/layout/components/dashboard/dashboard.component';

@Component({
  standalone: true,
  selector: 'tv-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [DashboardComponent],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent { }

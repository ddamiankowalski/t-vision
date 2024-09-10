import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClassBinder } from '@t-vision/utils';
import { DashboardMenuComponent } from '../dashboard-menu/dashboard-menu.component';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';

@Component({
  standalone: true,
  selector: 'tv-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrl: 'dashboard.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ClassBinder],
  imports: [RouterOutlet, DashboardMenuComponent, DashboardHeaderComponent],
})
export class DashboardComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('tv-dashboard');
  }
}

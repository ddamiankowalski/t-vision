import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@t-vision/utils';

@Component({
  standalone: true,
  selector: 'tv-dashboard-menu',
  templateUrl: 'dashboard-menu.component.html',
  styleUrl: 'dashboard-menu.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ClassBinder],
})
export class DashboardMenuComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('tv-dashboard-menu');
  }
}

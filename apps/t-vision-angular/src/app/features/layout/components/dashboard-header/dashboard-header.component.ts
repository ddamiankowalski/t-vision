import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@t-vision/utils';

@Component({
  standalone: true,
  selector: 'tv-dashboard-header',
  templateUrl: 'dashboard-header.component.html',
  styleUrl: 'dashboard-header.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ClassBinder],
})
export class DashboardHeaderComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('tv-dashboard-header');
  }
}

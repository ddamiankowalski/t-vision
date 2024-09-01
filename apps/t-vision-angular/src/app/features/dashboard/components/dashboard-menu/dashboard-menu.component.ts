import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@t-vision/utils';
import { IconComponent } from '@t-vision/ui';

@Component({
  standalone: true,
  selector: 'tv-dashboard-menu',
  templateUrl: 'dashboard-menu.component.html',
  styleUrl: 'dashboard-menu.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ClassBinder],
  imports: [IconComponent],
})
export class DashboardMenuComponent {
  public items = signal([{ icon: 'home' }, { icon: 'user' }, { icon: 'cog' }]);

  constructor(classBinder: ClassBinder) {
    classBinder.bind('tv-dashboard-menu');
  }
}

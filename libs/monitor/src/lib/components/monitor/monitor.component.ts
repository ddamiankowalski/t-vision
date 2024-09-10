import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@t-vision/utils';
import { MonitorStore } from '../../store';

@Component({
  standalone: true,
  selector: 'mon-monitor',
  templateUrl: 'monitor.component.html',
  styleUrl: 'monitor.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ClassBinder],
})
export class MonitorComponent {
  private _monitor = inject(MonitorStore);

  constructor(classBinder: ClassBinder) {
    classBinder.bind('mon-monitor');

    setTimeout(() => {
      console.log(this._monitor.packages());
    }, 3000);
  }
}

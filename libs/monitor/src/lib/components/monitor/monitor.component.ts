import { ClassBinder } from '../../../../../utils/src/lib/services/class-binder.service';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { MonitorStore } from '../../store';

@Component({
  selector: 'mon-monitor',
  templateUrl: 'monitor.component.html',
  styleUrl: 'monitor.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ClassBinder, MonitorStore],
})
export class MonitorComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('mon-monitor');
  }
}

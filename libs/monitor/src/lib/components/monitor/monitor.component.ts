import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@t-vision/utils';
import { PackageStore } from '../../store/packages/packages.store';
import { TestRunComponent } from '../test-run/test-run.component';

@Component({
  standalone: true,
  selector: 'mon-monitor',
  templateUrl: 'monitor.component.html',
  styleUrl: 'monitor.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ClassBinder],
  imports: [TestRunComponent],
})
export class MonitorComponent {
  public packageStore = inject(PackageStore);

  constructor(classBinder: ClassBinder) {
    classBinder.bind('mon-monitor');
    this.packageStore.getPackages();
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@t-vision/utils';
import { PackageStore } from '../../store/packages/packages.store';
import { PackageName } from '../../types/package';
import { JsonPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'mon-test-run-avg-indicator',
  templateUrl: 'test-run-avg-indicator.component.html',
  styleUrl: 'test-run-avg-indicator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
  imports: [JsonPipe],
})
export class TestRunAvgIndicatorComponent implements OnInit {
  public packageName = input.required<PackageName>();
  public packageStats = computed(() => {
    return (
      this._packageStore
        .stats()
        .find((stats) => stats.packageName === this.packageName()) || null
    );
  });

  private _packageStore = inject(PackageStore);

  constructor(classBinder: ClassBinder) {
    classBinder.bind('mon-test-run-avg-indicator');
  }

  ngOnInit(): void {
    this._packageStore.getStats(this.packageName());
  }
}

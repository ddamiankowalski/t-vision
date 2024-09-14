import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@t-vision/utils';
import { TestRunStore } from '../../store';
import { TestTimePipe } from '../../pipes';
import { LoaderComponent } from '@t-vision/ui';
import { TestRunIconComponent } from '../test-run-icon/test-run-icon.component';
import { TestRunAvgIndicatorComponent } from '../test-run-avg-indicator/test-run-avg-indicator.component';

@Component({
  standalone: true,
  selector: 'mon-test-run',
  templateUrl: 'test-run.component.html',
  styleUrl: 'test-run.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ClassBinder],
  imports: [
    TestTimePipe,
    LoaderComponent,
    TestRunIconComponent,
    TestRunIconComponent,
    TestRunAvgIndicatorComponent,
  ],
})
export class TestRunComponent implements AfterViewInit {
  public packageName = input.required<string>();
  public status = computed(() => {
    const runInfo = this.runInfo();

    if (!runInfo || !runInfo.lastRun || runInfo.ongoing) {
      return 'ONGOING';
    }

    return runInfo.lastRun.status;
  });

  public isOngoing = computed(() => this.runInfo()?.ongoing);
  public runInfo = computed(() =>
    this._testRunStore
      .packageRuns()
      .find((info) => info.packageName === this.packageName())
  );

  private _testRunStore = inject(TestRunStore);

  constructor(private _classBinder: ClassBinder) {
    this._classBinder.bind('mon-test-run');
    effect(() => this._updateStyles());
  }

  public ngAfterViewInit(): void {
    this._testRunStore.getLastTestRun(this.packageName());
  }

  private _updateStyles(): void {
    this._classBinder.unbindAll();
    this._classBinder.bind('mon-test-run');

    const run = this.runInfo();
    if (!run) {
      return;
    }

    if (run.ongoing || !run.lastRun) {
      this._classBinder.bind('mon-test-run--ongoing');
    } else {
      if (run.lastRun.status === 'FAILURE') {
        this._classBinder.bind('mon-test-run--failure');
      } else {
        this._classBinder.bind('mon-test-run--success');
      }
    }
  }
}

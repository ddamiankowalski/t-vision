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
  ],
})
export class TestRunComponent implements AfterViewInit {
  public packageName = input.required<string>();

  public runStatus = computed(() => {
    const runInfo = this.runInfo();

    if (runInfo && !runInfo.ongoing) {
      return 'SUCCESS';
    }

    return 'ONGOING';
  });

  public runInfo = computed(() => {
    const informations = this._testRunStore.packageRuns();
    const packageInfo = informations.find(
      (info) => info.packageName === this.packageName()
    );

    return packageInfo || null;
  });

  private _testRunStore = inject(TestRunStore);

  constructor(private _classBinder: ClassBinder) {
    this._classBinder.bind('mon-test-run');
    effect(() => this._updateStyles());
  }

  public ngAfterViewInit(): void {
    this._testRunStore.getLastTestRun(this.packageName());
  }

  private _updateStyles(): void {
    this._classBinder.conditionalBind(!run.ongoing, 'mon-test-run--finished');

    const run = this.runInfo();

    if (run) {
      this._classBinder.conditionalBind(!run.ongoing, 'mon-test-run--finished');
    }
  }
}

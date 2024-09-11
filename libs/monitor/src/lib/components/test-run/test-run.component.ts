import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@t-vision/utils';
import { TestRunStore } from '../../store';
import { TestTimePipe } from '../../pipes';

@Component({
  standalone: true,
  selector: 'mon-test-run',
  templateUrl: 'test-run.component.html',
  styleUrl: 'test-run.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ClassBinder],
  imports: [TestTimePipe],
})
export class TestRunComponent implements AfterViewInit {
  public packageName = input.required<string>();

  public lastRun = computed(() => {
    const lastRuns = this._testRunStore.lastRuns();
    return lastRuns[this.packageName()] || null;
  });

  private _testRunStore = inject(TestRunStore);

  constructor(private _classBinder: ClassBinder) {
    this._classBinder.bind('mon-test-run');
  }

  public ngAfterViewInit(): void {
    this._testRunStore.getLastTestRun(this.packageName());
  }
}

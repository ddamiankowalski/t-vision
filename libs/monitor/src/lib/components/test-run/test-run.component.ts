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

@Component({
  standalone: true,
  selector: 'mon-test-run',
  templateUrl: 'test-run.component.html',
  styleUrl: 'test-run.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ClassBinder],
  imports: [TestTimePipe, LoaderComponent],
})
export class TestRunComponent implements AfterViewInit {
  public packageName = input.required<string>();

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
    console.log(this.runInfo());
    this._classBinder.bind;
  }
}

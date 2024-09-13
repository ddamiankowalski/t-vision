import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { LoaderComponent } from '@t-vision/ui';
import { ClassBinder } from '@t-vision/utils';

@Component({
  standalone: true,
  selector: 'mon-test-run-icon',
  styleUrl: 'test-run-icon.component.scss',
  templateUrl: 'test-run-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
  imports: [LoaderComponent],
})
export class TestRunIconComponent {
  public status = input.required<'SUCCESS' | 'ONGOING' | 'FAILED'>();

  constructor(classBinder: ClassBinder) {
    classBinder.bind('mon-test-run-icon');
  }
}

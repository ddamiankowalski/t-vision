import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@t-vision/utils';

@Component({
  standalone: true,
  selector: 'ui-loader',
  templateUrl: 'loader.component.html',
  styleUrl: 'loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
})
export class LoaderComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('ui-loader');
  }
}

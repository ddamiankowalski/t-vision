import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
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
  public color = input<string>('secondary-dark-highlight');

  constructor(private _classBinder: ClassBinder) {
    _classBinder.bind('ui-loader');
    effect(() => this._updateColors());
  }

  private _updateColors(): void {
    this._classBinder.bind(`ui-loader--${this.color()}`);
  }
}

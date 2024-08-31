import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { CalculatorStore } from '@t-vision/t-vision-state';

@Component({
  standalone: true,
  selector: 'tv-calculator',
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CalculatorComponent {
  private _store = inject(CalculatorStore);

  public value = this._store.counter;

  public onIncrementClick(): void {
    this._store.increment();
  }

  public onDecrementClick(): void {
    this._store.decrement();
  }
}

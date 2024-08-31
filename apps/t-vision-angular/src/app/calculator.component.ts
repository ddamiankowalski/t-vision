import {
  ChangeDetectionStrategy,
  Component,
  effect,
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
  public store = inject(CalculatorStore);
  // private _injector = inject(Injector);

  public value = this.store.counter;

  constructor() {
    effect(() => {
      console.log(this.store.isLot());
    });
    // watchState(this._store, (state) => console.log(state), {
    //   injector: this._injector,
    // });
  }

  public onIncrementClick(): void {
    this.store.increment();
  }

  public onDecrementClick(): void {
    this.store.decrement();
  }
}

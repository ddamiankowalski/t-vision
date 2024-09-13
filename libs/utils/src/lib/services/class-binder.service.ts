import { ElementRef, inject, Injectable } from '@angular/core';

@Injectable()
export class ClassBinder {
  private _element = inject(ElementRef);

  private get _nativeElement(): HTMLElement {
    return this._element.nativeElement;
  }

  /**
   * Binds correct class to html element.
   *
   * @param className
   */
  public bind(className: string): void {
    this._nativeElement.classList.add(className);
  }

  /**
   * Conditionally binds css class to the host element.
   */
  public conditionalBind(condition: boolean, className: string): void {
    this._nativeElement.classList.remove(className);

    if (condition) {
      this._nativeElement.classList.add(className);
    }
  }
}

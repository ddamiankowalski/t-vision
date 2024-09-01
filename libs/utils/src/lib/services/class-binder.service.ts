import { ElementRef, inject, Injectable } from '@angular/core';

@Injectable()
export class ClassBinder {
  private _element = inject(ElementRef);

  /**
   * Binds correct class to html element.
   *
   * @param className
   */
  public bind(className: string): void {
    const element = this._element.nativeElement;
    element.classList.add(className);
  }
}

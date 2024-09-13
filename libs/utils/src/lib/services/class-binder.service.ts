import { ElementRef, inject, Injectable } from '@angular/core';

@Injectable()
export class ClassBinder {
  private _element = inject(ElementRef);
  private _classSet = new Set<string>();

  private get _nativeElement(): HTMLElement {
    return this._element.nativeElement;
  }

  /**
   * Binds correct class to html element.
   *
   * @param className
   */
  public bind(className: string): void {
    this._bind(className);
  }

  /**
   * Conditionally binds css class to the host element.
   */
  public conditionalBind(condition: boolean, className: string): void {
    this._unbind(className);

    if (condition) {
      this._bind(className);
    }
  }

  /**
   * Unbinds single class name.
   *
   * @param className
   */
  public unbind(className: string): void {
    this._unbind(className);
  }

  /**
   * Unbinds all previously bound classes.
   */
  public unbindAll(): void {
    this._classSet.forEach((className) => this._unbind(className));
    this._classSet = new Set();
  }

  private _bind(className: string): void {
    this._nativeElement.classList.add(className);
    this._classSet.add(className);
  }

  private _unbind(className: string): void {
    this._nativeElement.classList.remove(className);
    this._classSet.delete(className);
  }
}

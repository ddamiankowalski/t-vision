import { Component, input, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@t-vision/utils';

@Component({
  selector: 'ui-icon',
  standalone: true,
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
})
export class IconComponent {
  public name = input.required<string>();

  constructor(private classBinder: ClassBinder) {
    this.classBinder.bind('ui-icon');
  }
}

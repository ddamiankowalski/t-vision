import { Component } from '@angular/core';
import { CalculatorComponent } from './calculator.component';

@Component({
  standalone: true,
  selector: 'tv-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CalculatorComponent],
})
export class AppComponent {
  title = 't-vision-angular';
}

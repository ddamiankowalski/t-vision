import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'testTime',
})
export class TestTimePipe implements PipeTransform {
  transform(timeMs: number): string {
    const date = new Date(timeMs);
    return `${date.getMinutes()}mins ${date.getSeconds()}s`;
  }
}

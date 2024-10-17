import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true,
})
export class PricePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    // prepend a Rand currency sign
    return `R ${value} p/h`;
  }
}

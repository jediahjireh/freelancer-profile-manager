import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateName',
  standalone: true,
})
export class TruncateNamePipe implements PipeTransform {
  transform(
    value: string,
    maxLength: number = 20,
    ellipsis: string = '...'
  ): unknown {
    // shorten and show continuation of name for longer names
    if (value.length > maxLength) {
      return value.slice(0, maxLength) + ellipsis;
    }

    return value;
  }
}

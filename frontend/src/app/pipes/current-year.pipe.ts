import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currentYear',
  standalone: true,
})
export class CurrentYearPipe implements PipeTransform {
  // return the current year
  transform(defaultYear: number): number {
    const currentYear = new Date().getFullYear();
    return currentYear || defaultYear;
  }
}

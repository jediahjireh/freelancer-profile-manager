import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calendarPeriod',
  standalone: true,
})
export class CalendarPeriodPipe implements PipeTransform {
  transform(startDate: string | Date, endDate: string | Date): string {
    const start = new Date(startDate);
    // use the current date if no end date is provided as it indicates that the time is ongoing
    const end = endDate ? new Date(endDate) : new Date();

    // difference between start and end date in milliseconds - precise, standard and efficient
    const diffInMilliseconds = Math.abs(end.getTime() - start.getTime());

    // convert milliseconds into years, months and days
    let diffInYears = Math.floor(
      diffInMilliseconds / (1000 * 60 * 60 * 24 * 365)
    );
    let diffInMonths = Math.floor(
      (diffInMilliseconds % (1000 * 60 * 60 * 24 * 365)) /
        (1000 * 60 * 60 * 24 * 30)
    );
    const diffInDays = Math.floor(
      (diffInMilliseconds % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
    );

    // readable format to display (inspired by LinkedIn's time period display)
    let result = '';

    // round up months if days >= 15
    if (diffInDays >= 15) {
      diffInMonths += 1;
    }

    // convert 12 or more months into a year
    if (diffInMonths >= 12) {
      diffInYears += 1;
      // reset months after adding to years
      diffInMonths = diffInMonths % 12;
    }

    // construct the readable result
    if (diffInYears > 0) {
      result += `${diffInYears} yr${diffInYears > 1 ? 's' : ''}`;
    }
    if (diffInMonths > 0) {
      result += `${result ? ' ' : ''}${diffInMonths} mo${
        diffInMonths > 1 ? 's' : ''
      }`;
    }

    // no difference - 0 duration
    return result || '0 days';
  }
}

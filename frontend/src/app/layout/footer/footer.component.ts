import { Component } from '@angular/core';
import { CurrentYearPipe } from '../../pipes/current-year.pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CurrentYearPipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {}

import { Component, Inject } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';

@Component({
  selector: 'nx-angular-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(@Inject(APOLLO_OPTIONS) options: string) {
    console.log(options);
  }
}

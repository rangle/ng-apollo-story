import { Component } from '@angular/core';
import { GetNotesGQL } from '@nx-angular/apollo-story-data';

@Component({
  selector: 'app-rates-page',
  templateUrl: './rates.page.html',
})
export class RatesPageComponent {
  notesData$;

  constructor(private getNotesGQL: GetNotesGQL) {
    this.notesData$ = this.getNotesGQL.fetch();
  }
}

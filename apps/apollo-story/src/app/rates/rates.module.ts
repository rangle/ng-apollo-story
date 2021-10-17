import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatesRoutingModule } from './rates-routing.module';
import { RatesPageComponent } from './rates.page';
import { RatesComponent } from './rates.component';

@NgModule({
  declarations: [RatesPageComponent, RatesComponent],
  imports: [CommonModule, RatesRoutingModule],
})
export class RatesModule {}

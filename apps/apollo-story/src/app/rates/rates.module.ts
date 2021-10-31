import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatesRoutingModule } from './rates-routing.module';
import { RatesPageComponent } from './rates.page';
import { RatesComponent } from './rates.component';
import { RatesGraphModule } from './rates-graph/rates-graph.module';

@NgModule({
  declarations: [RatesPageComponent, RatesComponent],
  imports: [CommonModule, RatesRoutingModule, RatesGraphModule],
})
export class RatesModule {}

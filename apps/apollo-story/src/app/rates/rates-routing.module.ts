import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RatesPageComponent } from './rates.page';

const routes: Routes = [{ path: '', component: RatesPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RatesRoutingModule {}

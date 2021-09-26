import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'rates',
    loadChildren: () =>
      import('./page/rates/rates.module').then((m) => m.RatesModule),
  },
  // {
  //   path: '/',
  //   loadChildren: () =>
  //     import('./page/home/home.module').then((m) => m.HomeModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

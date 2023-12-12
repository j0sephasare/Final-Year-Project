import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RonaldoPage } from './ronaldo.page';

const routes: Routes = [
  {
    path: '',
    component: RonaldoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RonaldoPageRoutingModule {}

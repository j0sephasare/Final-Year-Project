import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeightworkoutsPage } from './weightworkouts.page';

const routes: Routes = [
  {
    path: '',
    component: WeightworkoutsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeightworkoutsPageRoutingModule {}

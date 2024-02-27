import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinishWorkoutPage } from './finish-workout.page';

const routes: Routes = [
  {
    path: '',
    component: FinishWorkoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinishWorkoutPageRoutingModule {}

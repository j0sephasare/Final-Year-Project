import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoxingWorkoutPage } from './boxing-workout.page';

const routes: Routes = [
  {
    path: '',
    component: BoxingWorkoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoxingWorkoutPageRoutingModule {}

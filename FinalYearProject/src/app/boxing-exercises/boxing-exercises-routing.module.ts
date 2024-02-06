import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoxingExercisesPage } from './boxing-exercises.page';

const routes: Routes = [
  {
    path: '',
    component: BoxingExercisesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoxingExercisesPageRoutingModule {}

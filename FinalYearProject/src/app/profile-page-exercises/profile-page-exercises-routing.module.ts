import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePageExercisesPage } from './profile-page-exercises.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePageExercisesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageExercisesPageRoutingModule {}

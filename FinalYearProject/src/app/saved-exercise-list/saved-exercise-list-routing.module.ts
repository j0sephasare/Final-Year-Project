import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedExerciseListPage } from './saved-exercise-list.page';

const routes: Routes = [
  {
    path: '',
    component: SavedExerciseListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedExerciseListPageRoutingModule {}

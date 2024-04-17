import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { SavedExerciseListPageRoutingModule } from './saved-exercise-list-routing.module';

import { SavedExerciseListPage } from './saved-exercise-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SavedExerciseListPageRoutingModule
  ],
  declarations: [SavedExerciseListPage]
})
export class SavedExerciseListPageModule {}

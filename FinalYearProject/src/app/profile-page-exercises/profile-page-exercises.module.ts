import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageExercisesPageRoutingModule } from './profile-page-exercises-routing.module';

import { ProfilePageExercisesPage } from './profile-page-exercises.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageExercisesPageRoutingModule
  ],
  declarations: [ProfilePageExercisesPage]
})
export class ProfilePageExercisesPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoxingExercisesPageRoutingModule } from './boxing-exercises-routing.module';

import { BoxingExercisesPage } from './boxing-exercises.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoxingExercisesPageRoutingModule
  ],
  declarations: [BoxingExercisesPage]
})
export class BoxingExercisesPageModule {}

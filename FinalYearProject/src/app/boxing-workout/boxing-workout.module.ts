import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoxingWorkoutPageRoutingModule } from './boxing-workout-routing.module';

import { BoxingWorkoutPage } from './boxing-workout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoxingWorkoutPageRoutingModule
  ],
  declarations: [BoxingWorkoutPage]
})
export class BoxingWorkoutPageModule {}

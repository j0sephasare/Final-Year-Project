import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinishWorkoutPageRoutingModule } from './finish-workout-routing.module';

import { FinishWorkoutPage } from './finish-workout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinishWorkoutPageRoutingModule
  ],
  declarations: [FinishWorkoutPage]
})
export class FinishWorkoutPageModule {}

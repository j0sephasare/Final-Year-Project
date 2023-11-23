import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeightworkoutsPageRoutingModule } from './weightworkouts-routing.module';

import { WeightworkoutsPage } from './weightworkouts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeightworkoutsPageRoutingModule
  ],
  declarations: [WeightworkoutsPage]
})
export class WeightworkoutsPageModule {}

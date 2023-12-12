import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RonaldoPageRoutingModule } from './ronaldo-routing.module';

import { RonaldoPage } from './ronaldo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RonaldoPageRoutingModule
  ],
  declarations: [RonaldoPage]
})
export class RonaldoPageModule {}

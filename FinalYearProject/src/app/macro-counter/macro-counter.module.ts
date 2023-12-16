import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MacroCounterPageRoutingModule } from './macro-counter-routing.module';

import { MacroCounterPage } from './macro-counter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MacroCounterPageRoutingModule
  ],
  declarations: [MacroCounterPage]
})
export class MacroCounterPageModule {}

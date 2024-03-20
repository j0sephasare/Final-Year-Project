import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoForRunPageRoutingModule } from './go-for-run-routing.module';

import { GoForRunPage } from './go-for-run.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoForRunPageRoutingModule
  ],
  declarations: [GoForRunPage]
})
export class GoForRunPageModule {}

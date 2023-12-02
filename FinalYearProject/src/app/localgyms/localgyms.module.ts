import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocalgymsPageRoutingModule } from './localgyms-routing.module';

import { LocalgymsPage } from './localgyms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalgymsPageRoutingModule
  ],
  declarations: [LocalgymsPage]
})
export class LocalgymsPageModule {}

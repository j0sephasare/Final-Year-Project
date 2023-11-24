import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MicroServiceLoginPageRoutingModule } from './micro-service-login-routing.module';

import { MicroServiceLoginPage } from './micro-service-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MicroServiceLoginPageRoutingModule
  ],
  declarations: [MicroServiceLoginPage]
})
export class MicroServiceLoginPageModule {}

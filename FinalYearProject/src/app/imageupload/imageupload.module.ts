import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageuploadPageRoutingModule } from './imageupload-routing.module';

import { ImageuploadPage } from './imageupload.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageuploadPageRoutingModule
  ],
  declarations: [ImageuploadPage]
})
export class ImageuploadPageModule {}

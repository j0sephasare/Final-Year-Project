import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageuploadPage } from './imageupload.page';

const routes: Routes = [
  {
    path: '',
    component: ImageuploadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageuploadPageRoutingModule {}

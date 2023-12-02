import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocalgymsPage } from './localgyms.page';

const routes: Routes = [
  {
    path: '',
    component: LocalgymsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalgymsPageRoutingModule {}

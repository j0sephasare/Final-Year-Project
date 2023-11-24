import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MicroServiceLoginPage } from './micro-service-login.page';

const routes: Routes = [
  {
    path: '',
    component: MicroServiceLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MicroServiceLoginPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoForRunPage } from './go-for-run.page';

const routes: Routes = [
  {
    path: '',
    component: GoForRunPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoForRunPageRoutingModule {}

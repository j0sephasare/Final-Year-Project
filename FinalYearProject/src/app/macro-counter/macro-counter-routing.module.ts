import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MacroCounterPage } from './macro-counter.page';

const routes: Routes = [
  {
    path: '',
    component: MacroCounterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MacroCounterPageRoutingModule {}

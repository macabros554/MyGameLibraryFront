import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpcionesJuegoPage } from './opciones-juego.page';

const routes: Routes = [
  {
    path: '',
    component: OpcionesJuegoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpcionesJuegoPageRoutingModule {}

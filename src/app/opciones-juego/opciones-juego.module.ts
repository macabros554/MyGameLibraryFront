import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpcionesJuegoPageRoutingModule } from './opciones-juego-routing.module';

import { OpcionesJuegoPage } from './opciones-juego.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpcionesJuegoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [OpcionesJuegoPage]
})
export class OpcionesJuegoPageModule {}

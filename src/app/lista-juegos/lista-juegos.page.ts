import { Component, OnInit } from '@angular/core';
import { juegoConId } from '../interfaces/juego.interface';
import { JuegoService } from '../services/juego.service';


@Component({
  selector: 'app-lista-juegos',
  templateUrl: './lista-juegos.page.html',
  styleUrls: ['./lista-juegos.page.scss'],
})
export class ListaJuegosPage implements OnInit {

  constructor(private serviceJuego:JuegoService) { }

  listaDeJuegos:juegoConId[]=[];
  espera:boolean=false;

  ngOnInit() {
    this.mostrarJuegos();
  }

  mostrarJuegos(){
    this.serviceJuego.sacarListaJuegos().subscribe({
      next: (resp => {
        this.listaDeJuegos=resp;
        this.espera=true;
    }),
      error: resp => {
      }
  });
  }

}

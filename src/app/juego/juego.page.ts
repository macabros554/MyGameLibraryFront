import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../services/juego.service';
import { ActivatedRoute } from '@angular/router';
import { juego, juegoConId } from '../interfaces/juego.interface';
import { FavoritoService } from '../services/favorito.service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.page.html',
  styleUrls: ['./juego.page.scss'],
})
export class JuegoPage implements OnInit {

  juego:juegoConId;
  espera:boolean=false;
  estrella:boolean=false;

  constructor(private serviceJuego:JuegoService,private route: ActivatedRoute, private serviceFavorito:FavoritoService) { }

  ngOnInit() {
    this.buscarJuego();
    this.estaEnFavorito(this.route.snapshot.paramMap.get('id'));
  }

  buscarJuego(){
    this.serviceJuego.sacarJuego(this.route.snapshot.paramMap.get('id')).subscribe({
      next: (resp => {
        this.juego=resp;
        this.espera=true;
    }),
      error: resp => {
      }
    });
  }

  estaEnFavorito(idJuego:string){
    this.estrella=false;
    if (this.serviceFavorito.comprobarFavorito(idJuego)) {
      this.estrella=true;
    }
    //console.log(this.serviceFavorito.comprobarFavorito(idJuego))

  }

  anadirFavorito(idJuego:string){
    this.serviceFavorito.anadirFavorito(idJuego);
    this.estrella=true;
  }

  borrarFavorito(idJuego:string){
    this.serviceFavorito.borrarFavorito(idJuego);
    this.estrella=false;
  }
}

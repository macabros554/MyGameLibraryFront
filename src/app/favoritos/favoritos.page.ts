import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../services/juego.service';
import { juegoConId } from '../interfaces/juego.interface';
import { FavoritoService } from '../services/favorito.service';
import { juegoFavoritoConId } from '../interfaces/favorito.inerface';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  constructor(private serviceJuego:JuegoService,private serviceFavorito:FavoritoService) { }

  listaDeJuegos:juegoConId[]=[];
  listaDeFavoritos:juegoFavoritoConId[]=[]
  espera:boolean=false;

  ngOnInit() {
    this.sacarFavoritos();
  }

  sacarFavoritos(){
    let idUsuarioid=localStorage.getItem('uid');
    this.serviceFavorito.sacarListaFavoritos().subscribe({
      next: (resp => {
        //console.log(resp);
        resp.forEach(favorito => {
          if(favorito.idUsuario=idUsuarioid){
            this.listaDeFavoritos.push(favorito);
          }
        });
        this.espera=true
    }),
      error: resp => {
      }
  });

  }




}

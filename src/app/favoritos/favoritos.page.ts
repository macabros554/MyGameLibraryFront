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

    this.listaDeFavoritos=this.serviceFavorito.listaFavoritosUsuario();
    this.mostrarJuegos();
  }

  mostrarJuegos(){
    console.log(this.listaDeFavoritos)
    console.log(this.listaDeFavoritos[0])

    for (let i = 0; i < this.listaDeFavoritos.length; i++) {
      this.serviceJuego.sacarJuego(this.listaDeFavoritos[i].idJuego).subscribe({
        next:(resp=>{
          console.log(resp)
          this.listaDeJuegos.push(resp);
        }),
        error: resp => {
          console.log("resp")
        }
      })

    }

    if(this.listaDeFavoritos.length=this.listaDeJuegos.length){
      this.espera=true;
    }


  }


}

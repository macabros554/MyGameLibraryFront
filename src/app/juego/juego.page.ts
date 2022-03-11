import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../services/juego.service';
import { ActivatedRoute } from '@angular/router';
import { juego, juegoConId } from '../interfaces/juego.interface';
import { FavoritoService } from '../services/favorito.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.page.html',
  styleUrls: ['./juego.page.scss'],
})
export class JuegoPage implements OnInit {

  juego:juegoConId;
  espera:boolean=false;
  estrella:boolean=false;
  modificar:boolean=false;

  constructor(private fb: FormBuilder, private serviceJuego:JuegoService,private route: ActivatedRoute, private serviceFavorito:FavoritoService) { }

  juegoModificado:juegoConId={
    id:this.route.snapshot.paramMap.get('id'),
    nombre: "",
    genero: "",
    precio: "",
    imagen: "",
    descripcion: "",
  }

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

  borrarElJuego(idJuego:string){
    this.serviceJuego.borrarjuego(idJuego);
  }

  estaEnFavorito(idJuego:string){
    this.estrella=false;
    if (this.serviceFavorito.comprobarFavorito(idJuego)) {
      this.estrella=true;
    }
  }

  anadirFavorito(idJuego:juegoConId){
    this.serviceFavorito.anadirFavorito(idJuego);
    this.estrella=true;
  }

  borrarFavorito(idJuego:string){
    this.serviceFavorito.borrarFavorito(idJuego);
    this.estrella=false;
  }

  editarJuego(){
    this.serviceJuego.modificarJuego(this.juegoModificado)
  }

  botonModificar(){
    if (this.modificar) {
      this.modificar=false;
    }else{
      this.modificar=true;
    }
  }
}

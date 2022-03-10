import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { juego } from '../interfaces/juego.interface';
import { JuegoService } from '../services/juego.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-opciones-juego',
  templateUrl: './opciones-juego.page.html',
  styleUrls: ['./opciones-juego.page.scss'],
})
export class OpcionesJuegoPage implements OnInit {

  /*juegoExiste:boolean;
  listaJuegos:juego[]=[];*/

  constructor(private fb: FormBuilder,private serviceJuego:JuegoService,private router:Router) { }

  juego: FormGroup = this.fb.group({
    nombre: ['', [ Validators.required, Validators.minLength(4) ]],
    genero: ['', [ Validators.required, Validators.minLength(4) ]],
    precio: ['', [ Validators.required]],
    imagen: ['', [ Validators.required, Validators.minLength(4) ]],
    descripcion: ['', [ Validators.required, Validators.minLength(4) ]],
  });

  ngOnInit() {
  }

  enviarJuego(){
    const juego:juego=this.juego.value;
    this.serviceJuego.enviar(juego);
    this.router.navigateByUrl('lista-juegos')
  }

  /*validarExistencia(){
    this.juegoExiste=false;
    const juegoEnviado:juego=this.juego.value;

    for (let i = 0; i < this.listaJuegos.length; i++) {
      if(this.listaJuegos[i].nombre==juegoEnviado.nombre){

      }else if(this.listaJuegos[i].imagen==juegoEnviado.imagen){

      }else{
        this.juegoExiste=true;
      }
    }

    if (this.juegoExiste || this.listaJuegos.length == 0) {
      this.enviarJuego();
    }

  }

  listaDJuegos(){
    this.serviceJuego.sacarListaJuegos().subscribe({
      next: (resp => {
        this.listaJuegos=resp;
        this.validarExistencia();
    }),
      error: resp => {

      }
  });
  }*/


  campoEsValido( campo: string ) {
    return this.juego.controls[campo].errors
            && this.juego.controls[campo].touched;
  }
}

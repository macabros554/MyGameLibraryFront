import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, docData, doc, deleteDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { juego, juegoConId } from '../interfaces/juego.interface';
import { Observable } from 'rxjs';
import { juegoFavorito, juegoFavoritoConId } from '../interfaces/favorito.inerface';


@Injectable({
  providedIn: 'root'
})
export class FavoritoService {
  constructor( private firestore : Firestore, private router:Router) { }

  listaFavoritos:juegoFavoritoConId[]=[];

  comprobarFavorito(idJuegoid:string){
    let existe=false;
    let idUsuarioid=localStorage.getItem('uid');
    this.sacarListaFavoritos().subscribe({
      next: (resp => {
        this.listaFavoritos=resp;
    }),
      error: resp => {
      }
  });

  this.listaFavoritos.forEach(favorito => {
    if(favorito.idJuego==idJuegoid){
      if(favorito.idUsuario=idUsuarioid){
        return existe=true;
      }
    }
  });

  return existe;
  }

  sacarListaFavoritos(){
    const juegosLira = collection(this.firestore, 'favoritos');
    return collectionData(juegosLira, { idField: 'id'}) as Observable<juegoFavoritoConId[]>;
  }

  anadirFavorito(idJuegoid:string){
    let idUsuarioid=localStorage.getItem('uid');
    let favoritos={
      idJuego:idJuegoid,
      idUsuario:idUsuarioid
    }
    const juegoFavorito = collection(this.firestore, 'favoritos');
    return addDoc(juegoFavorito, favoritos);
  }

  borrarFavorito(idJuegoid:string){
    let borrarJuegoid:string="a";
    let idUsuarioid=localStorage.getItem('uid');
    this.sacarListaFavoritos().subscribe({
      next: (resp => {
        this.listaFavoritos=resp;
    }),
      error: resp => {
      }
  });

  this.listaFavoritos.forEach(favorito => {
    if(favorito.idJuego==idJuegoid){
      if(favorito.idUsuario=idUsuarioid){
        borrarJuegoid=favorito.id;
      }
    }
  });

  if (borrarJuegoid!="a") {
    const favoritoLira = doc(this.firestore, `favoritos/${borrarJuegoid}`);
    return deleteDoc(favoritoLira);
  }

  }

  listaFavoritosUsuario(){

    let idUsuarioid=localStorage.getItem('uid');
    let lista:juegoFavoritoConId[]=[];
    this.sacarListaFavoritos().subscribe({
      next: (resp => {
        resp.forEach(favorito => {
          if(favorito.idUsuario=idUsuarioid){
            lista.push(favorito);
          }
        });
    }),
      error: resp => {
      }
  });
  return lista;





  }




}

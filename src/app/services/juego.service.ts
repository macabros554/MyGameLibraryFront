import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, docData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { juego, juegoConId } from '../interfaces/juego.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JuegoService {
  constructor( private firestore : Firestore, private router:Router) { }

  sacarListaJuegos(): Observable<juegoConId[]>{
    const juegosLira = collection(this.firestore, 'juegos');
    return collectionData(juegosLira, { idField: 'id'}) as Observable<juegoConId[]>;
  }

  enviar(juego:juego){
    const juegosLira = collection(this.firestore, 'juegos');
    return addDoc(juegosLira, juego);
  }

  sacarJuego(id): Observable<juegoConId>{
    const juegosLira = doc(this.firestore, `juegos/${id}`);
    return docData(juegosLira, { idField: 'id' }) as Observable<juegoConId>;
  }

  borrarjuego(id:string){
    const juegosLira = doc(this.firestore, `juegos/${id}`);
    return deleteDoc(juegosLira);
  }

  modificarJuego(juego: juegoConId) {
    const juegosLira = doc(this.firestore, `juegos/${juego.id}`);
    return updateDoc(juegosLira, { nombre: juego.nombre, genero: juego.genero,
      precio:juego.precio,imagen:juego.imagen,descripcion:juego.descripcion, });
  }


}

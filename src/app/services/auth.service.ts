import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { usuario, usuariolog } from '../interfaces/usuario.interface';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor( private firestore : Firestore, private router:Router) { }



  login(usuario:usuariolog){
    const auth = getAuth();

    signInWithEmailAndPassword(auth, usuario.email, usuario.password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem('uid',user.uid);
        this.router.navigateByUrl('/lista-juegos');
      })
      .catch((error) => {
        console.log(error);
        Swal.fire('Nombre o contraseña invalido')
      });
  }

  registrar(usuario:usuario){
    console.log(usuario);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, usuario.email, usuario.password)
  .then((iuserCredential) => {
    this.router.navigateByUrl('/login');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  }

  validarUsuario(){
    const auth = getAuth();
    let id=localStorage.getItem('uid');
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
      } else {
        Swal.fire('Nombre o contraseña minusvalidos')
      }
    });
  }
}

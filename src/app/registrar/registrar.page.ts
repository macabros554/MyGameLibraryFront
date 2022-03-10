import { Component, OnInit } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  auth = getAuth();

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [ Validators.required, Validators.minLength(3) ]],
    email: ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder, private serviceAuth: AuthService) { }

  ngOnInit() {
  }

  registrar(){
    const user = this.miFormulario.value;

    this.serviceAuth.registrar(user);
  }

  campoEsValido( campo: string ) {
    return this.miFormulario.controls[campo].errors
            && this.miFormulario.controls[campo].touched;
  }


}

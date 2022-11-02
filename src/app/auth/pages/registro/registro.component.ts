import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  miFormulario: FormGroup = this.fb.group({
    name: ['', [
      Validators.required, Validators.minLength(3)
    ]],
    email: ['', [
      Validators.required, Validators.email
    ]],
    password: ['', [
      Validators.required, Validators.minLength(6)
    ]]
  })


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sAuth: AuthService
  ) { }

  crearUsuario() {
    this.sAuth.crearUsuario(this.miFormulario.value)
      .subscribe(
        (res) => {
          if (res === true) {

          } else {
            Swal.fire(
              'Error',
              res.message[0].msg,
              'error'
            )
          }
        }
      );
    // this.router.navigateByUrl('/dashboard')
  }

}

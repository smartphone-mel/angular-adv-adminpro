import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;
  public registerForm: any;
  sTextoValidacion?: string = undefined;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private _usuario: UsuarioService
  ) {
    this.registerForm = this.fb.group( {
        nombre: [ '', [ Validators.required, Validators.minLength(2) ] ],
        apellido: [ '', [ Validators.required, Validators.minLength(2) ] ],
        email: [ '', [ Validators.required, Validators.email ] ],
        password: [ '', [ Validators.required, Validators.minLength(4) ] ],
        password_bis: [ '', [ Validators.required, Validators.minLength(4) ] ],
        terminos: [ false, Validators.required ]
      }, {
        validators: [
          this.passwordsIguales('password', 'password_bis'),
          this.terminosAceptados('terminos')
        ]
      } );
  }

  ngOnInit(): void {
  }

  crearUsuario() {
    this.formSubmitted = true;

    if (this.registerForm.valid)
      this._usuario.crearUsuario(this.registerForm.value)
        .subscribe(
          (res) => {
            Swal.fire('Ok!', 'Usuario creado satisfactoriamente.', 'info');
            this.ngZone.run( () => {
              this.router.navigateByUrl('/');
            } );
          },
          (eError) => {
            //Swal.fire('Error', eError.error.msg, 'error');
            Swal.fire('Error', eError.message, 'error'); //eError.error.msg
          }
        );
  }

  validarCampos(): boolean {
    if (this.formSubmitted && this.registerForm.get('nombre').invalid) {
      this.sTextoValidacion = 'First Name!';
      return false;
    }
    if (this.formSubmitted && this.registerForm.get('apellido').invalid) {
      this.sTextoValidacion = 'Last Name!';
      return false;
    }
    if (this.formSubmitted && this.registerForm.get('email').invalid) {
      this.sTextoValidacion = 'Email!';
      return false;
    }
    if (this.formSubmitted && this.registerForm.get('password').invalid) {
      this.sTextoValidacion = 'Password!';
      return false;
    }
    if (this.formSubmitted && this.registerForm.get('password_bis').invalid) {
      this.sTextoValidacion = 'Confirm Password!';
      return false;
    }
    if (this.formSubmitted &&
        this.registerForm.get('password').value !== this.registerForm.get('password_bis').value) {
      this.sTextoValidacion = 'Passwords must match correctly!';
      return false;
    }
    if (this.formSubmitted && !this.registerForm.get('terminos').value) {
      this.sTextoValidacion = 'Terms Agreement!';
      return false;
    }

    this.sTextoValidacion = undefined;
    return true;
  }

  passwordsIguales(password: string, password_bis: string) {
    return (formGroup: FormGroup) => {
      const p_Control = formGroup.get(password),
          pBis_Control = formGroup.get(password_bis);

      if (p_Control?.value === pBis_Control?.value)
        pBis_Control?.setErrors(null);
      else
        pBis_Control?.setErrors( { noEsIgual: true } );
    };
  }

  terminosAceptados(terminos: string) {
    return (formGroup: FormGroup) => {
      const t_Control = formGroup.get(terminos);

      if (t_Control?.value)
        t_Control?.setErrors(null);
      else
        t_Control?.setErrors( { faltaTerminos: true } );
    };
  }
}

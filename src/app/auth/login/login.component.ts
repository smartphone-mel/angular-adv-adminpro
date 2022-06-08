import { AfterViewInit, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';

/* js-gApi! */
declare const gapi: any;
declare function js_onSignIn_fSculptor($event: any): void;
js_onSignIn_fSculptor.child_fSculptor = function($event: any) { $event };
declare function js_onFailure_fSculptor($event: any): void;
js_onFailure_fSculptor.child_fSculptor = function($event: any) { $event };
declare function js_onSignIn(googleUser: any): void;
declare function js_onFailure(eError: any): void;

/* js-globalCookies! */
declare const ADMINPRO_BFORCE_LOGINREFRESH: string;
declare function js_getGlobalCookies(vDescription: string): string | undefined;
declare function js_setGlobalCookies(vDescription: string, vValue: string): void;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  public formSubmitted = false;
  public loginForm: any;
  sTextoValidacion?: string = undefined;
  bLoadedFlag = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private _usuario: UsuarioService
  ) {
    this.setLoginRefreshCookies();
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group( {
        email: [ localStorage.getItem('email') || '', [ Validators.required, Validators.email ] ],
        password: [ '', [ Validators.required, Validators.minLength(4) ] ],
        remember: [ false ]
      } );
  }

  ngAfterViewInit() {
    js_onSignIn_fSculptor.child_fSculptor = this.onSignIn;
    js_onFailure_fSculptor.child_fSculptor = this.onFailure;
    this.bLoadedFlag = true;
  }

  ngOnDestroy() {
    this.setLoginRefreshCookies(false);
  }

  setLoginRefreshCookies(bValue = true) {
    let bForce_LoginRefresh = js_getGlobalCookies(ADMINPRO_BFORCE_LOGINREFRESH);

    if (bForce_LoginRefresh != null || bForce_LoginRefresh != undefined) {
      if ( bForce_LoginRefresh === bValue.toString() ) {
        js_setGlobalCookies( ADMINPRO_BFORCE_LOGINREFRESH, (!bValue).toString() );

        if (bValue)
          window.location.reload();
      } else if (bValue)
        Swal.fire('Google SignIn Info', 'This Google SignIn Technology is only for Tests Purposes!', 'info');
    } else {
      Swal.fire('Error', 'Cookies Error!', 'warning');
    }
  }

  validarCampos(): boolean {
    if (this.formSubmitted && this.loginForm.get('email').invalid) {
      this.sTextoValidacion = 'Email!';
      return false;
    }
    if (this.formSubmitted && this.loginForm.get('password').invalid) {
      this.sTextoValidacion = 'Password!';
      return false;
    }

    this.sTextoValidacion = undefined;
    return true;
  }

  login() {
    this.formSubmitted = true;

    if (this.loginForm.valid) {
      this._usuario.crearUsuario(this.loginForm.value)
        .subscribe(
          (res) => {
            if (this.loginForm.get('remember').value)
              localStorage.setItem('email', this.loginForm.get('email').value);
            else
              localStorage.removeItem('email');

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
  }

  onSignIn(googleUser: any) {
    try {
      if (this.bLoadedFlag) {
        var profile = googleUser.getBasicProfile(),
            id_token = googleUser.getAuthResponse().id_token;
  
        //console.log('ID: ' + profile.getId()), // Do not send to your backend! Use an ID token instead.
        //console.log('Name: ' + profile.getName()),
        //console.log('Given Name: ' + profile.getGivenName()),
        //console.log('Family Name: ' + profile.getFamilyName()),
        //console.log('Image URL: ' + profile.getImageUrl()),
        //console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        //console.log("ID Token: " + id_token);
  
        Swal.fire('SignIn Info', `Username: ${profile.getName()}`, 'info');
        /*this.ngZone.run( () => {
          this.router.navigateByUrl('/');
        } );*/

        // Google SignOut!
        this.signOut();
      }
    } catch (eError) {
      this.onFailure(eError);
    }
  }

  onFailure(gError: any) {
    try {
      if (this.bLoadedFlag)
        Swal.fire('SignIn Error', `Google Failure: ${gError.error}`, 'warning');
    } catch (eError: any) {
      Swal.fire('SignIn Error', `Error: ${eError.error}`, 'error');
    }
  }

  signOut() {
    try {
      if (this.bLoadedFlag) {
/*if (typeof module_google_login == 'undefined')
    console.warn('User cannot sign out.');
else*/
if (gapi && gapi.auth2 && gapi.auth2.init && typeof gapi.auth2.init === 'function' )
    gapi.auth2.init().then( function () {
        var auth2 = gapi.auth2.getAuthInstance();

        if (auth2 && auth2.signOut && typeof auth2.signOut === 'function')
            auth2.signOut().then( function () {
              Swal.fire('SignOut Info', 'User signed out.', 'info');
            } );
        else
          Swal.fire('SignOut Error', 'auth2.signOut() - User cannot sign out.', 'warning');
    } );
else
  Swal.fire('SignOut Error', 'gapi.auth2.init() - User cannot sign out.', 'warning');
      }
    } catch (eError: any) {
      Swal.fire('SignOut Error', `Error: ${eError.error}`, 'error');
    }
  }
}

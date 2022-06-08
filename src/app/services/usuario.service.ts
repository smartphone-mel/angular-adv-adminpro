import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${environment.webapi_url}/usuarios`, formData)
        .pipe(
          tap( (res: any) => {
            localStorage.setItem('token' , res.token);
          } )
        );
  }

  validarJWT(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${environment.webapi_url}/renew`, {
      headers: {
        'x-token': token
      }
    } ).pipe(
          tap( (res: any) => {
            localStorage.setItem('token' , res.token);
          } ),
          map( (res: any) => true ),
          catchError( (eError: any) => of(false) )
        );
  }

  login(formData: LoginForm) {
    return this.http.post(`${environment.webapi_url}/login`, formData)
        .pipe(
          tap( (res: any) => {
            localStorage.setItem('token' , res.token);
          } )
        );
  }

  logout() {
    localStorage.removeItem('token');
  }
}

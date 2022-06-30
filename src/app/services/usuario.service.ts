import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario?: Usuario = undefined;

  constructor(
    private http: HttpClient
  ) { }

  get token(): string { return localStorage.getItem('token') || '' }
  get uid(): string { return this.usuario?.uid || '' }
  get role(): string { return this.usuario?.role || '' }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${environment.webapi_url}/usuarios`, formData)
        .pipe(
          tap( (res: any) => {
            localStorage.setItem('token' , res.token);
          } )
        );
  }

  actualizarPerfil( data: { nombre: string, apellido: string, email: string, role: string } )
      : Observable<any> {
    data = {
      ...data,
      role: this.role
    }
    return this.http.put(`${environment.webapi_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      } } );
  }

  validarJWT(): Observable<boolean> {
    return this.http.get(`${environment.webapi_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    } ).pipe(
          map( (res: any) => { //tap(...)
            const { email, nombre, apellido, img, role, google, uid } = res.usuario;
            this.usuario = new Usuario(
                email, nombre, apellido, '', img, role, google, uid
              );
            localStorage.setItem('token' , res.token);
            return true;
          } ),
          //map( (res: any) => true ),
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

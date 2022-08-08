import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError, delay } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuarios } from '../interfaces/cargar-usuarios.interface';
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
  get headers() { return { headers: {
      'x-token': this.token
    } } }
  
  guardarLocalStorage(token: string, menu: any) {
    localStorage.setItem('token' , token);
    localStorage.setItem( 'menu-nav' , JSON.stringify(menu) );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${environment.webapi_url}/usuarios`, formData)
        .pipe(
          tap( (res: any) => {
            this.guardarLocalStorage(res.token, res.menu)
          } )
        );
  }

  validarJWT(): Observable<boolean> {
    return this.http.get(`${environment.webapi_url}/login/renew`, this.headers
        ).pipe(
          map( (res: any) => { //tap(...)
            const { email, nombre, apellido, img, role, google, uid } = res.usuario;
            this.usuario = new Usuario(
                email, nombre, apellido, '', img, role, google, uid
              );
            this.guardarLocalStorage(res.token, res.menu);
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
            this.guardarLocalStorage(res.token, res.menu)
          } )
        );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu-nav');
  }

  actualizarPerfil( data: { nombre: string, apellido: string, email: string, role: string } )
      : Observable<any> {
    data = {
      ...data,
      role: this.role
    }
    return this.http.put(`${environment.webapi_url}/usuarios/${this.uid}`, data, this.headers);
  }

  actualizarPerfilFull( data: { nombre: string, apellido: string, email: string, role: string } )
      : Observable<any> {
    data = {
      ...data
    }
    return this.http.put(`${environment.webapi_url}/usuarios/${this.uid}`, data, this.headers);
  }

  cargarUsuarios(desde: number = 0, bFirstLoad: boolean = false) {
    const url = `${environment.webapi_url}/usuarios?desde=${desde}&limite=5`;
    return this.http.get<CargarUsuarios>(url, this.headers)
      .pipe(
        delay( !bFirstLoad ? 450 : 980 ),
        map(
          res => {
            const usuarios = res.usuarios.map(
                user => new Usuario(
                  user.email, user.nombre, user.apellido, '',
                  user.img, user.role, user.google, user.uid
                )
              );

            return { count: res.count, usuarios} ;
          }
        )
      );
  }

  eliminarUsuario(uid?: string) {
    const url = `${environment.webapi_url}/usuarios/${uid}`;
    return this.http.delete<any>(url, this.headers);
  }
}

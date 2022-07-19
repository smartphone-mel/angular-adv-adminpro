import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(
    private http: HttpClient
  ) { }

  get token(): string { return localStorage.getItem('token') || '' }
  get headers() { return { headers: {
    'x-token': this.token
  } } }

  private transformarUsuarios( resultado: any[] ): Usuario[] {
    return resultado.map( xRow => new Usuario(
        xRow.email, xRow.nombre, xRow.apellido, '', xRow.img, xRow.role, xRow.google, xRow.uid
      ) );
  }

  busqueda(tabla: 'usuarios'|'medicos'|'hospitales', texto: string) {
    const url = `${environment.webapi_url}/todo/coleccion/${tabla}/${texto}`;
    return this.http.get< any[] >(url, this.headers)
        .pipe(
          map(
            (res: any) => {
              switch (tabla) {
                case 'usuarios':
                  return this.transformarUsuarios(res.resultado);
                case 'medicos':
                  return res.resultado;
                case 'hospitales':
                  return res.resultado;
                default:
                  return [];
              }
            }
          )
        );
  }
}

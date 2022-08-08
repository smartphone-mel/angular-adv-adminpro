import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

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

  private transformarMedicos( resultado: any[] ): Medico[] {
    return resultado;
  }

  private transformarHospitales( resultado: any[] ): Hospital[] {
    return resultado;
  }

  busquedaGlobal(texto: string) {
    const url = `${environment.webapi_url}/todo/${texto}`;
    return this.http.get(url, this.headers);
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
                  return this.transformarMedicos(res.resultado);
                case 'hospitales':
                  return this.transformarHospitales(res.resultado);
                default:
                  return [];
              }
            }
          )
        );
  }
}

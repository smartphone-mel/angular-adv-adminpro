import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(
    private http: HttpClient
  ) { }

  get token(): string { return localStorage.getItem('token') || '' }
  get headers() { return { headers: {
      'x-token': this.token
      } } }

  crearMedico(medico: Medico) {
    const url = `${environment.webapi_url}/medicos`;
    return this.http.post<any>(url, medico, this.headers)
      .pipe(
        map( ( res: { ok: boolean, medico: Medico } ) => res.medico )
      );
  }

  actualizarMedico(medico: Medico) {
    const url = `${environment.webapi_url}/medicos/${medico._id}`;
    return this.http.put<any>(url, medico, this.headers)
      .pipe(
        map( ( res: { ok: boolean, id: string } ) => res.id )
      );
  }

  cargarMedicos(bFirstLoad: boolean = false) {
    const url = `${environment.webapi_url}/medicos`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map( ( res: { ok: boolean, medicos: Medico[] } ) => res.medicos )
      );
  }

  eliminarMedico(_id: string) {
    const url = `${environment.webapi_url}/medicos/${_id}`;
    return this.http.delete<any>(url, this.headers)
      .pipe(
        map( ( res: { ok: boolean, id: string } ) => res.id )
      );
  }
}

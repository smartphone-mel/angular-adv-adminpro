import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    private http: HttpClient
  ) { }

  get token(): string { return localStorage.getItem('token') || '' }
  get headers() { return { headers: {
      'x-token': this.token
      } } }

  crearHospital(nombre: string) {
    const url = `${environment.webapi_url}/hospitales`;
    return this.http.post<any>(url, { nombre }, this.headers)
      .pipe(
        map( ( res: { ok: boolean, hospital: Hospital } ) => res.hospital )
      );
  }

  actualizarHospital( data: { id: string, nombre: string } ) {
    const url = `${environment.webapi_url}/hospitales/${data.id}`;
    return this.http.put<any>(url, data, this.headers)
      .pipe(
        map( ( res: { ok: boolean, id: string } ) => res.id )
      );
  }

  cargarHospitales(bFirstLoad: boolean = false) {
    const url = `${environment.webapi_url}/hospitales`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map( ( res: { ok: boolean, hospitales: Hospital[] } ) => res.hospitales )
      );
  }

  eliminarHospital(_id: string) {
    const url = `${environment.webapi_url}/hospitales/${_id}`;
    return this.http.delete<any>(url, this.headers)
      .pipe(
        map( ( res: { ok: boolean, id: string } ) => res.id )
      );
  }
}

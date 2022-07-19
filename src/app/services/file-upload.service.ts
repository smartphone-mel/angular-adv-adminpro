import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarUsuario(
    archivo: File,
    tipo: 'usuarios'|'medicos'|'hospitales',
    id: string
  ) {
    try {
      const url = `${environment.webapi_url}/uploads/${tipo}/${id}`,
          formData = new FormData();
      let res, data;

      formData.append('imagen', archivo);

      res = await fetch(url, {
          method: 'PUT',
          headers: {
            'x-token': localStorage.getItem('token') || ''
          },
          body: formData
        } );
      data = await res.json();

      if (data.ok)
        return data.nombreArchivo;
      else {
        console.warn(data.msg);
        return false;
      }
    } catch(eError) {
      console.warn(eError);
      return false;
    }
  }
}

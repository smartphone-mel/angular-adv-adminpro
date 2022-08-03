import { Pipe, PipeTransform } from '@angular/core';

import { environment } from 'src/environments/environment';

@Pipe({
  name: 'img'
})
export class ImgPipe implements PipeTransform {

  transform(img: string, tipo: 'usuarios'|'medicos'|'hospitales'): string {
    //return `. img: ${img} . tipo: ${tipo}`;
    if (img)
      return `${environment.webapi_url}/uploads/${tipo}/${img}`;
    else
        return `${environment.webapi_url}/uploads/no-image-available`;
  }

}

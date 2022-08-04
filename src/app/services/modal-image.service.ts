import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private _mostrarModal: boolean = false;
  public tipo: 'usuarios'|'medicos'|'hospitales' = 'usuarios';
  public id: string = '';
  public img: string  = '';

  public nuevaImg: EventEmitter<string> = new EventEmitter<string>();

  get mostrarModal() {
    return this._mostrarModal;
  }

  get noImageAvailable() {
    return `${environment.webapi_url}/uploads/no-image-available`;
  }

  abrirModal(
    tipo: 'usuarios'|'medicos'|'hospitales',
    id: string,
    img: string = ''
  ) {
    this.tipo = tipo;
    this.id = id;

    if (img === '')
      this.img = `${environment.webapi_url}/uploads/no-image-available`;
    else
      this.img = `${environment.webapi_url}/uploads/${tipo}/${img}`;

    this._mostrarModal = true;
  }

  cerrarModal() {
    this._mostrarModal = false;
  }

  constructor() { }
}

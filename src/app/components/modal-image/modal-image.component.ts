import { Component, OnInit } from '@angular/core';

import { ModalImageService } from 'src/app/services/modal-image.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {

  public imagenSubir?: File;
  public imgTemp: string | ArrayBuffer | null = null;

  constructor(
    public modalImageService: ModalImageService,
    private _fileUpload: FileUploadService
  ) { }

  ngOnInit(): void {
  }

  onChange(event: any) {
    this.cambiarImagen( event?.files[0] );
  }

  subirImagen() {
    this._fileUpload.actualizarUsuario(
        this.imagenSubir || new File([], ''),
        this.modalImageService.tipo,
        this.modalImageService.id
      ).then(
        img => {
          Swal.fire('Ok!', `Imagen (${this.modalImageService.tipo}) actualizada satisfactoriamente.`, 'info');
          this.modalImageService.nuevaImg.emit(img);
          this.cerrarModal();
        }
      ).catch(
        eError => Swal.fire('Error', `Error al actualizar la Imagen (${this.modalImageService.tipo}).`, 'error')
      );
  }

  cerrarModal() {
    this.imgTemp = null;
    this.modalImageService.cerrarModal();
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;

    if (!file) { this.imgTemp = null; return; }

    const fileReader = new FileReader(),
        url64 = fileReader.readAsDataURL(file);
    
    fileReader.onloadend = () => {
      this.imgTemp = fileReader.result;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: any; //FormGroup
  public usuario?: Usuario;
  public imagenSubir?: File;
  public imgTemp: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder,
      private _usuario: UsuarioService,
      private _fileUpload: FileUploadService) {
    this.usuario = _usuario.usuario;
    this.imagenSubir = undefined;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group( {
        nombre: [this.usuario?.nombre || '', Validators.required],
        apellido: [this.usuario?.apellido || '', Validators.required],
        email: [ this.usuario?.email || '', [ Validators.required, Validators.email] ],
      } );
  }

  actualizarPerfil() {
    this._usuario.actualizarPerfil(this.perfilForm.value).subscribe(
      res => {
        this._usuario.usuario!.nombre = this.perfilForm.value.nombre || '',
        this._usuario.usuario!.apellido = this.perfilForm.value.apellido || '',
        this._usuario.usuario!.email = this.perfilForm.value.email || '';
        Swal.fire('Ok!', 'Usuario actualizado satisfactoriamente.', 'info');
      },
      eError => {
        Swal.fire('Error', !eError.error.msg ? eError.message : eError.error.msg, 'error');
      } );
  }

  onChange(event: any) {
    this.cambiarImagen( event?.files[0] );
  }

  subirImagen() {
    this._fileUpload.actualizarUsuario(
        this.imagenSubir || new File([], ''),
        'usuarios',
        this.usuario?.uid || ''
      ).then(
        img => {
          this.usuario!.img = img;
          Swal.fire('Ok!', 'Imagen de Usuario actualizada satisfactoriamente.', 'info');
        }
      ).catch(
        eError => Swal.fire('Error', 'Error al actualizar la Imagen de Usuario.', 'error')
      );
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

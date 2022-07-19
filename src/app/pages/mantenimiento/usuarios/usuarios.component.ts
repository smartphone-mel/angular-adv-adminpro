import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public loading: boolean = true;

  constructor(
    private _usuario: UsuarioService,
    private _busquedas: BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios(true);
  }

  cargarUsuarios(bFirstLoad: boolean) {
    this._usuario.cargarUsuarios(this.desde, bFirstLoad)
      .subscribe(
        ( { count, usuarios } ) => {
          this.totalUsuarios = count,
            this.usuarios = usuarios,
            this.usuariosTemp = usuarios,
            this.loading = false;
        }
      );
  }

  cambiarPagina(valor: number) {
    let desdeAux = this.desde + valor;

    if (desdeAux < 0) this.desde = 0;
    else if (desdeAux >= this.totalUsuarios) desdeAux = 0;
    else { this.loading = true, this.desde = desdeAux; this.cargarUsuarios(false); }
  }

  buscar(texto: string) {
    if (texto.length === 0) {
      this.usuarios = this.usuariosTemp;
      return;
    }

    this._busquedas.busqueda('usuarios', texto)
      .subscribe(
        res => {
          this.usuarios = res;
        }
      );
  }

  eliminarUsuario(usuario: Usuario) {
    if (usuario.uid === this._usuario.uid) {
      Swal.fire(
        'Error',
        'No puede autoborrarse.',
        'error'
      );
      return;
    }

    Swal.fire( {
        title: '¿Borrar Usuario?',
        text: `Está a punto de borrar a ${usuario.nombreCompleto}.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Si, borrarlo!',
        cancelButtonText: 'Cancelar'
      } ).then( (result) => {
        if (result.isConfirmed) {
          this._usuario.eliminarUsuario(usuario.uid)
              .subscribe(
                res => {
                  this.desde = 0,
                    this.cargarUsuarios(false);
                  Swal.fire(
                    '¡Eliminado!',
                    'El Usuario ha sido eliminado.',
                    'success'
                  );
                },
                eError => {
                  Swal.fire(
                    'Error',
                    'Error al eliminar el Usuario.',
                    'error'
                  )
                }
              );
        }
      } );
  }

  cambiarRol(usuario: any) { // Usuario
    this._usuario.actualizarPerfilFull(usuario)
        .subscribe(
          res => Swal.fire('Ok!', 'Rol de Usuario actualizado satisfactoriamente.', 'info'),
          eError => Swal.fire('Error', 'Error al actualizar el Rol de Usuario.', 'error')
        );
  }
}

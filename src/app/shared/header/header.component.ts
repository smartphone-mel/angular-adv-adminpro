import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor(
    private _usuario: UsuarioService,
    private router: Router
  ) {
    this.usuario = !_usuario.usuario
        ? new Usuario('', '', '', '', '', '', false, '')
        : _usuario.usuario;
  }

  ngOnInit(): void {
  }

  buscar(txtBusqueda: any) {
    this.router.navigateByUrl(`/dashboard/buscar/${txtBusqueda}`);
  }

  logout() {
    this._usuario.logout();
    this.router.navigateByUrl('/login');
  }
}

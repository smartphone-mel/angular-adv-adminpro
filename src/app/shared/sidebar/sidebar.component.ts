import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;

  constructor(
    public sidebarService: SidebarService,
    private _usuario: UsuarioService,
    private router: Router
  ) {
    this.usuario = !_usuario.usuario
        ? new Usuario('', '', '', '', '', '', false, '')
        : _usuario.usuario;
  }

  ngOnInit(): void {
  }

  logout() {
    this._usuario.logout();
    this.router.navigateByUrl('/login');
  }
}

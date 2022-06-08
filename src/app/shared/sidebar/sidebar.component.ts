import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = [];

  constructor(
    private _sidebar: SidebarService,
    private _usuario: UsuarioService,
    private router: Router
    ) {
    this.menuItems = this._sidebar.menu;
  }

  ngOnInit(): void {
  }

  logout() {
    this._usuario.logout();
    this.router.navigateByUrl('/login');
  }
}

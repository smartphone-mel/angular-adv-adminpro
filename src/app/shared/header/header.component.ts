import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(
    private _usuario: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this._usuario.logout();
    this.router.navigateByUrl('/login');
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';

import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _usuario: UsuarioService,
    private router: Router
    ) { }
  
  // Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    // Test Code!
    /*return ( () => new Observable<boolean> (
        observer => observer.next(true)
      ).pipe(
        tap(
          estaAutenticado => {
            if (!estaAutenticado) {
              this.router.navigateByUrl('/login');
            } else {
              localStorage.setItem('token', Date.now().toString() );
            }
          }
        ),
        catchError( (eError: any) => of(false) )
      )
    ) ();*/

    // Auth Code!
    return this._usuario.validarJWT().pipe(
        tap(
          estaAutenticado => {
            if (!estaAutenticado) {
              this.router.navigateByUrl('/login');
            }
          }
        )
      );
  }
}

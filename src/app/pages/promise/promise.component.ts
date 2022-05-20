import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styles: [
  ]
})
export class PromiseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios()
        .then( res => console.log(res) )
        .catch( eError => console.log(eError) );

    /*const pAux = new Promise(
      (resolve, reject) => {
        if (false)
          resolve('Hola Mundo!');
        else
          reject('Algo salió mal...');
      }
     );
    
    pAux.then( (res) => console.log(res) )
        .catch( (error) => console.log(error) );
    console.log('. Fin del ngOnInit! - PromiseComponent');*/
  }

  getUsuarios() {
    return new Promise( (resolve, reject) => {
      fetch('https://reqres.in/api/users')
        .then( (res) => res.json() )
        .then( (data) => resolve(data.data) )
        .catch( (eError) => reject(eError) );
    } );
  }
}

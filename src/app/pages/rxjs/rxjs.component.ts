import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxJsComponent implements OnInit, OnDestroy {

  interval$: Subscription;

  constructor() {
    console.info('##### RxJsComponent! #####');
    
    //const obs$;
    /*this.retornarObservable().pipe(
        retry(2) // Total: 3 intentos!
    ).subscribe(
        valor => console.log(`. Subscribe: ${valor}`),
        eError => console.error(`. Error: ${eError}`),
        () => console.info('obs$: complete()!')
      );*/
    
    // const interval$;
    this.interval$ = this.retornarInterval().subscribe(
        console.log //valor => console.log(valor)
      );
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    //throw new Error('Method not implemented.');
    this.interval$.unsubscribe();
  }

  retornarInterval(): Observable<number> {
    return interval(800)
      .pipe(
        take(80),
        //take(10), // 2, 4, 6, 8, 10!
        map(
          valor => ++valor
        ),
        filter(
          valor => (valor % 2) === 0
        ),
        //take(10), // 2, 4, 6, 8, 10, 12, 14, 16, 18, 20!
      );
  }

  retornarObservable(): Observable<number> {
    let i = 0, limit_i = 8, error_i = 2, error_i_2 = 4;
    return new Observable<number>( observer => {
        console.info('obs$: subscribe()!');

        const intervalo = setInterval( () => {
            //console.log(`  . tick (timestamp: ${Date.now()})!`);
            observer.next(i);
            i++;

            if (i === error_i) {
              console.warn(`. catching error: i === ${error_i}!`);
              observer.error(`i === ${error_i}!`);
            }
            if (i === error_i_2) {
              console.warn(`. catching error: i === ${error_i_2}!`);
              observer.error(`i === ${error_i_2}!`);
            }
            
            if (i >= limit_i) {
              clearInterval(intervalo);
              observer.complete();
            }
          }, 1500);
      } );
  }
}

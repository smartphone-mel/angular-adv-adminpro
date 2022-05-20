import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  titleSubs$: Subscription;
  title = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute // Para hacer subscribe() cuando cambia de Page!
  ) {
    this.titleSubs$ = this.getRouterData().subscribe(
        ( {title} ) => {
          this.title = title; // data.title!
          document.title = `AdminPro - ${title}`;
        }
      );
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.titleSubs$.unsubscribe();
  }

  getRouterData() {
    return this.router.events.pipe(
        filter( (event: any) => event instanceof ActivationEnd ),
        filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
        map( (event: ActivationEnd) => event.snapshot.data ),
      );
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {
  doughnutChartLabels: string[] = [ 'Compras Internas', 'Compras Externas' ];
  doughnutChartData_datasets = [ 8169, 743 ];

  constructor() { }

  ngOnInit(): void {
  }
}

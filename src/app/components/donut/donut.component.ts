import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';
import { baseColors } from 'ng2-charts';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [
  ]
})
export class DonutComponent implements OnInit {
  @Input() titleDonut = "Doughnut Chart";
  // Doughnut
  @Input() doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  @Input() doughnutChartData_datasets = [ 350, 450, 100 ];

  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartData: any; // ChartData<'doughnut'>

  constructor() { }

  ngOnInit(): void {
    let chartDataAux: ChartData<'doughnut'> = {
      labels: this.doughnutChartLabels,
      datasets: [
        {
          data: this.doughnutChartData_datasets,
          backgroundColor: ['#6857E6', '#009FEE', '#F02059'] // ['#9E120E', '#FF5800', '#FFB414']
        }
      ]
    };

    this.doughnutChartData = chartDataAux;
  }

  // Chart Events!
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }
}

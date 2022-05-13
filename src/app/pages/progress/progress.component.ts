import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [ './progress.component.css' ],
})
export class ProgressComponent implements OnInit {

  progreso1: number = 25;
  get getProgreso1() {
    return `${this.progreso1}%`;
  }

  progreso2: number = 75;
  get getProgreso2() {
    return `${this.progreso2}%`;
  }

  constructor() { }

  ngOnInit(): void {
  }
}

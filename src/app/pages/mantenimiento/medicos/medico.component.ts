import { Component, OnInit } from '@angular/core';

import { ModalImageService } from 'src/app/services/modal-image.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  constructor(
    public modalImageService: ModalImageService
  ) { }

  ngOnInit(): void { }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { MedicoService } from 'src/app/services/medico.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public loading: boolean = true;
  public imgSubscription: Subscription;

  constructor(
    private _medico: MedicoService,
    private _busquedas: BusquedasService,
    private _modalImage: ModalImageService
  ) {
    this.imgSubscription = this._modalImage.nuevaImg
      .pipe( delay(80) )
      .subscribe( img => this.cargarMedicos() );
  }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  ngOnDestroy(): void {
    this.imgSubscription.unsubscribe();
  }

  buscar(texto: string) {
    if (texto.length === 0) {
      this.medicos = this.medicosTemp;
      return;
    }

    this._busquedas.busqueda('medicos', texto)
      .subscribe(
        res => {
          this.medicos = res;
        }
      );
  }

  abrirModal(medico: Medico) {
    this._modalImage.abrirModal(
      'medicos',
      medico._id || '',
      medico.img || '',
    );
  }

  eliminarMedico(medico: Medico) {
    Swal.fire( {
        title: '¿Borrar Médico?',
        text: `Está a punto de borrar ${medico.nombre}.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Si, borrarlo!',
        cancelButtonText: 'Cancelar'
      } ).then( (result) => {
        if (result.isConfirmed) {
          this._medico.eliminarMedico(medico._id||'')
              .subscribe(
                res => {
                  this.cargarMedicos();
                  Swal.fire(
                    '¡Eliminado!',
                    'El Médico ha sido eliminado.',
                    'success'
                  );
                },
                eError => {
                  Swal.fire(
                    'Error',
                    'Error al eliminar el Médico.',
                    'error'
                  )
                }
              );
        }
      } );
  }

  cargarMedicos() {
    this.loading = true;

    this._medico.cargarMedicos(true)
      .subscribe(
        medicos => {
          this.medicos = medicos,
            this.medicosTemp = medicos,
            this.loading = false;
        },
        eError => Swal.fire('Error', 'Error al cargar Médicos.', 'error')
      );
  }
}

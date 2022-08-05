import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { HospitalService } from 'src/app/services/hospital.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public loading: boolean = true;
  public imgSubscription: Subscription;

  constructor(
    private _hospital: HospitalService,
    private _busquedas: BusquedasService,
    private _modalImage: ModalImageService
  ) {
    this.imgSubscription = this._modalImage.nuevaImg
      .pipe( delay(80) )
      .subscribe( img => this.cargarHospitales() );
  }

  ngOnInit(): void {
    this.cargarHospitales();
  }

  ngOnDestroy(): void {
    this.imgSubscription.unsubscribe();
  }

  cargarHospitales() {
    this.loading = true;

    this._hospital.cargarHospitales(true)
      .subscribe(
        hospitales => {
          this.hospitales = hospitales,
            this.hospitalesTemp = hospitales,
            this.loading = false;
        },
        eError => Swal.fire('Error', 'Error al cargar Hospitales.', 'error')
      );
  }

  buscar(texto: string) {
    if (texto.length === 0) {
      this.hospitales = this.hospitalesTemp;
      return;
    }

    this._busquedas.busqueda('hospitales', texto)
      .subscribe(
        res => {
          this.hospitales = res;
        }
      );
  }

  async crearHospital() {
    const { isConfirmed, value: nombre } = await Swal.fire<string>( {
        input: 'text',
        title: 'Crear Hospital',
        inputLabel: 'Ingrese el Nombre',
        inputPlaceholder: 'Nombre',
        showCancelButton: true
      } )

    if (!isConfirmed)
      return;

    if (nombre && nombre.trim().length > 0) {
      this._hospital.crearHospital( nombre.trim() )
          .subscribe(
            res => {
              Swal.fire('Ok!', 'Hospital creado satisfactoriamente.', 'info');
              this.hospitales.push(res);
            },
            eError => Swal.fire('Error', 'Error al crear el Hospital.', 'error')
          );
    } else {
      Swal.fire('Error', 'El Nombre es incorrecto.', 'error')
    }
  }

  abrirModal(hospital: Hospital) {
    this._modalImage.abrirModal(
      'hospitales',
      hospital._id || '',
      hospital.img || '',
    );
  }

  actualizarHospital(hospital: Hospital) {
    this._hospital.actualizarHospital( { id: hospital._id||'', nombre: hospital.nombre } )
        .subscribe(
          res => Swal.fire('Ok!', 'Hospital actualizado satisfactoriamente.', 'info'),
          eError => Swal.fire('Error', 'Error al actualizar el Hospital.', 'error')
        );
  }

  eliminarHospital(hospital: Hospital) {
    Swal.fire( {
        title: '¿Borrar Hospital?',
        text: `Está a punto de borrar ${hospital.nombre}.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Si, borrarlo!',
        cancelButtonText: 'Cancelar'
      } ).then( (result) => {
        if (result.isConfirmed) {
          this._hospital.eliminarHospital(hospital._id||'')
              .subscribe(
                res => {
                  this.cargarHospitales();
                  Swal.fire(
                    '¡Eliminado!',
                    'El Hospital ha sido eliminado.',
                    'success'
                  );
                },
                eError => {
                  Swal.fire(
                    'Error',
                    'Error al eliminar el Hospital.',
                    'error'
                  )
                }
              );
        }
      } );
  }
}

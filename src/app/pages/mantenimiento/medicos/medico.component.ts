import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { ModalImageService } from 'src/app/services/modal-image.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit, OnDestroy {

  public medicoForm: FormGroup = new FormGroup({});
  public hospitales: Hospital[] = [];
  public medicoSeleccionado: Medico | undefined;
  public hospitalSeleccionado: Hospital | undefined;
  public loading: boolean = true;
  public imgSubscription: Subscription;

  constructor(
    private _fb: FormBuilder,
    public modalImageService: ModalImageService,
    private _hospital: HospitalService,
    private _medico: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _modalImage: ModalImageService
  ) {
    this.imgSubscription = this._modalImage.nuevaImg
      .pipe( delay(80) )
      .subscribe( img => {
          if (this.medicoSeleccionado)
            this.cargarMedico(this.medicoSeleccionado._id||'');
        } );
  }

  ngOnInit(): void {
    this.medicoForm = this._fb.group( {
        nombre: ['', Validators.required],
        hospital: ['', Validators.required],
      } );

    this.medicoForm.get('hospital')?.valueChanges.subscribe(
        value => {
          this.hospitalSeleccionado = this.hospitales.find(
            hFind => hFind._id === value
          );
        }
      );

    this.activatedRoute.params.subscribe(
        ( { id } ) => {
          let bCargarMedico = false;

          if (id != 'nuevo')
            bCargarMedico = true;

          this.cargarHospitales(bCargarMedico, id);
        }
      );
  }

  ngOnDestroy(): void {
    this.imgSubscription.unsubscribe();
  }

  guardarMedico() {
    if (!this.medicoSeleccionado)
      this.crearMedico();
    else
      this.actualizarMedico();
  }

  cargarHospitales(bCargarMedico = false, id?: string) {
    this.loading = true;

    this._hospital.cargarHospitales()
      .subscribe(
        (hospitales: Hospital[]) => {
          this.hospitales = hospitales;
          
          if (bCargarMedico)
            this.cargarMedico(id||'');
          else
            this.loading = false;
        },
        eError => {
          this.hospitales = [];
          Swal.fire('Error', 'Error al cargar Hospitales.', 'error')
        }
      )
  }

  cargarMedico(id: string) {
    this._medico.cargarMedicoById(id)
      .subscribe(
        medico => {
          this.medicoSeleccionado = medico;
          this.medicoSeleccionado._id = id;
          this.medicoForm.get('nombre')?.setValue(this.medicoSeleccionado.nombre);
          this.medicoForm.get('hospital')?.setValue(this.medicoSeleccionado.hospital?._id);
          this.loading = false;
        },
        eError => Swal.fire('Error', 'Error al cargar el Médico.', 'error')
      );
  }

  abrirModal() {
    this._modalImage.abrirModal(
      'medicos',
      this.medicoSeleccionado?._id || '',
      this.medicoSeleccionado?.img || '',
    );
  }

  crearMedico() {
    //Swal.fire('Ok!', `. crearMedico()!`, 'info')
    this._medico.crearMedico(this.medicoForm.value)
      .subscribe(
        res => {
          const { _id, nombre } = res;

          Swal.fire('Ok!', `Médico '${nombre}' creado satisfactoriamente.`, 'info');
          this.router.navigateByUrl(`/dashboard/medico/${_id}`);
        },
        eError => Swal.fire('Error', 'Error al crear el Médico.', 'error')
      );
  }

  actualizarMedico() {
    //Swal.fire('Ok!', `. actualizarMedico()!`, 'info')
    this._medico.actualizarMedico(
        { ...this.medicoForm.value, _id: this.medicoSeleccionado?._id }
      ).subscribe(
        res => {
          const { id, nombre } = this.medicoForm.value;

          Swal.fire('Ok!', `Médico '${nombre}' actualizado satisfactoriamente.`, 'info');
        },
        eError => Swal.fire('Error', 'Error al actualizar el Médico.', 'error')
      );
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public hospitales: Hospital[] = [];
  public medicos: Medico[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private _busquedas: BusquedasService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      ( {txtBusqueda} ) => {
        this.busquedaGlobal(txtBusqueda);
      },
      eError => Swal.fire('Error', 'Error al obtener parámetro (txtBusqueda).', 'error')
    )
  }

  busquedaGlobal(txtBusqueda: string) {
    this._busquedas.busquedaGlobal(txtBusqueda)
      .subscribe( (res: any) => {
        this.usuarios = res.usuarios;
        this.hospitales = res.hospitales;
        this.medicos = res.medicos;
      },
      eError =>
        Swal.fire('Error', 'Error al hacer una Búsqueda Global.', 'error')
      );
  }
}

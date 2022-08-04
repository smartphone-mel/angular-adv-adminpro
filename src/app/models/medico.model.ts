import { Hospital } from "./hospital.model";

interface _medicoUsuario {
    _id: string;
    nombre: string;
    apellido: string;
}

export class Medico {
    constructor(
            public nombre: string,
            public _id?: string,
            public img?: string,
            public usuario?: _medicoUsuario,
            public hospital?: Hospital) {
        // ...
    }
}
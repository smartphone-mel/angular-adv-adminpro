interface _hospitalUsuario {
    _id: string;
    nombre: string;
    apellido: string;
}

export class Hospital {
    constructor(
            public nombre: string,
            public _id?: string,
            public img?: string,
            public usuario?: _hospitalUsuario) {
        // ...
    }
}
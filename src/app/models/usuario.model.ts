export class Usuario {
    constructor(
            public email: string,
            public nombre: string,
            public apellido: string,
            public password?: string,
            public img?: string,
            public role?: string,
            public google?: boolean,
            public uid?: string) {
        // ...
    }
}
import { environment } from "src/environments/environment";

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

    get imgUrl() {
        if (this.img)
            return `${environment.webapi_url}/uploads/usuarios/${this.img}`;
        else
            return `${environment.webapi_url}/uploads/no-image-available`;
    }

    get nombreCompleto() {
        return `${this.nombre} ${this.apellido}`;
    }
}
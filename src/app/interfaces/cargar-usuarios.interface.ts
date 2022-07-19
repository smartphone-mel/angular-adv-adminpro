import { Usuario } from "../models/usuario.model";

export interface CargarUsuarios {
    count: number;
    usuarios: Usuario[];
}

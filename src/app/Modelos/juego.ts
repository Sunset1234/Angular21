export class Juego {
    id: number;
    nombre_sala: string;
    numero_jugadores: number;
    estado: string;

    constructor(nombre: string) {
        this.nombre_sala = nombre;
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  constructor(private http: HttpClient) { }

  root: string = "http://127.0.0.1:3333/";

  getRooms() {
    return this.http.get<any>(this.root + 'juegos');
  }

  enterRoom(roomId: number, jugadorId: number) {

    const entrada = {
      room: roomId,
      jugador : jugadorId
    };

    return this.http.post<any>(this.root + 'entrar', entrada);
  }

  ConsultaTipo(id:String){
    let jugador = {
      id : id
    }
    return this.http.post<any>(this.root+'tipo/'+id,jugador);
}
}

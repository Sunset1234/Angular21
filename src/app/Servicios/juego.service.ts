import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  checkRoom(jugadorId: number, roomId: number) {
   
      const headers = new HttpHeaders({
        "room" : roomId.toString(),
        "jugador" : jugadorId.toString()
      });
  
      return this.http.get<any>('http://127.0.0.1:3333/' + 'verificarRoom', {headers: headers});
  }
}

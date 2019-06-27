import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User} from'../Modelos/user'
import { promise } from 'protractor';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  constructor(private http: HttpClient) { }

  // root: string = "http://192.168.50.10:3333/";
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
      
      // return this.http.get<any>('http://192.168.50.10:3333/' + 'verificarRoom', {headers: headers});
      return this.http.get<any>('http://127.0.0.1:3333/' + 'verificarRoom', {headers: headers});
  }

  ConsultaTipo(id:String){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post(this.root+'tipo/'+id,{headers:headers}).toPromise()
  }

    //método que ocurre cuando un jugador se sale del room
  eliminarJugador(jugador: number, room: number) {
    
    var info = {
      jugador: jugador,
      room: room
    };

    return this.http.put<any>(this.root + 'echar', info);
  }

  ganador(id: number) {
    debugger;
    return this.http.post<any>(this.root + 'ganador/' + id, {});
  }
}

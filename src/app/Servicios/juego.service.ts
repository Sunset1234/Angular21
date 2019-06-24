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

  dato:any;
  tipoAd:any;
  ConsultaTipo(id:String){
    let jugador = {
      id : id
    }

    console.log("ojo aquí")
    let headers = new HttpHeaders().set('Content-Type','application/json');
    this.dato=this.http.post(this.root+'tipo/'+id,jugador,{headers:headers}).forEach(item=>{
      this.tipoAd=item[0].tipo;
    })

    console.log(this.tipoAd)
    return this.tipoAd;


    /*console.log("ojo aquí")

    this.dato=this.http.post<any>(this.root+'tipo/'+id,jugador).forEach(item=>{
      this.tipoAd=item[0].tipo;
    })
    console.log(this.tipoAd)
    return this.tipoAd;*/
  }

    //método que ocurre cuando un jugador se sale del room
  eliminarJugador(jugador: number, room: number) {
    
    var info = {
      jugador: jugador,
      room: room
    };

    return this.http.put<any>(this.root + 'echar', info);
  }
}

import { Component, OnInit } from '@angular/core';
import Ws from '@adonisjs/websocket-client';
import { Router } from '@angular/router';
import { JuegoService } from 'src/app/Servicios/juego.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  socket= Ws('ws://localhost:3333');
  channel: any;
  id:string;
  room:string='';
  salas: Array<any>;

  constructor(private router: Router, private juego_service: JuegoService) {
    //se abre la conexión y la subscripción al canal
    this.socket = this.socket.connect();
    this.channel = this.socket.subscribe('lobby'); 
    
    //listener
    this.channel.on('message', (data) => {
      this.juego_service.getRooms().subscribe(res => {
        this.salas = res.rooms
      });
    });
   }

  tipo:any;
  ngOnInit() {
    this.juego_service.getRooms().subscribe( res => {
      this.salas = res.rooms;
    });

    this.juego_service.ConsultaTipo(localStorage.getItem('jugador')).subscribe(data=>{
      this.tipo = data;
      console.log(this.tipo);
    })
  }

  unirse(roomId: number) {
    //solamente aquí se registrará, NO en el componente; no podrá colarse a salas.
    const jugadorId = parseInt(localStorage.getItem('jugador'));

    this.juego_service.enterRoom(roomId, jugadorId).subscribe(res => {
      if (res.acesso) {
        localStorage.setItem('juego', roomId.toString());

        //se cierra el canal para que no se escuchen más eventos en el lobby si entró a una sala
        this.channel.close();
        this.router.navigate(['tablero']);
      } else {
        alert("SALA INACCESIBLE");
      }
    });
  }
}

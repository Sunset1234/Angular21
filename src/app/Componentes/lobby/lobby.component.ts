import { Component, OnInit } from '@angular/core';
import Ws from '@adonisjs/websocket-client';
import { Router } from '@angular/router';
import { JuegoService } from 'src/app/Servicios/juego.service';
import { User } from 'src/app/Modelos/user';
import { forEach } from '@angular/router/src/utils/collection';

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

    this.GetTipo();
   }

  ngOnInit() {
    this.juego_service.getRooms().subscribe( data => {
      this.salas = data.rooms;
    });
  }

  
  tipo:number;
  checadmin:boolean
  GetTipo(){
    this.juego_service.ConsultaTipo(localStorage.getItem('jugador')).then(item=>{
      this.tipo=item['es_admin']
      if(this.tipo==2){
        this.checadmin=false;
      }else if(this.tipo==1){
        this.checadmin=true;
      }
    });
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

  veradmin(roomId: number){
   
    const adminId = parseInt(localStorage.getItem('jugador'));
    //console.log("mi admins "+adminId);
    this.juego_service.enterRoom(roomId, adminId).subscribe(res => {
        localStorage.setItem('juego', roomId.toString());
        //se cierra el canal para que no se escuchen más eventos en el lobby si entró a una sala
        this.channel.close();
        this.router.navigate(['tablero']);
    });
  }
}

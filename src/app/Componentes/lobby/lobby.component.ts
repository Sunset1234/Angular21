import { Component, OnInit } from '@angular/core';
import Ws from '@adonisjs/websocket-client';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Juego } from 'src/app/Modelos/juego';
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

  constructor(private route: ActivatedRoute, private router: Router, private juego_service: JuegoService) {
    //se abre la conexión y la subscripción al canal
    this.socket = this.socket.connect();
    this.channel = this.socket.subscribe('lobby'); 
    
    this.channel.on('open', data => { });

    this.channel.on('error', data => { });

    this.channel.on('ready', data => { });
    
    //listener
    this.channel.on('message', (data) => {
      this.juego_service.getRooms().subscribe(res => {
        this.salas = res.rooms
      });
    });

    this.conecta();
   }


  tipo:any;
  checadmin:boolean;
  ngOnInit() {
    this.juego_service.getRooms().subscribe( data => {
      this.salas = data.rooms;
    });

  }

  conecta(){
    this.tipo=this.juego_service.ConsultaTipo(localStorage.getItem('jugador'));
    if(this.tipo==2){
      console.log("falso pendejo")
      this.checadmin=false;
    }else if(this.tipo==1){
      console.log("verdadero pendejo")
      this.checadmin=true;
    }
  }

  unirse(roomId: number) {
    //solamente aquí se registrará, NO en el componente; no podrá colarse a salas.
    const jugadorId = parseInt(localStorage.getItem('jugador'));

    this.juego_service.enterRoom(roomId, jugadorId).subscribe(data => {
      if (data.acesso) {
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

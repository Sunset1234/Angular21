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

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private juego_service: JuegoService) {
    this.socket = this.socket.connect();
    const lobby = this.socket.subscribe('lobby');
    
    lobby.on('open', data => { });

    lobby.on('error', data => { });

    lobby.on('ready', data => { });

    lobby.on('message', (data) => {
      this.juego_service.getRooms().subscribe(res => {
        this.salas = res.rooms
      });
    });
   }

  ngOnInit() {
    this.juego_service.getRooms().subscribe( data => {
      this.salas = data.rooms;
      // debugger;
    })
  }

  unirse(roomId) {
    debugger;
  }
}

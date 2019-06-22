import { Component, OnInit } from '@angular/core';
import Ws from '@adonisjs/websocket-client';
import { JuegoService } from 'src/app/Servicios/juego.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})

export class TableroComponent implements OnInit {
  socket = Ws('ws://localhost:3333');
  canal: any;
  room: number;
  jugador: string;

  constructor(private juego_service: JuegoService) {
    //pendiente: ponerle un guard a /tablero
    this.room = parseInt(localStorage.getItem('juego'));

    this.socket = this.socket.connect();
    this.canal = this.socket.subscribe('juego:' + this.room);

    this.canal.on('error', data => {
      console.log('error')
    })

    this.canal.on('entrar', data => {
      this.jugador = data;
      setTimeout(() => {

      }, 1500);
    })
  }

  ngOnInit() {
    const room = this.socket.getSubscription('juego:'+ this.room);
    room.emit('entrar', localStorage.getItem('nick'));
  }

}
/**
 * https://imgur.com/bUgJqBI tabla en blanco
 * https://i.imgur.com/VBaXzjM.png con letras
*/

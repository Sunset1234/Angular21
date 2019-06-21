import { Component, OnInit } from '@angular/core';
import Ws from '@adonisjs/websocket-client';
import { JuegoService } from 'src/app/Servicios/juego.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})

export class TableroComponent implements OnInit {
<<<<<<< HEAD
  socket= Ws('ws://localhost:3333');
  datoObtenido: any;


  constructor() {
    /*
    conecta a la url del socket La url del socket es una wea auxilioooooooooojjiiisijfkjrkj
    */
    this.socket.connect()
    const mensaje= this.socket.subscribe('mensaje');
    mensaje.on('mensaje', valor => {
      this.datoObtenido= valor
    });
   }
=======
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

    })

    this.canal.on('entrar', data => {
      this.jugador = data;
      setTimeout(() => {
        
      }, 1500);
    })
  }
>>>>>>> room

  ngOnInit() {
    const room = this.socket.getSubscription('juego:'+ this.room);
    room.emit('entrar', localStorage.getItem('nick'));
  }

}
/**
 * https://imgur.com/bUgJqBI tabla en blanco
 * https://i.imgur.com/VBaXzjM.png con letras
*/

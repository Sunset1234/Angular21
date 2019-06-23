import { Component, OnInit, OnDestroy } from '@angular/core';
import Ws from '@adonisjs/websocket-client';
import { JuegoService } from 'src/app/Servicios/juego.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})

export class TableroComponent implements OnInit, OnDestroy {
  
  //socket
  socket = Ws('ws://localhost:3333');
  channel: any;
  room: number;

  jugador: string;
  counter: number = 0;
  started: boolean = false;
  
  constructor(private juego_service: JuegoService, private router: Router) {
    //se abre la conexión al canal y tópic
    this.room = parseInt(localStorage.getItem('juego'));
    this.socket = this.socket.connect();
    this.channel = this.socket.subscribe('juego:' + this.room);
  }

  ngOnInit() {
    this.channel.on('error', (err) => {
      alert(err);
    })

    this.channel.on('entrar', (data) => {
      this.jugador = data.msj;
      this.counter = data.count;
    });

    this.validateRoom();
  }

  validateRoom() {
    this.juego_service.checkRoom(parseInt(localStorage.getItem('jugador')), this.room).subscribe(res => {
      if (res) {
        const room = this.socket.getSubscription('juego:'+ this.room);
        room.emit('entrar', { jugador: localStorage.getItem('nick'), room: this.room });
        // room.emit('count', this.room);
      } else {
        this.router.navigate(['lobby'])
      }
    });
  }

  startGame() {
    alert("aaaa");
    // window.location.replace('https://www.youtube.com/watch?v=yzWAANQwnYQ');
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    localStorage.removeItem('juego');
    this.channel.close();
  }

}
/**
 * https://imgur.com/bUgJqBI tabla en blanco
 * https://i.imgur.com/VBaXzjM.png con letras
*/

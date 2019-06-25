import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import Ws from '@adonisjs/websocket-client';
import { JuegoService } from 'src/app/Servicios/juego.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})

export class TableroComponent implements OnInit {
  
  //socket
  socket = Ws('ws://localhost:3333');
  channel: any;
  room: number;

  jugador: string;
  jugador_id: number;
  counter: number = 0;

  //flags para saber el estado del juego
  started: boolean = false;
  ended: boolean = false;

  jugadores: Array<any> = [];
  //arreglo en el cual se asignarán los turnos
  turnos: Array<number> = [1, 2, 3, 4];

  
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

    /*
      Evento entrar.
      Cuando entre un jugador se le asigna un turno, y al mismo se le da la bienvenida
      por consecuente, se trae el contador actualizado y se mete al arreglo para manejar
      el estado del juego
    */
  
    this.channel.on('entrar', (data) => {
          //asignación de turnos
      var posicion = Math.floor(Math.random() * this.turnos.length);
      var rn = this.turnos.splice(posicion, 1);

      this.jugador = data.msj;
      this.counter = data.count;
      this.jugadores.push({
        id: data.id,
        turno: rn[0]
      });
    });
    //metodo que se ejecuta cuando carga el componente para validar
    this.validateRoom();
  }
tipo:any;
  //método que valida que la persona que entró al room pertenece al juego aquiiiiiiiiiiiiii
  validateRoom() {
    
      this.juego_service.checkRoom(parseInt(localStorage.getItem('jugador')), this.room).subscribe(res => {
        console.log("estamos en validate")
        console.log(res)
        if (res) {
          const room = this.socket.getSubscription('juego:'+ this.room);
          room.emit('entrar', { jugador: localStorage.getItem('nick'), room: this.room, id: localStorage.getItem('jugador')});
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

  // @HostListener('window:unload', [ '$event' ])
  // unloadHandler(event) {

  //   localStorage.removeItem('juego');
    
  //   if (!this.ended) {
  //     //si el juego no ha terminado, y abandona, consideramos la partida como perdida.
  //     this.juego_service.eliminarJugador(parseInt(localStorage.getItem('jugador')), this.room)
  //         .subscribe((res) => {
  //           console.log("ECHADO POR PARGUELA");
  //           // localStorage.removeItem('juego');
  //         });
  //   }
  //   // this.channel.close();
  // }
}
/**
 * https://imgur.com/bUgJqBI tabla en blanco
 * https://i.imgur.com/VBaXzjM.png con letras
*/

window.addEventListener('beforeunload', (event) => {
  // Cancel the event as stated by the standard.
  event.preventDefault();
  // Chrome requires returnValue to be set.
  event.returnValue = '';
});
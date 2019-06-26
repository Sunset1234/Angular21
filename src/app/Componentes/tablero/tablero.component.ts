import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import Ws from '@adonisjs/websocket-client';
import { JuegoService } from 'src/app/Servicios/juego.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})

export class TableroComponent implements OnInit {

  //socket
  socket = Ws('ws://127.0.0.1:3333');
  channel: any;
  room: number;

  jugador: string;
  jugador_id: number;
  counter: number = 0;

  //turno para saber en qué chingados van
  turno_actual=1;

  //flags para saber el estado del juego
  started: boolean = false;
  ended: boolean = false;

  jugadores: Array<any> = [];
  //arreglo en el cual se asignarán los turnos
  turnos: Array<number> = [1, 2];

  urlOculta: string = 'https://i.ytimg.com/vi/H4fKfz5rcx8/maxresdefault.jpg';
  locals: any = localStorage;
  id_jugador = localStorage.jugador;
  constructor(private juego_service: JuegoService, private router: Router) {
    //se abre la conexión al canal y tópic
    this.room = parseInt(localStorage.getItem('juego'));
    this.socket = this.socket.connect();
    this.channel = this.socket.subscribe('juego:' + this.room);
  }

  tipoUser:any;
  validaBoton:boolean;
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

      //SERVICIO PARA OBTENER TIPO DE USUARIO
      this.juego_service.ConsultaTipo(localStorage.getItem('jugador')).then(item=>{
        this.tipoUser=item['es_admin']
        if(this.tipoUser==1){
          this.validaBoton=true;
        }


        // GENERAR RANDOM PARA TURNOS
        var posicion = Math.floor(Math.random() * this.turnos.length);

        //QUITAR UN TURNO DEL ARREGLO
        var rn = this.turnos.splice(posicion, 1);

        this.jugador = data.msj;
        this.counter = data.count;

        //SI ES DEL TIPO 2 = USUARIO NORMAL, SE LE ASIGNARÁ UN TURNO
        if(this.tipoUser==2){
            //ASIGNACIÓN DE TURNOS
            this.jugadores.push({
              id: parseInt(data.id),
              turno: rn[0],
              nick: data.nick
            });
        }
      });
    });

    this.channel.on('barajear', (data) => {
      this.jugadores = data.jugadores;
      console.log(this.jugadores);
      alert(data.msj);
      $(document).ready(function(){
        console.log('entré')
        $('#1').appendTo('#jugador1')
        $('#3').appendTo('#jugador2')
        $('#2').appendTo('#jugador3')
        $('#4').appendTo('#jugador4')
    });
    });

    //metodo que se ejecuta cuando carga el componente para validar
    this.validateRoom();
    //acomodar las cartas


    //para repartir alv
    this.channel.on('pedir', (data) => {

      this.jugadores.forEach(jugador => {
        if(  jugador.su_turno){

            jugador.cartas.push([data.obtenida]);
            console.log(jugador);
        }
      });

    });
    //turnos globales
    this.channel.on('pasarturno',turno=>{
      this.jugadores.forEach(jugador => {
        if(jugador.su_turno == turno){
          console.log('es mi turno'+ jugador.turno)
          this.jugadores[jugador.turno].su_turno = true
          jugador.su_turno = false;
        }else{
          console.log('no es mi turno')
          jugador.su_turno = false;
        }
      });

    console.log('Sigue el jugador número:' + turno)
    });
  }


tipo:any;
  //método que valida que la persona que entró al room pertenece al juego aquiiiiiiiiiiiiii
  validateRoom() {

      this.juego_service.checkRoom(parseInt(localStorage.getItem('jugador')), this.room).subscribe(res => {
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
    const room = this.socket.getSubscription('juego:' + this.room);
    room.emit('barajear', {jugadores: this.jugadores});
    // window.location.replace('https://www.youtube.com/watch?v=yzWAANQwnYQ');
  }

  ConvertString(value) {
    return parseInt(value)
  }

  //metodo para pedir una carta
  pedirUna(valor, turno) {
    console.log(valor);
    console.log(' valor' + turno);
    this.jugadores.forEach(jugador => {
      if(jugador.su_turno) {
        if(jugador.cartas.length <= 4) {
          this.channel.emit('pedir', { valor, turno});
        }else{
          alert('Límite de cartas alcanzadas: máximo 5 cartas')
        }
      }
    })

  }

  //pasar turno para que el otro jugador siga
  acabar(valor){
    this.channel.emit('pasarturno', valor);
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
 * https://i.imgur.com/bUgJqBI.png tabla en blanco
 * https://i.imgur.com/VBaXzjM.png con letras
*/

window.addEventListener('beforeunload', (event) => {
  // Cancel the event as stated by the standard.
  event.preventDefault();
  // Chrome requires returnValue to be set.
  event.returnValue = '';
});

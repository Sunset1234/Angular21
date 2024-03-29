import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import Ws from '@adonisjs/websocket-client';
import { JuegoService } from 'src/app/Servicios/juego.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Event as NavigationEvent } from "@angular/router";
import { NavigationStart } from "@angular/router";
import { filter } from 'rxjs/operators';
import { AlertsService } from 'angular-alert-module';
import * as conecta from '../../Modelos/Urls';
@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})

export class TableroComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    this.socket.close();
  }

  //socket
  // socket = Ws('ws://192.168.50.10:3333');
  socket = Ws(conecta.url_websocket);
  channel: any;
  room: number;
  contador_turno:number=4;
  botoniniciar:boolean = false;
  jugador: string;
  jugador_id: number;
  counter: number = 0;
  estado_partida : number;
  //turno para saber en qué chingados van
  turno_actual = 1;

  //flags para saber el estado del juego
  started: boolean = false;
  ended: boolean = false;

  jugadoresssss = [];
  jugadores: Array<any> = [];
  //arreglo en el cual se asignarán los turnos
  turnos: Array<number> = [1,2,3,4];

  urlOculta: string = 'https://i.imgur.com/rsGJHBC.png';
  locals: any = localStorage;
  id_jugador = localStorage.jugador;

  constructor(private alerta:AlertsService,private juego_service: JuegoService, private router: Router) {
    //se abre la conexión al canal y tópic
    this.room = parseInt(localStorage.getItem('juego'));
    this.socket = this.socket.connect();
    this.channel = this.socket.subscribe('juego:' + this.room);

    router.events.pipe(
      filter(( event: NavigationEvent ) => {
        return( event instanceof NavigationStart );
      })).subscribe(( event: NavigationStart ) => {
        if (!this.ended) {
          //formdata porque es lo mas parecido a un objeto que se puede mandar
          //un formdata sólo acepta pares de llaves y valores como cadenas chsm
          var formdata = new FormData();
          formdata.append('room', localStorage.getItem('juego'));
          formdata.append('qlo', localStorage.getItem('jugador'));
          formdata.append('jugadores', JSON.stringify(this.jugadores));
          /*
            This method addresses the needs of analytics and diagnostics code that typically attempts to
            send data to a web server prior to the unloading of the document.
          */
          navigator.sendBeacon(conecta.url_http + 'abandonar', formdata);
        }
      });
  }

  tipoUser:any;
  validaBoton:boolean;
  ngOnInit() {
    this.juego_service.buscarestado(parseInt(localStorage.getItem('juego'))).then(estado=>{
      console.log('ghoul'+estado[0].estado_id)
      this.estado_partida = estado[0].estado_id;
    });
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
        if(this.tipoUser.es_admin==2){
            //ASIGNACIÓN DE TURNOS
            this.jugadores.push({
              id: parseInt(data.id),
              turno: rn[0],
              nick: data.nick
            });
          }
      });
        this.jugador = data.msj; //mensaje de aviso
        this.counter = data.count; //contador
        this.jugadores = data.jugadores;
    });

    this.channel.on('abandonar', (data) => {
      this.jugadores = data.jugadores;
      this.counter = data.counter;

      const room = this.socket.getSubscription('juego:' + this.room);
      room.emit('rajar', {qlo: data.rajon, room: this.room});
    });

    this.channel.on('rajar', (data) => {

    });

    this.channel.on('barajear', (data) => {
      this.jugadores = data.jugadores;
      console.log(this.jugadores);
      //alert(data.msj);
      this.alerta.setDefaults('timeout',5);
      this.alerta.setMessage(data.msj,'success');
      $(document).ready(function(){
        console.log('entré al ready')
        $('.jugador').removeClass('d-none')
        $('#bloque').removeClass('d-none')
        $('#1').appendTo('#jugador1')
        $('#2').appendTo('#jugador2')
        $('#3').appendTo('#jugador3')
        $('#4').appendTo('#jugador4')

    });
    });


    this.channel.on('skip', (data) => {
      this.jugadores = data.jugadores;
      this.turnos = data.turnos;

      $(document).ready(function(){
        console.log('entré')
        $('.jugador').removeClass('d-none')
        $('#bloque').removeClass('d-none')

        $('#1').appendTo('#jugador1')
        $('#2').appendTo('#jugador2')
        $('#3').appendTo('#jugador3')
        $('#4').appendTo('#jugador4')
      });

      debugger;
      if (data.turnos >= 4) {
        //función para declarar ganador
        this.ended = true;
        this.declararGanador();
      
      }

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
  }

contadorTurnos: number = 0;

  declararGanador() {
    //recorrido  de todos los jugadores y suma sus puntos
    this.jugadores.forEach((el) => {
      var totalPts = 0;

      el.cartas.forEach((el) => {
        totalPts += parseInt(el[0].valor);
      });

      el.totalPts = totalPts;
    });

    //filtro los weyes que se pasaron
    this.jugadores = this.jugadores.filter((el) => {
      this.router.navigate(['lobby'])
      return el.totalPts <= 21;
    });

    //obtengo el mayor. no hay empate, gana el primero que salga csm

    var res = Math.max.apply(Math,this.jugadores.map(function(o){return o.totalPts;}))

    var obj = this.jugadores.find(function(o){ return o.totalPts == res; })

    this.juego_service.ganador(obj.id).subscribe(res => {
      this.alerta.setDefaults('timeout',8);
      this.alerta.setMessage('EL GANADOR ES: '+ obj.jugador,'success');
      this.ended = true;
      this.router.navigate(['lobby']);
    });

    this.destruyesocket()
  }

  destruyesocket(){
    this.socket.close();
  }

tipo:any;
  //método que valida que la persona que entró al room pertenece al juego aquiiiiiiiiiiiiii
  validateRoom() {
    //SERVICIO PARA OBTENER TIPO DE USUARIO
    this.juego_service.ConsultaTipo(localStorage.getItem('jugador')).then( item => {
      this.tipoUser = item['es_admin'];

      if (this.tipoUser == 1) {
        this.validaBoton = true;
      }
    });

    this.juego_service.checkRoom(parseInt(localStorage.getItem('jugador')), this.room).subscribe(res => {
      if (res) {
        const room = this.socket.getSubscription('juego:'+ this.room);
        room.emit('entrar', { jugador: localStorage.getItem('nick'), room: this.room, id: parseInt(localStorage.getItem('jugador')), rol: this.tipoUser});
        // room.emit('count', this.room);
      } else {
        this.router.navigate(['lobby'])
      }
    });
  }

  startGame() {
    //SIGNACIÓN DE TURNOS AL AZAR
    var turnos = [1, 2, 3, 4];

    this.jugadores.forEach((el) => {
      // GENERAR RANDOM PARA TURNOS
      var posicion = Math.floor(Math.random() * turnos.length);
      //QUITAR UN TURNO DEL ARREGLO
      var turno = turnos.splice(posicion, 1);

      el.turno = turno[0];
    });
    //this.juego_service.cambiarestado(localStorage.getItem('juego'));
    const room = this.socket.getSubscription('juego:' + this.room);
    room.emit('barajear', {jugadores: this.jugadores});
    $(document).ready(function(){
      console.log('entré al ready')
      document.getElementById('botonesconder').hidden = true;
      
    });

    console.log("aqui")
    this.juego_service.UpdateEstado(parseInt(localStorage.getItem('juego'))).then(data=>{
      console.log(data)
    })

  
   //this.botoniniciar = true;
    
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

          this.alerta.setMessage('Límite de cartas alcanzadas: máximo 5 cartas','error');
        }
      }
    })

  }


  //pasar turno para que el otro jugador siga
  acabar() {
    this.channel.emit('skip', {jugador: parseInt(localStorage.getItem('jugador')), jugadores: this.jugadores});
  }

  //este listener espera al unload, así que si se va o recarga le quitamos el token alv
  //el guard por ende, ya no lo dejará entrar

  @HostListener('window:unload', [ '$event' ])
  unloadHandler(event) {

    //formdata porque es lo mas parecido a un objeto que se puede mandar
    //un formdata sólo acepta pares de llaves y valores como cadenas chsm
    var formdata = new FormData();
    formdata.append('room', localStorage.getItem('juego'));
    formdata.append('qlo', localStorage.getItem('jugador'));
    formdata.append('jugadores', JSON.stringify(this.jugadores));

    /*
      This method addresses the needs of analytics and diagnostics code that typically attempts to
      send data to a web server prior to the unloading of the document.
    */
    navigator.sendBeacon(conecta.url_http+'abandonar', formdata);

    // localStorage.removeItem('juego');
    // this.channel.close();
  }
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

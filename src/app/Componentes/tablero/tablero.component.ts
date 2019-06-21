import { Component, OnInit } from '@angular/core';
import Ws from '@adonisjs/websocket-client';
@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {
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

  ngOnInit() {
  }

}
/**
 * https://imgur.com/bUgJqBI tabla en blanco
 * https://i.imgur.com/VBaXzjM.png con letras
*/

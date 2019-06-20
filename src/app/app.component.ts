import { Component, OnChanges } from '@angular/core';
import { StorageServiceService} from'./Servicios/storage-service.service';
import Ws from '@adonisjs/websocket-client';
import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { Ptor } from 'protractor';
import { Carta } from './Modelos/Carta';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  title = 'BlackJack';

  constructor(private _StorageService:StorageServiceService){
    this.getImage();
  }

  img:any;
  msg:string;
  getImage(){
    this._StorageService.GetCartas().subscribe(resultado => {
      this.img=resultado;
      
        if(this.img){
          this.msg="Ya hay cartas";
        }

    });
  }

  
   //inicializo el websocket. hace referencia a la url del servidor (Adonis)
   ws = Ws('ws://localhost:3333');

   channel: any;
   id:string;
   room:string='';

  ReparteCartas(){

    this.ws = new Ws('ws://localhost:3333').connect();
      this.ws.on('open', data => {
    })
    this.ws.on('error', data => {
    })
    this.channel = this.ws.subscribe('chat:Libre')

   /* this.ws.connect()
    let mensaje = this.ws.subscribe('pruebas')
    mensaje.on('open',valor=>{
      console.log(valor+" puta perra madre");
    })*/
    
  }

}

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


   //inicializo el websocket. hace referencia a la url del servidor (Adonis)
   ws = Ws('ws://localhost:3333');
   id:string;
   room:string='';

  constructor(private _StorageService:StorageServiceService){

    this.getImage()

    this.ws = this.ws.connect()
    this.ws.on('open', data => {
      this.SuscribirsePruebas();
    })
    this.ws.on('error', data => {
    })

  }
  
  SuscribirsePruebas(){
    //mensaje:1
    const carta = this.ws.subscribe('Cartas')

    carta.emit('messaje','Hola Mundo');
    
    carta.on('messaje',data=>{
      console.log(data)
    });

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

}

import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs';
import { Carta } from '../Modelos/Carta';
import Ws from '@adonisjs/websocket-client';

// 1Inicializar el socket
const ws = Ws('ws://127.0.0.1:3333');
@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {
  
  // 2 ESA MAMADA ES PARA HACERLO OBSERVABLE
  private messageSource = new BehaviorSubject([]);
  currentMessage = this.messageSource.asObservable();

  constructor(private http:HttpClient) {

    //3 CONECTARME AL SOCKET
    ws.connect();
    this.MensajeServidor();
  }

  //-----OBTENER MENSAJE DEL SERVER-----------
  MensajeServidor(){

    //Subscribirse al canal y al tópico
    const socket=ws.subscribe('Cartas:1')

    //EN INICIO DEL SOCKET
    socket.on('ready',()=>{})

    socket.emit('messaje','Hola Mundo')

    //CUANDO SE LLAME AL MESSAJE
    socket.on('enviar',(messaje)=>{
      this.ChangeMessaje(messaje);
    })
  }

  ChangeMessaje(msg){
    this.messageSource.next(msg)
  }

  //---GET IMAGENES--//

  readonly UrlGetCartas = "http://127.0.0.1:3333";
  carta:any;
  GetCartas(){
    this.carta=this.http.get(this.UrlGetCartas);
    console.log(this.carta)
    return this.carta;
  }

}

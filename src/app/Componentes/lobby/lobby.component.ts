import { Component, OnInit } from '@angular/core';
import Ws from '@adonisjs/websocket-client';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  //inicializo el websocket. hace referencia a la url del servidor (Adonis)
  ws = Ws('ws://localhost:3333');

  channel: any;
  id:string;
  room:string='';


  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient,) { }

  ngOnInit() {
    this.conectarSocket();


    // this.username = localStorage.getItem('usuario');
    // this.id = localStorage.getItem('id_user')
    // this.iniciarConexion()
    // this.RecuperarGrupoUsuario()
    // this.msn = "subibiendo img"
    // // this.SendMensaje(event);  

    // // this.mensaje=localStorage.getItem('mensaje')

    // this.http.get<any>('http://localhost:3333/users').subscribe(res => {
    //   console.log(res)
    //   this.users = res.users

    //   //  this.setUpChat();
    // });


  }

  conectarSocket() {
    
    this.ws = new Ws('ws://localhost:3333').connect();
    this.ws.on('open', data => {

    })
    this.ws.on('error', data => {

    })
    
    this.channel = this.ws.subscribe('chat:Libre')
  }

}

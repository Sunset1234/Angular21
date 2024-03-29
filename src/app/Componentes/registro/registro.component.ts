import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { JugadorService } from 'src/app/Servicios/jugador.service';
import { Router } from '@angular/router';
import Ws from '@adonisjs/websocket-client';
import { HttpClient } from '@angular/common/http';
import { AlertsService } from 'angular-alert-module';
import * as conecta from '../../Modelos/Urls';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  //reactive forms
  form = new FormGroup({
    nickname: new FormControl('',
    [
      Validators.required,
      Validators.minLength(2),
    ]),
    password: new FormControl('',
    [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  // socket = Ws('ws://192.168.50.10:3333');
  socket = Ws(conecta.url_websocket);

  constructor(private alerta:AlertsService,private jugador_service: JugadorService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.socket = this.socket.connect();
    this.socket.subscribe('lobby:');
  }

  crearJugador(){

    this.jugador_service.jugador(this.form.value.nickname, this.form.value.password, 'jugador').subscribe(data => {
      //si está recién registrado, quiero mostrar un mensaje en el componente de login
      localStorage.setItem('recien', '1');
      this.socket.close();
      this.router.navigate(['/login']);
    },error=>{

      this.alerta.setMessage('Ya existe ese Nickname','error');
    });

  }
}

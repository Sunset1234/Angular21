import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { JugadorService } from 'src/app/Servicios/jugador.service';
import { Router } from '@angular/router';
import Ws from '@adonisjs/websocket-client';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crear-sala',
  templateUrl: './crear-sala.component.html',
  styleUrls: ['./crear-sala.component.css']
})
export class CrearSalaComponent implements OnInit {

    //reactive forms
    form = new FormGroup({
      nombre_sala: new FormControl('',
      [
        Validators.required,
        Validators.minLength(2),
      ]),
      
    });

  // socket = Ws('ws://192.168.50.10:3333');
  socket = Ws('ws://127.0.0.1:3333');
  constructor(private jugador_service: JugadorService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.socket = this.socket.connect();
    this.socket.subscribe('lobby');
  }
  
  crearsala() 
    {
     const   nombre_sala=  this.form.value.nombre_sala
     this.jugador_service.createroom(nombre_sala).subscribe(data=>{
        console.log(data);
     })
     const lobby = this.socket.getSubscription('lobby');
     lobby.emit('message', nombre_sala);
    }
  

}

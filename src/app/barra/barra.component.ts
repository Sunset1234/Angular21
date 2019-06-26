import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Key } from '../Modelos/keys';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { debug } from 'util';
import { Session } from 'inspector';
import { JuegoService } from '../Servicios/juego.service';
import { AuthComponent } from '../Componentes/auth/auth.component'
  import { from } from 'rxjs';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit {

  @ViewChild('child1') childOne:AuthComponent;

  tokem:any
  constructor(private router: Router,private _juego_service:JuegoService) { }

  condicion:any;
  ngOnInit() {
    this.llaves = new Key();
  }

  validarBotones(event){
    console.log(event)
  }

  llaves: Key;
  logout() {
    var llaves = Object.keys(this.llaves);

      llaves.forEach(element => {
        localStorage.removeItem(element);
      });
      this.router.navigate(['/login']);
  }

  login(){
    this.router.navigate(['/login'])
  }

}

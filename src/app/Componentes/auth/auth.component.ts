import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  


  constructor() { }

  ngOnInit() {
  }


  // savePersona() {
  //   const nvaPersona = new Persona(
  //     this.form.value.nombre,
  //     this.form.value.apellido,
  //     this.form.value.correo,
  //     this.form.value.contrasena,
  //   )

  //   this.nvaPersona = this._service.postPersona(nvaPersona);

  //   this.nvaPersona.subscribe(data => {
  //     this._service.agregarPersona(data);
  //   })

  // }

}

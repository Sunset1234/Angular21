import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';

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
      // password: new FormControl('',
      // [
      //   Validators.required,
      //   Validators.minLength(6)
      // ])
    });


  constructor() { }

  ngOnInit() {
  }
  
  crearsala() {

  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { JugadorService } from 'src/app/Servicios/jugador.service';
import { Router } from '@angular/router';

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

  constructor(private jugador_service: JugadorService, private router: Router) { }

  ngOnInit() {
  }

  crearJugador() {
    this.jugador_service.jugador(this.form.value.nickname, this.form.value.password, 'jugador')
                        .subscribe(data => {
                          //si está recién registrado, quiero mostrar un mensaje en el componente de login
                          localStorage.setItem('recien', '1');

                          this.router.navigate(['/login']);
                        });
  }

}

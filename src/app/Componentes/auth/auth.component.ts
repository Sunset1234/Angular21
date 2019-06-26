import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/Servicios/auth.service';
import { Router } from '@angular/router';
import { JuegoService } from 'src/app/Servicios/juego.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

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

  //PROPIEDAD PARA MANDAR
  @Output() getEstadoUser=new EventEmitter();
  public estadoUser:boolean;

  constructor(private auth_service: AuthService, private router: Router, private _juego_service:JuegoService) { }

  ngOnInit() {
    this.estadoUser=false;
  }

  msg:string="logeado";
  login(event) {
    console.log(event)

    this.auth_service.login(this.form.value.nickname, this.form.value.password, 'login').subscribe(data => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('jugador', data.jugador);
      localStorage.setItem('nick', data.nick);
      this.estadoUser=true;  
      this.getEstadoUser.emit(this.estadoUser)
      this.router.navigate(['/lobby']);
      },error=>{
          alert('Correo o contraseña invalidos');
      });
  }

  registro(){
    this.router.navigate(['/crear']);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/Servicios/auth.service';
import { Router } from '@angular/router';

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

  //creado: number = 0;

  constructor(private auth_service: AuthService, private router: Router) { }

  ngOnInit() {
    //hay que validar esto o quitarlo alv
    //this.creado = localStorage.length > 0 ? parseInt(localStorage.getItem('recien')) : 0;
  }

  login() {
    this.auth_service.login(this.form.value.nickname, this.form.value.password, 'login')
                     .subscribe(data => {
                          localStorage.setItem('token', data.token);
                          localStorage.setItem('jugador', data.jugador);
                          localStorage.setItem('nick', data.nick);
                          console.log(data.tipo);
                          this.router.navigate(['/lobby']);
                     });
  }

  registro(){
    this.router.navigate(['/crear']);
  }

}

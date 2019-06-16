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


  constructor(private auth_service: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.auth_service.jugador(this.form.value.nickname, this.form.value.password, 'login')
                     .subscribe(data => {
                          localStorage.setItem('token', data);
                          this.router.navigate(['/']);
                     });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // async canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): Promise<boolean> {
  //   //prueba para verificar token
  //   const iniciado = await this.verificarLogin().toPromise();

  //   return iniciado === true ? true : false;
  // }

  constructor(private http: HttpClient) {}

  root: string = "http://192.168.50.10:3333/";
  flag: boolean = false;

  login(nickname: string, password: string, url: string) {

    let jugador = {
      nickname: nickname,
      password: password
    }

    return this.http.post<any>(this.root + url, jugador);
  }

  
}

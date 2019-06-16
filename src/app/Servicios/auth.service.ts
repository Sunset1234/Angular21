import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, CanActivate} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  async canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): Promise<boolean> {
    //prueba para verificar token
    const iniciado = await this.verificarLogin().toPromise();

    return iniciado === true ? true : false;
  }

  constructor(private http: HttpClient) {}

  root: string = "http://127.0.0.1:3333/";
  flag: boolean = false;

  //una sola ruta
  jugador(nickname: string, password: string, url: string) {

    let jugador = {
      nickname: nickname,
      password: password
    }

    return this.http.post(this.root + url, jugador, {responseType: 'text'});
  }

  public verificarLogin() {

    const headerAuth = new HttpHeaders({
      "autorizacion" : localStorage.getItem("token")
    });

    return this.http.get(this.root + 'verificar', {headers: headerAuth});
  }
}

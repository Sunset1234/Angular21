import { Component, OnInit } from '@angular/core';
import { Key } from '../Modelos/keys';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
        //prueba
        this.llaves = new Key();
  }

  llaves: Key;

  logout() {

    var llaves = Object.keys(this.llaves);
    
    llaves.forEach(element => {
      // console.log(element);
      localStorage.removeItem(element);
    });

    this.router.navigate(['/']);
  }

}

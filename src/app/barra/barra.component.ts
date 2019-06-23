import { Component, OnInit } from '@angular/core';
import { Key } from '../Modelos/keys';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { debug } from 'util';
@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit {


  tokem:any
  constructor(  private router: Router) { }

  condicion:any;
  ngOnInit() {
        //prueba
        this.llaves = new Key();
       // if(localStorage.getItem('token')){
         // this.condicion=false;
       // }
       // else{
         // this.condicion=true;  
        //}
  }

  llaves: Key;

  logout() {
  var llaves = Object.keys(this.llaves);
    
       llaves.forEach(element => {
       
       console.log(element);
      localStorage.removeItem(element);
      
    });
    this.router.navigate(['/']);
    
  }

}

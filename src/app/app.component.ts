import { Component, OnChanges, OnInit } from '@angular/core';
import { StorageServiceService} from'./Servicios/storage-service.service';
import Ws from '@adonisjs/websocket-client';
import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { Ptor } from 'protractor';
import { Carta } from './Modelos/Carta';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'BlackJack';

  constructor(private _StorageService:StorageServiceService){
    this.getImage()
  }
  
  ngOnInit(){
    this._StorageService.currentMessage.subscribe(resultado=>{
      console.log(resultado);
    })
  }

  img= new Array<Carta>();
  msg:string;
  getImage(){
    this._StorageService.GetCartas().subscribe(resultado => {
      this.img=resultado;
        if(this.img){
          this.msg="Ya hay cartas";
        }
    });
  }

}

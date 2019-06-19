import { Component, OnChanges } from '@angular/core';
import { StorageServiceService} from'./Servicios/storage-service.service';

import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { Ptor } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  title = 'BlackJack';

  constructor(private _StorageService:StorageServiceService,private sanitizer: DomSanitizer){
    this.getImage();
  }

/*
  ngOnChanges():void {
    map(this.img, this);

    function map(element:Card, instance:CardComponent):void {
        if (element) {
            instance.header = instance.sanitization.bypassSecurityTrustHtml(element.header);

            instance.content = _.map(instance.element.content, (input:string):SafeHtml => {
                return instance.sanitization.bypassSecurityTrustHtml(input);
            });

            if (element.image) {
                /* Here is the problem... I have also used bypassSecurityTrustUrl */ /*
                instance.image = instance.sanitization.bypassSecurityTrustStyle(element.image);
            } else {
                instance.image = null;
            }

        }
    }
}*/

  img:any;
  getImage(){
    this._StorageService.GetImage().subscribe(resultado => {
      this.img=resultado;
      console.log(this.img);
    });
  }

}

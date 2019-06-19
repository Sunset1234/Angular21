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


<<<<<<< HEAD
  constructor(private _StorageService:StorageServiceService,private sanitizer: DomSanitizer){
    this.getImage();
=======
  constructor(private _StorageService:StorageServiceService){
   /* this.getImage();*/
>>>>>>> 2572eac49ae5f68c9ab105678877f0a88d705102
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
<<<<<<< HEAD
      this.img=resultado.path;
      let trustedurl = this.sanitizer.bypassSecurityTrustUrl(this.img);
      console.log(this.img);
=======
      this.img=resultado;

      var file:File =this.img;
      var myReader:FileReader = new FileReader();

      myReader.onloadend = (e) => {
        this.img = myReader.result;
      }
      this.img=myReader.readAsDataURL(file);

>>>>>>> 2572eac49ae5f68c9ab105678877f0a88d705102
    });
  }

}

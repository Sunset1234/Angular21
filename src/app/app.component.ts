import { Component } from '@angular/core';
import { StorageServiceService} from'./Servicios/storage-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BlackJack';


  constructor(private _StorageService:StorageServiceService){
    this.getImage();
  }

  img:any;
  getImage(){
    this._StorageService.GetImage().subscribe(resultado => {
      this.img=resultado;
      console.log(String(this.img));
    });
  }

}

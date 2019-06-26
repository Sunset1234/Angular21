import { Component, OnInit } from '@angular/core';
import { EstadisticasService } from 'src/app/Servicios/estadisticas.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Jugador: string = localStorage.nick;
  id: string = localStorage.jugador;
  Datos_jugador=new  Array<any>();
  porcentaje_ganadas:number;
  datos_de_partida:string;
  fecha_de_partida:string ;
  constructor(private estadisticas: EstadisticasService) { }

  ngOnInit() {
    this.estadisticas.partidas(this.id).subscribe(data => {
      this.Datos_jugador.push(data['partidas']);
      // tslint:disable-next-line: max-line-length  tslint:disable-next-line: use-isnan
      this.porcentaje_ganadas = (Math.floor((data['partidas'].partidas_ganadas / data['partidas'].partidas_jugadas)* 100)) == NaN ? Math.floor((data['partidas'].partidas_ganadas/ data['partidas'].partidas_jugadas)* 100) :100 ;

      this  .datos_de_partida = (data['info_partidas'].juego_id !=undefined ) ? data['info_partidas'].juego_id : 'no hay datos';
      // tslint:disable-next-line: max-line-length
      this.fecha_de_partida = (data['info_partidas'].updated_at != undefined) ? data['info_partidas'].updated_at : data['partidas'].created_at ;
    });
  }

}

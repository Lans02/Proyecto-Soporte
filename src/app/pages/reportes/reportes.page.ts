import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProblemaService , usuario , } from '../../servicios/problema.service' ;
import { ReportComponent } from 'src/app/componetes/report/report.component';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {

  public usuario: any = [];
  public reports: any = [];

  constructor(private modal: ModalController , private problema: ProblemaService ) { }

  ngOnInit() {

    this.usuario = JSON.parse(window.localStorage.getItem('datosUsuario'));

    this.problema.getReport().subscribe( r => {
      this.reports = r;
      });
  }

  opentik( ) {
    this.modal.create({
      component: ReportComponent,
      componentProps : {

      }
    }).then( (modal) => modal.present());
  }


}

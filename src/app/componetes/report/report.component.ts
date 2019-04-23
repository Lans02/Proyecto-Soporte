import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProblemaService , usuario } from '../../servicios/problema.service' ;
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {

  public tipo: string;
  public tiempo: string;
  public descri: string;
  public nombre: string;
  public codigo: string;
  public email: string;
  public fecha: string;

  constructor(private modal: ModalController, private problema: ProblemaService , private router: Router) { }

  ngOnInit() {}

  closetik() {
    this.modal.dismiss();
  }

  onRegistrartick() {
    this.problema.RegistrarTick(this.codigo, this.nombre, this.email, this.fecha , this.tipo, this.tiempo , this.descri ).then(() => {
      console.log('registrado satisfactoriamente');
    }).catch( err => {
      console.log(err);
    });
    this.closetik();

  }



}

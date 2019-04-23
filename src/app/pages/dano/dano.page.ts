import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { ProblemaService , usuario } from '../../servicios/problema.service' ;
import { FormControl , FormBuilder , FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-dano',
  templateUrl: './dano.page.html',
  styleUrls: ['./dano.page.scss'],
})
export class DanoPage implements OnInit {

    error_messages = {

    'tipo' : [
      { type: 'required', message: 'Se requiere el campo Tipo de Daño' },
    ] ,
    'tiempo' : [
      { type: 'required', message: 'Se requiere el campo tiempo de daño' },
    ] ,
    'descri' : [
      { type: 'required', message: 'Se requiere el campo descripcion' },
    ] ,


  };


  solicitudform: FormGroup;
  public tipo: string;
  public tiempo: string;
  public descri: string;
  public Usuarios: any = [];

  constructor( private formBuilder: FormBuilder, public actionSheetController: ActionSheetController , public authservice: AuthService ,
  private problema: ProblemaService , private router: Router , public toastController: ToastController  ) {

    this.solicitudform =  this.formBuilder.group({
      tiempo: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      tipo: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      descri: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
  }

  Onlogout() {
    this.authservice.logout();
  }

  onRegistrarProblema() {

    this.problema.RegistrarSolicitud( this.tipo, this.tiempo , this.descri).then(() =>  {
    firebase.firestore().collection('Contacts').doc(firebase.auth().currentUser.uid).get().then( doc => {
      if (doc.data().tipoU === 'Usuario') {
        this.router.navigate(['/tab/chat']);
        } else {
          this.error();
        }
      });
     console.log('registrado satisfactoriamente');
     this.presentToast();
    }).catch( err => {
      console.log(err);
    });
  }

  ngOnInit() {
      this.problema.getUser().subscribe( users => {
      this.Usuarios = users;
    });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Cerrar Sesion',
        role: 'destructive',
        icon: 'log-out',
        handler: () => {
         this.Onlogout();
        }
      }, {
        text: 'Cerrar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cerramos ');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Sea registrado la solicitud.',
      duration: 10000,
      color:  'success',
    });
    toast.present();
  }

  async  error() {
    const toast = await this.toastController.create({
      message: 'No podemos comunicarlo con un tecnico.',
      duration: 6000,
      color:  'danger',
    });
    toast.present();
  }




}

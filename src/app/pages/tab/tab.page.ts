import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.page.html',
  styleUrls: ['./tab.page.scss'],
})
export class TabPage implements OnInit {

  public usuario: any = [];

  constructor( public toastController: ToastController, public actionSheetController: ActionSheetController,
  public authservice: AuthService ) { }

  ngOnInit() {
    this.usuario = JSON.parse(window.localStorage.getItem('datosUsuario'));
  }

  Onlogout() {
    this.authservice.logout();
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
      duration: 2000,
      color:  'success',
    });
    toast.present();
  }


}

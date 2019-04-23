import { Component, OnInit } from '@angular/core';
import { FormControl , FormBuilder , FormGroup , Validators} from '@angular/forms';
import { AuthService  } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  error_messages = {
    'email' : [
      { type: 'required', message: 'Se requiere el Email' },
      { type: 'minlength', message: 'El email debe tener al menos 6 caracteres.' },
      { type: 'maxlength', message: 'El email no puede tener más de 50 caracteres.' },
      { type: 'pattern', message: 'Por favor ingresar una  direccion de email valida' }
    ] ,
    'password' : [
      { type: 'required', message: 'Se requiere la contraseña' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres.' },
      { type: 'maxlength', message: 'La contraseña no puede tener más de 30 caracteres.' },
      { type: 'pattern', message: 'La contraseña debe contener caracteres mayúsculas, minusculas o numeros' }
    ]

  };
  loginForm: FormGroup;
  email: string;
  password: string;


  constructor( private formBuilder: FormBuilder , private authService: AuthService ,
   public router: Router , private alertCtrl: AlertController ) {

    this.loginForm =  this.formBuilder.group({
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      email : new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
   }



  ngOnInit() {
  }
  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Notificar',
      message: ' El Usuario no se encuentran registrado o los datos ingresados no coinciden.',
      buttons: ['OK']
    });

    await alert.present();
  }

  onSubmitLogin() {
    this.authService.login(this.email, this.password).then(
      res => {
        firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).get().then( doc => {
          if (doc.data().tipoU === 'Tecnico') {
            window.localStorage.setItem('datosUsuario', JSON.stringify(doc.data()));
            console.log(doc.data().tipoU);
            this.router.navigate(['/tab/chat']);
          } else {
            window.localStorage.setItem('datosUsuario', JSON.stringify(doc.data()));
            this.router.navigate(['/dano']);
            console.log(doc.data().tipoU);
          }

          });

      }).catch( err => {
      return this.presentAlert();
    });

  }



}

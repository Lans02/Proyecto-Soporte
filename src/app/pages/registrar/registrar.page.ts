import { Component, OnInit } from '@angular/core';
import { FormControl , FormBuilder , FormGroup , Validators} from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { Router  } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  error_messages = {

    'tipo' : [
      { type: 'required', message: 'Se requiere el campo Tipo de Persona' },
    ] ,
    'nombre' : [
      { type: 'required', message: 'Se requiere el campo Nombre' },
    ] ,
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

  registrarForm: FormGroup;
  public tipo: string;
  public nombre: string;
  public email: string;
  public password: string;
  public tipoU = 'Usuario';

  constructor( private formBuilder: FormBuilder, private  auth: AuthService , private router: Router) {

    this.registrarForm =  this.formBuilder.group({
      nombre: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      tipo: new FormControl('', Validators.compose([
        Validators.required,
      ])),
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

  onSubmitRegister() {
    this.auth.regitery(this.email, this.password, this.nombre, this.tipo, this.tipoU).then( auth => {
      this.router.navigate(['/dano']);
      console.log('registrado satisfactoriamente');
    }).catch(err => {
      console.log(err);
    });

  }

}

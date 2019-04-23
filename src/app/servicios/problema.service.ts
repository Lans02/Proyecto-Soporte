import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { promise } from 'protractor';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';



// tslint:disable-next-line: class-name
export interface usuario {
  Nombre: string;
  email: string;
  uid: string;
}
// tslint:disable-next-line: class-name
export interface reportes {
  codigo: string;
  tipo: string;
  tiempo: string;
  descri: string;
  nombre: string;
  email: string;
  fecha: string;
  estado: string;

}

@Injectable({
  providedIn: 'root'
})

export class ProblemaService {

  constructor(private AFauth: AngularFireAuth  , private router: Router , private db: AngularFirestore ,
  private dba: AngularFireDatabase ) { }
 

RegistrarSolicitud( tipod: string, tiempo: string, descripcion: string) {
  return  new Promise((resolve , reject) => {
    let uid = '';
      this.AFauth.authState.subscribe( res => {
        resolve(res);
        uid =  res.uid;
        this.db.collection('Solicitud').doc(uid).set({
          tipo: tipod ,
          tiempo: tiempo,
          descripcion: descripcion,
          uid: uid,
        });
        // if (res && res.uid) {
        // // tslint:disable-next-line: no-shadowed-variable
        // // this.AFauth.user.subscribe( auth => console.log(auth) );
        //   console.log('usuario esta logiado');
        // } else {
        //   console.log('usuario no logiado');
        // }
      });

  });

}

RegistrarTick( codigo: string , nombre: string, email: string, fecha: string, tipod: string, tiempo: string, descripcion: string ) {
  return  new Promise(( resolve , reject) => {

              this.db.collection('Reports').doc(codigo).set({
              codigo: codigo,
              Nombre: nombre,
              email: email,
              fecha: fecha,
              tipo: tipod ,
              tiempo: tiempo,
              descripcion: descripcion,
              estado: 'En Proceso',
     });
  });

}
getReport() {

  return this.db.collection('Reports').snapshotChanges().pipe(map (reporte => {
    return reporte.map(a => {
      const data = a.payload.doc.data() as reportes;
      data.codigo = a.payload.doc.id;
      return data;
    });
  }));
}




getUser() {
  return this.db.collection('Contacts').snapshotChanges().pipe(map (users => {
    return users.map(a => {
      const data = a.payload.doc.data() as usuario;
      data.uid = a.payload.doc.id;
      return data;
    });
  }));
}


}


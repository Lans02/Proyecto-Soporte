import { Injectable } from '@angular/core';
import { AngularFireAuth  } from '@angular/fire/auth';
import { promise } from 'protractor';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth: AngularFireAuth , private router: Router , private db: AngularFirestore ) { }

  login( email: string, password: string ) {
  return new Promise(( resolve , rejected) => {
      this.AFauth.auth.signInWithEmailAndPassword (email, password).then(user => {
         resolve(user);
        }).catch (err => rejected(err));
      });

    }

  logout() {
    this.AFauth.auth.signOut();
    this.router.navigate(['/login']);
  }

  regitery(email: string , password: string  , nombre: string , tp: string , tipoU: string ) {
    return  new Promise((resolve , reject) => {
      this.AFauth.auth.createUserWithEmailAndPassword(email, password).then(res => {
        resolve(res);
        const uid =  res.user.uid;
        this.db.collection('Users').doc(uid).set({
          uid: uid,
          Tipopersona: tp,
          Nombre: nombre,
          tipoU: tipoU,
          email: email,
        }),
        this.db.collection('Contacts').doc(uid).set({
          uid: uid,
          Nombre: nombre,
          email: email,
          tipoU: tipoU,
        });


      }).catch(err => reject(err));
    });

  }

}


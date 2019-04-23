import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { message } from '../models/message';
import { firestore } from 'firebase';


export interface chat {
  Nombre: string;
  email: string;
  uid: string;
  tipoU: string;
}

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  constructor(private db: AngularFirestore ) { }

  getRooms() {
    return this.db.collection('Contacts').snapshotChanges().pipe(map (rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as chat;
        data.uid = a.payload.doc.id;
        return data;
      });
    }));
  }

  getChatRoom( chat_id: string) {
    return this.db.collection('Contacts').doc(chat_id).valueChanges();
  }

  sendMsgToFirebase( message: message, chat_id: string) {
    this.db.collection('Contacts').doc(chat_id).update({
      messages : firestore.FieldValue.arrayUnion(message),
    });
  }






}

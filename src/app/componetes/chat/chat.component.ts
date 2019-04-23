import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { ChatService , chat } from '../../servicios/chat.service';
import { message } from '../../models/message';
import * as firebase from 'firebase/app';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  public chat: any;

  public messages = [];
  public room: any;
  public msg: string;


  constructor(private modal: ModalController, private chatService: ChatService,
  public navparams: NavParams ) { }

  ngOnInit() {

    this.chatService.getChatRoom( this.chat.uid ).subscribe( room => {
      console.log(room);
      this.room = room;
    });

    firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).get().then( doc => {
      if (doc.data().uid === this.chat.uid) {
         this.chat.Nombre = 'Tecnico';
         this.navparams.get(this.chat.Nombre);
      } else {
        this.chat = this.navparams.get('chat');
      }
    });

    }

  closeChat() {
    this.modal.dismiss();
  }

  sendMessage() {
        const mensaje: message = {
        content : this.msg,
        type : 'text',
        date : new Date()
        };
      this.chatService.sendMsgToFirebase( mensaje, this.chat.uid);
      this.msg = '';
      }


}

import { Component, OnInit } from '@angular/core';
import { ChatService, chat } from '../../servicios/chat.service';
import { ModalController } from '@ionic/angular';
import { ChatComponent } from '../../componetes/chat/chat.component';
import * as firebase from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],

})


export class ChatPage implements OnInit {

  public chatRooms: any = [];
  public usuario: any = [];

  constructor( public chatservice: ChatService ,  private modal: ModalController,
  private router: Router , private activeRoute: ActivatedRoute , ) {

  }

  ngOnInit() {
    this.chatservice.getRooms().subscribe( chats => {
      this.chatRooms = chats;
      });

    this.usuario = JSON.parse(window.localStorage.getItem('datosUsuario'));

  }
// tslint:disable-next-line: no-shadowed-variable
  openChat( chat: any) {
    this.modal.create({
      component: ChatComponent,
      componentProps : {
        chat: chat
      }
    }).then( (modal) => modal.present());
  }

}

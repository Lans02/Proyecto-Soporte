import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabPage } from './tab.page';

const routes: Routes = [
  {
    path: '',
    component: TabPage,

    children: [{
      path: 'chat',
      loadChildren: '../chat/chat.module#ChatPageModule',
    },
    {
      path: 'reportes',
      loadChildren: '../reportes/reportes.module#ReportesPageModule',
    },
    {
      path: 'evaluar',
      loadChildren: '../evaluar/evaluar.module#EvaluarPageModule',
    }

  ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabPage]
})
export class TabPageModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NologinGuard } from './guards/nologin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'slides', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [NologinGuard]},
  { path: 'dano', loadChildren: './pages/dano/dano.module#DanoPageModule' , canActivate: [AuthGuard]  },
  { path: 'registrar', loadChildren: './pages/registrar/registrar.module#RegistrarPageModule', canActivate: [NologinGuard]},
  { path: 'tab', loadChildren: './pages/tab/tab.module#TabPageModule' },
  { path: 'chat', loadChildren: './pages/chat/chat.module#ChatPageModule' },
  { path: 'reportes', loadChildren: './pages/reportes/reportes.module#ReportesPageModule' },
  { path: 'slides', loadChildren: './pages/slides/slides.module#SlidesPageModule' },
  { path: 'evaluar', loadChildren: './pages/evaluar/evaluar.module#EvaluarPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClasificacionComponent } from './components/clasificacion/clasificacion.component';
import { DotacionkaComponent } from './components/dotacionka/dotacionka.component';

const routes: Routes = [
  {path: 'clasificacion',component: ClasificacionComponent},
  {path: 'dotacionka', component: DotacionkaComponent},
  {path: '**', redirectTo: 'clasificacion'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

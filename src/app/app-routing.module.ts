import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClasificacionComponent } from './components/clasificacion/clasificacion.component';

const routes: Routes = [
  {path: 'clasificacion',component: ClasificacionComponent},
  {path: '**', redirectTo: 'clasificacion'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

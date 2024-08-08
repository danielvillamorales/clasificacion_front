import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClasificacionComponent } from './components/clasificacion/clasificacion.component';
import { HttpClientModule } from '@angular/common/http';
import { DotacionkaComponent } from './components/dotacionka/dotacionka.component';

@NgModule({
  declarations: [
    AppComponent,
    ClasificacionComponent,
    DotacionkaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

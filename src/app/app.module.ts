import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { RefugiosModule } from './refugios/refugios.module';
import { AnimalesModule } from './animales/animales.module';
import { GestionModule } from './gestion/gestion.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, LayoutComponent, HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    RefugiosModule,
    AnimalesModule,
    GestionModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

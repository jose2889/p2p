import {  LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule } from'@angular/forms';
import {FormsModule } from'@angular/forms';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistrarOrdenComponent } from './registrar-orden/registrar-orden.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { RegistroViejoComponent } from './registro-viejo/registro-viejo.component';
import { registerLocaleData } from '@angular/common';
import localeEsCl from '@angular/common/locales/es-cl';

registerLocaleData(localeEsCl)

@NgModule({
  declarations: [
    AppComponent,
    RegistrarOrdenComponent,
    RegistroViejoComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule,
    NgxPaginationModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgbModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-cl' }],
  bootstrap: [AppComponent]
})
export class AppModule { }

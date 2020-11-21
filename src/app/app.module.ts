import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';


//importaciones manuales IMPORTANTES PARA TODO PROYECTO
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //MODULO PARA EL MANEJO DE FORMULARIOS!!
import { APP_ROUTING } from './app.routes'; //gestionador de rutas que tendra nuestra aplicacion web...
import { HttpClientModule } from '@angular/common/http'; //modulo para poder consumir servicios.

//SERVICIOS que se deben de importar de forma manual
import { LoginService } from './services-injectables/service-login';
import {PrivilegesGuard } from './services-injectables/service-PrivilegesGuard';
import { ServiceBloquearNavAtrasService}  from  './services-injectables/service-bloquear-nav-atras.service';
import { FormularioAmigosService}  from  './services-injectables/formulario-amigos.service';



//FIN DE IMPORTACONES MANUELES PROYECXTOS


//COMPONENTES
import { AppComponent } from './app.component';
import { AmigosComponent } from './componentes/amigos/amigos.component';
import { LoginComponent } from './componentes/login/login.component';
import { HeaderComponent } from './componentes/shared/header/header.component';
import { FormularioAmigosComponent } from './componentes/shared/formulario-amigos/formulario-amigos.component';

@NgModule({ //decorador general padre de toda la app web
  declarations: //todo aque componente que se incluya en la lista de
  // declaraciones y bootstrap, podrán usarse en cualquier lado de la app web.
  [ 
    AppComponent, AmigosComponent, LoginComponent, HeaderComponent, FormularioAmigosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTING,
    HttpClientModule
  ],
  providers: [LoginService,PrivilegesGuard, ServiceBloquearNavAtrasService,FormularioAmigosService ],  //aqui van los servicios web o servicios locales (si no, no jalan)
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA] //PARA QUE PERMITA UTILIZAR CIERTOS FORMATOS DE HTML EN ANGULAR..
})
export class AppModule { }

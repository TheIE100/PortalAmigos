import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';


//importaciones manuales IMPORTANTES PARA TODO PROYECTO
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //MODULO PARA EL MANEJO DE FORMULARIOS!!
import { APP_ROUTING } from './app.routes'; //gestionador de rutas que tendra nuestra aplicacion web...
import { HttpClientModule } from '@angular/common/http'; //modulo para poder consumir servicios.
//FIN DE IMPORTACONES MANUELES
//SERVICIOS
import { LoginService } from './services-injectables/service-login';
//COMPONENTES
import { AppComponent } from './app.component';
import { AmigosComponent } from './componentes/amigos/amigos.component';
import { LoginComponent } from './componentes/login/login.component';

@NgModule({ //decorador general padre de toda la app web
  declarations: //todo aque componente que se incluya en la lista de
  // declaraciones y bootstrap, podrán usarse en cualquier lado de la app web.
  [ 
    AppComponent, AmigosComponent, LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTING,
    HttpClientModule
  ],
  providers: [LoginService],  //aqui van los servicios web o servicios locales
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA] //PARA QUE PERMITA UTILIZAR CIERTOS FORMATOS DE HTML EN ANGULAR..
})
export class AppModule { }

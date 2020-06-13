import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


//No es un @Component si no un @Injectable
@Injectable()
export class LoginService  {
  constructor( public httpClient:HttpClient ) {  //UTILIZA EL MODULO HTTPCLIENT PARA CONSUMIR SERVICIOS
    console.log('Servicio de Login Listo..');
  }
  
  getListaDeAmigos(usuario:string, password:string){
        if(usuario=="emmanuel" && password=="twitch123"){
            return true;
        }
        else{
            return false;
        }

    /*
  //Utilizamos template literals
  let servicioRest = `http://localhost:8585/students/busqueda/${palabraClave}`;
  */
     //   return this.httpClient.get(servicioRest);  //PETICION TIPO GET!!!!!, este objeto es tipo OBSERVABLE y se regresa para que que se puedan suscribir al modulo que anda al pendiente
  }
}

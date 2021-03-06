import {BehaviorSubject} from 'rxjs';   
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ServiceLocalStorage { //Servicio de observador del objeto local storage para indicar cambios a componentes
 obsSesionActiva = new BehaviorSubject(this.getSesionActiva());


 setSesionActiva(valor) {
   this.obsSesionActiva.next(valor); //indica que el valor ha sido cambiado a los suscriptores
   localStorage.setItem("UsuarioActivo", valor);
 }

 getSesionActiva() {
   console.log(`Usuario activo ${localStorage['UsuarioActivo']}`);
   return localStorage["UsuarioActivo"]; //ojo, usar esta notacion es mejor que getItem porque previene el F5
 }


 setTokenUsuario(token: string){
    localStorage.setItem("token",token);
 }

 getTokenUsuario(){
    return localStorage["token"];
 }
}
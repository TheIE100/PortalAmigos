import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


//No es un @Component si no un @Injectable
@Injectable()
export class LoginService  {
  listaAmigosInstancia:any; //variable SUPER UTIL que podran consultar los componentes para obtener la información


  constructor( public httpClient:HttpClient ) {  //UTILIZA EL MODULO HTTPCLIENT PARA CONSUMIR SERVICIOS
    console.log('Servicio de Login Listo..');
  }
  
  getListaDeAmigos(usuario:string, password:string){
        let respuesta:boolean = false;

        if(usuario=="emmanuel" && password=="twitch123"){
          this.listaAmigosInstancia  = [
            {
              nombre: "Ale_gons",
              imagen: "https://static-cdn.jtvnw.net/jtv_user_pictures/9c79bf4f-12fc-4c23-9b3d-da5aac423b18-profile_image-300x300.png",
              ligaTwitch: "https://www.twitch.tv/Ale_Gons"
            },
            {
              nombre: "azieldavid0798",
              imagen: "https://static-cdn.jtvnw.net/jtv_user_pictures/c334d19a-6645-468d-8597-46600537f8ce-profile_image-300x300.png",
              ligaTwitch: "https://www.twitch.tv/azieldavid0798"
            },
            {
              nombre: "uziel4r53",
              imagen: "https://static-cdn.jtvnw.net/jtv_user_pictures/7bbbbd8b-0cad-4dfb-ad94-99c4eb4ab26f-profile_image-300x300.png",
              ligaTwitch: "https://www.twitch.tv/uziel4r53"
            },
            {
              nombre: "watertd12",
              imagen: "https://static-cdn.jtvnw.net/jtv_user_pictures/60d81439-9c03-4b7b-b3bf-76781c5c74d2-profile_image-300x300.png",
              ligaTwitch: "https://www.twitch.tv/watertd12"
            },
            { 
              nombre: "cloudzy_roblox",
              imagen: "https://static-cdn.jtvnw.net/jtv_user_pictures/0e7c5503-95ac-4569-939e-987df2a3b65c-profile_image-300x300.png",
              ligaTwitch: "https://www.twitch.tv/cloudzy_roblox"

            }
          ];
            respuesta = true;
        }
        return respuesta;    /*
  //Utilizamos template literals
  let servicioRest = `http://localhost:8585/students/busqueda/${palabraClave}`;
  */
     //   return this.httpClient.get(servicioRest);  //PETICION TIPO GET!!!!!, este objeto es tipo OBSERVABLE y se regresa para que que se puedan suscribir al modulo que anda al pendiente
  }
}


export interface Amigo{ //interfaz como la de java n_n, aqui declaramos esqueleto de un 'Amigo'
  nombre:string;
  imagen:string;
  ligaTwitch:string;
}

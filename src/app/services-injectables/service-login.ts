import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


//No es un @Component si no un @Injectable
@Injectable()
export class LoginService  {
  listaAmigosInstancia:any;


  constructor( public httpClient:HttpClient ) {  //UTILIZA EL MODULO HTTPCLIENT PARA CONSUMIR SERVICIOS
    console.log('Servicio de Login Listo..');
  }
  
  getListaDeAmigos(usuario:string, password:string){
        let listaAmigos:Amigo[] = [
          {
            nombre: "sin_amigos_efe_efe",
            imagen: "",
            ligaTwitch: ""
          }
        ];

        if(usuario=="emmanuel" && password=="twitch123"){
            listaAmigos = [
            {
              nombre: "Ale_gons",
              imagen: "https://static-cdn.jtvnw.net/jtv_user_pictures/9c79bf4f-12fc-4c23-9b3d-da5aac423b18-profile_image-300x300.png",
              ligaTwitch: "https://www.twitch.tv/Ale_Gons"
            },
            {
              nombre: "AzielDavid87",
              imagen: "https://static-cdn.jtvnw.net/jtv_user_pictures/c334d19a-6645-468d-8597-46600537f8ce-profile_image-70x70.png",
              ligaTwitch: "https://www.twitch.tv/azieldavid87"
            },
            {
              nombre: "uziel4r53",
              imagen: "https://static-cdn.jtvnw.net/jtv_user_pictures/7bbbbd8b-0cad-4dfb-ad94-99c4eb4ab26f-profile_image-70x70.png",
              ligaTwitch: "https://www.twitch.tv/uziel4r53"
            },
            {
              nombre: "watertd12",
              imagen: "https://static-cdn.jtvnw.net/jtv_user_pictures/5f18630d-dbe0-4832-9126-c98c3b6282d2-profile_image-70x70.png",
              ligaTwitch: "https://www.twitch.tv/watertd12"
            }];
        }
        else{
          listaAmigos = [{
            nombre: "efe_no_pudiste_iniciar_sesion_huehuehue_401",
            imagen: "",
            ligaTwitch: ""

          }]

        }
        this.listaAmigosInstancia = listaAmigos;
        return listaAmigos;    /*
  //Utilizamos template literals
  let servicioRest = `http://localhost:8585/students/busqueda/${palabraClave}`;
  */
     //   return this.httpClient.get(servicioRest);  //PETICION TIPO GET!!!!!, este objeto es tipo OBSERVABLE y se regresa para que que se puedan suscribir al modulo que anda al pendiente
  }
}


export interface Amigo{
  nombre:string;
  imagen:string;
  ligaTwitch:string;
}

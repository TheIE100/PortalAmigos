import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpParams} from "@angular/common/http";
import { ServiceLocalStorage } from './service-Observador-LocalStorage';
import {  map } from 'rxjs/operators';
import { GlobalVariables } from '../Global';
import { Observable } from 'rxjs';
//No es un @Component si no un @Injectable
@Injectable()
export class LoginService  {
  listaAmigosInstancia:any[]; //variable SUPER UTIL que podran consultar los componentes para obtener la información




  constructor( public httpClient:HttpClient,   public lsObservador : ServiceLocalStorage ) {  //UTILIZA EL MODULO HTTPCLIENT PARA CONSUMIR SERVICIOS
    console.log('Servicio de Login Listo..');
  }



  
  descargar_lista_amigos() : Observable<any>{  //realiza una peticion de lista de amigos al servidor y los almacena en variable de servicio que se usaran en los distintos componentes..
          this.listaAmigosInstancia  = [];
          console.log("AQUI SE EJECUTA!!!!");
          var url = `${GlobalVariables.BASE_API_URL}/api/Amigos/DescargaAmigos`;
          var cabecera  = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': `Bearer ${this.lsObservador.getTokenUsuario()}`
            });
            //console.log(url);
            //console.log(this.lsObservador.getTokenUsuario());
          return this.httpClient.get(url,{ headers: cabecera }).pipe(
          map(  resp  => {
            console.log(resp);
               var respuesta_instancia = resp as DescargaAmigosResponse;
                console.log(`Esta fue la respuesta ${JSON.stringify(respuesta_instancia)}`);
                if(respuesta_instancia.Estatus == 200){
                    this.listaAmigosInstancia = respuesta_instancia.ListaAmigos;
                    if(  this.listaAmigosInstancia.length == 0){
                      this.lsObservador.setSesionActiva(false);
                      this.lsObservador.setTokenUsuario("");
                     }
                }
              })
            );

  }

  login(usuario: string, password: string) : Observable<Object>{
    const url = `${GlobalVariables.BASE_API_URL}/auth/login`;
 
   const body = new HttpParams()
   .set('grant_type', 'password')
   .set('username', usuario)
   .set('password', password);
 
   var cabecera  = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': '*/*'
    });
   return this.httpClient.post(url, body, { headers: cabecera }).pipe(
   map( resp => {
     //si el login es exitoso, entra a este flujo, en caso contrario lanza una excepción
         this.lsObservador.setSesionActiva(true);
         this.lsObservador.setTokenUsuario(resp['access_token']);
          return resp;
       })
     );
   }
}

export interface Amigo{ //interfaz como la de java n_n, aqui declaramos esqueleto de un 'Amigo'
  Nombre:string;
  Imagen:string;
  LigaTwitch:string;
}


export interface DescargaAmigosResponse{
    Estatus:number;
    Mensaje:String;
    ListaAmigos:Amigo[]
}

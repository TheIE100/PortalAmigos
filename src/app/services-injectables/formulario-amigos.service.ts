import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpParams} from "@angular/common/http";
import { ServiceLocalStorage } from './service-Observador-LocalStorage';
import {  map } from 'rxjs/operators';
import { GlobalVariables } from '../Global';
import { Observable } from 'rxjs';
import { AmigoModel } from '../models/amigoModel';


//No es un @Component si no un @Injectable
@Injectable()
export class FormularioAmigosService {
  responseServer : any;

  constructor( public httpClient:HttpClient,   public lsObservador : ServiceLocalStorage ) {  //UTILIZA EL MODULO HTTPCLIENT PARA CONSUMIR SERVICIOS
    console.log('Servicio de FormularioAmigos Listo..');
  }

  
  borrarAmigo(identificadorRegistro:string) : Observable<any>{  
    console.log("AQUI SE EJECUTA!!!! 2");
    var cabecera  = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': `Bearer ${this.lsObservador.getTokenUsuario()}`
      });
       
    const body = new HttpParams()
    .set('identificadorRegistro', identificadorRegistro)


    return this.httpClient.delete(`${GlobalVariables.BASE_API_URL}/api/Amigos/BorrarAmigo`,{ headers: cabecera , params: body}).pipe(
    map(  resp  => {
      console.log(resp);
        var respuesta_instancia = resp as ClassicResponse;
          console.log(`Esta fue la respuesta ${JSON.stringify(respuesta_instancia)}`);
          this.responseServer = respuesta_instancia;
         
        })
      );
  }

  insertar_amigo(  amigo:AmigoModel) : Observable<any>{  
      console.log("AQUI SE EJECUTA!!!!");
      var url = `${GlobalVariables.BASE_API_URL}/api/Amigos/InsertarAmigo`;
      var cabecera  = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': `Bearer ${this.lsObservador.getTokenUsuario()}`
        });
        
      return this.httpClient.post(url,amigo,{ headers: cabecera }).pipe(
      map(  resp  => {
        console.log(resp);
          var respuesta_instancia = resp as ClassicResponse;
            console.log(`Esta fue la respuesta ${JSON.stringify(respuesta_instancia)}`);
            this.responseServer = respuesta_instancia;
           
          })
        );
    }


    
    editar_amigo(amigo:AmigoModel, identificadorRegistro:string) : Observable<any>{  
      console.log("AQUI SE EJECUTA!!!! 3");
      var cabecera  = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': `Bearer ${this.lsObservador.getTokenUsuario()}`
        });
         
  console.log(this.lsObservador.getTokenUsuario());
        var input_web_service = {
          AmigoRecibido : amigo,
          IdentificadorRegistro: identificadorRegistro
        };
  
      return this.httpClient.put<any>(`${GlobalVariables.BASE_API_URL}/api/Amigos/ActualizarAmigo`,input_web_service,{ headers: cabecera }).pipe(
      map(  resp  => {
        console.log(resp);
          var respuesta_instancia = resp as ClassicResponse;
            console.log(`Esta fue la respuesta ${JSON.stringify(respuesta_instancia)}`);
            this.responseServer = respuesta_instancia;
           
          })
        );
    }
}


export interface ClassicResponse{
  Estatus:number;
  Mensaje:String;
}

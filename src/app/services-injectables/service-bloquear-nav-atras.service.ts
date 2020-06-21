import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceBloquearNavAtrasService { //este servicio es para evitar que el usuario pueda navegar hacia trás
  constructor() { 
  }

  bloquearAtras(){
              //para evitar que le hagan back...(funciona en firefox)
              window.history.pushState(null, "", window.location.href);
              window.onpopstate = function () {
                window.history.pushState(null, "", window.location.href);
              };

  }

}
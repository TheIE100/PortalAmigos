import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceLocalStorage } from 'src/app/services-injectables/service-Observador-LocalStorage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  usuarioConectado:boolean;

  constructor(private router:Router, public lsObservador : ServiceLocalStorage) { 
    console.log("esta en el constructor :v");
    lsObservador.obsSesionActiva.subscribe((valor) => {  //activando el patron observador (constructor solo se crea 1 vez), el valor cambia en el serviceLocalStorage
      this.usuarioConectado = (String(valor) == "true")  //¿El usuario está conectado? (esto cambia la variable y lo manda al html)
      console.log(`Observador actiVado de verificador usuarioConectado :D ${this.usuarioConectado} EN HEADER`);
   });

  }

  ngOnInit(): void {
  
  }
  
  cerrarSesion(){
    this.lsObservador.setSesionActiva("false");
    this.router.navigate(['/login']);
  }

}

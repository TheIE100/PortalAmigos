import { Component, OnInit } from '@angular/core';
import { LoginService} from "../../services-injectables/service-login"
declare let swal: any; //para que el compilador de angular no se esté quejando de que no existe este metodo...



@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.component.html',
  styleUrls: ['./amigos.component.scss']
})
export class AmigosComponent implements OnInit {

  constructor(public loginService : LoginService) { 
    console.log(this.loginService.listaAmigosInstancia); //de esta forma recibimos lista de amigos mediante el servicio
  }

  ngOnInit(): void {
      swal("Iniciaste sesión correctamente", "¡Felicidades!", "success");

  }

}

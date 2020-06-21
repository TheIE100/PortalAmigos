import { Component, OnInit } from '@angular/core';
import { LoginService} from "../../services-injectables/service-login"
import { ServiceBloquearNavAtrasService } from 'src/app/services-injectables/service-bloquear-nav-atras.service';

declare let swal: any; //para que el compilador de angular no se esté quejando de que no existe este metodo...

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.component.html',
  styleUrls: ['./amigos.component.scss'],
  
})
export class AmigosComponent implements OnInit {
  amigos:any;

  constructor(public loginService : LoginService,
    public bloqueoServicio: ServiceBloquearNavAtrasService) { 
  }

  ngOnInit(): void { //se activa cada que el usuario entra al componente
      this.bloqueoServicio.bloquearAtras();
      this.amigos = this.loginService.listaAmigosInstancia; //de esta forma recibimos lista de amigos mediante el servicio
      swal("Iniciaste sesión correctamente", "¡Felicidades!", "success");
  }

}

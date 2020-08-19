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
  amigos:any[];
  tituloCabecera:string; 

  constructor(public loginService : LoginService,
    public bloqueoServicio: ServiceBloquearNavAtrasService) { 
  }

  ngOnInit(): void { //se activa cada que el usuario entra al componente
      this.bloqueoServicio.bloquearAtras();
      this.tituloCabecera = "Lista de amigos :D";
      this.amigos = this.loginService.listaAmigosInstancia; //de esta forma recibimos lista de amigos mediante el servicio
      if(this.amigos==undefined){ //el usuario dio F5 
        this.loginService.descargar_lista_amigos().subscribe( resp_descarga => {
              this.amigos = this.loginService.listaAmigosInstancia; 
              if(this.amigos.length==0){ //el usuario ya no tiene amigos (al momento de descargar)
                this.tituloCabecera = "Este usuario no tiene amigos :(";
              }
        });
      }
      else if(this.amigos.length==0){//el usuario ya no tiene amigos
          this.tituloCabecera = "Este usuario no tiene amigos :(";
        
      }
      else{ //el usuario inicio sesión correctamente
        swal("Iniciaste sesión correctamente", "¡Felicidades!", "success");
      }
  }

}

import { Component, OnInit } from '@angular/core';
import { LoginService} from "../../services-injectables/service-login"
import { ServiceBloquearNavAtrasService } from 'src/app/services-injectables/service-bloquear-nav-atras.service';

declare let swal: any; //para que el compilador de angular no se esté quejando de que no existe este metodo...
declare let $: any; //pata uso de jquery para mostar modal

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.component.html',
  styleUrls: ['./amigos.component.scss'],
  
})
export class AmigosComponent implements OnInit {
  amigos:any[];
  tituloCabecera:string; 
  tituloCabeceraModal:string;
  banderaFormularioAlta:boolean;

  constructor(public loginService : LoginService,
    public bloqueoServicio: ServiceBloquearNavAtrasService) { 
  }

  ngOnInit(): void { //se activa cada que el usuario entra al componente
      this.bloqueoServicio.bloquearAtras();
      this.tituloCabecera = "Lista de amigos :D";
      this.amigos = this.loginService.listaAmigosInstancia; //de esta forma recibimos lista de amigos mediante el servicio
      if(this.amigos==undefined){ //el usuario dio F5 
        this.descarga_amigos();
      }
      else if(this.amigos.length==0){//el usuario ya no tiene amigos
          this.tituloCabecera = "Este usuario no tiene amigos :(";
        
      }
      else{ //el usuario inicio sesión correctamente
        swal("Iniciaste sesión correctamente", "¡Felicidades!", "success");
      }
  }

  descarga_amigos() : void{
    this.loginService.descargar_lista_amigos().subscribe( resp_descarga => {
      this.amigos = this.loginService.listaAmigosInstancia; 
      if(this.amigos.length==0){ //el usuario ya no tiene amigos (al momento de descargar)
        this.tituloCabecera = "Este usuario no tiene amigos :(";
      }
    });
  }

  mostrar_formulario_alta() : void{
    this.banderaFormularioAlta = true;
    this.tituloCabeceraModal="Formulario nuevo amigo";
    $("#modalFormulario").modal("show");
  }
  mostrar_formulario_edicion(username:string) : void{
    this.banderaFormularioAlta = false;
    this.tituloCabeceraModal=`Edición usuario amigo: ${username}`;
    $("#modalFormulario").modal("show");
  }

  usuario_finalizo_formulario(mensaje) : void{
    if(this.banderaFormularioAlta){
      swal("Nuevo agregado", "Haz agregado a tu amigo de forma exitosa", "success");
      this.descarga_amigos();
      $("#modalFormulario").modal("hide");
    }
    else{
      swal("Amigo editado", "Haz editado la información del usuario amigo de forma exitosa", "success");
      this.descarga_amigos();
      $("#modalFormulario").modal("hide");
    }
  }
}

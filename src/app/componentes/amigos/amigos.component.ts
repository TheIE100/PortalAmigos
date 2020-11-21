import { Component, OnInit } from '@angular/core';
import { Amigo, LoginService} from "../../services-injectables/service-login"
import { ServiceBloquearNavAtrasService } from 'src/app/services-injectables/service-bloquear-nav-atras.service';
import { AmigoModel } from 'src/app/models/amigoModel';
import { FormularioAmigosService } from 'src/app/services-injectables/formulario-amigos.service';
import Swal from 'sweetalert2';

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


  
  //contenido para el campo del formulario
  esqueleto_amigo : AmigoModel = new AmigoModel();


  constructor(public loginService : LoginService,
    public bloqueoServicio: ServiceBloquearNavAtrasService,
    public formularioAmigoService : FormularioAmigosService) { 
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
    this.esqueleto_amigo.nombre  =  "";
    this.esqueleto_amigo.ligaTwitch = "";
    this.esqueleto_amigo.imagen = "";
    this.esqueleto_amigo.idAmigo  =  "";
    $("#modalFormulario").modal("show");
  }
  mostrar_formulario_edicion( amigo:Amigo) : void{
    this.banderaFormularioAlta = false;
    this.tituloCabeceraModal=`Edición usuario amigo: ${amigo.Nombre}`;
    this.esqueleto_amigo.nombre  =  amigo.Nombre;
    this.esqueleto_amigo.ligaTwitch = amigo.LigaTwitch;
    this.esqueleto_amigo.imagen= amigo.Imagen;
    this.esqueleto_amigo.idAmigo  =  amigo.Nombre;
    console.log(`Esqueleto amigo: ${JSON.stringify(this.esqueleto_amigo)}`);
    $("#modalFormulario").modal("show");
  }

  usuario_finalizo_formulario(mensaje) : void{
    Swal.close();
    if(this.banderaFormularioAlta){
      swal("Nuevo amigo agregado", "Haz agregado a tu amigo de forma exitosa", "success");
      this.descarga_amigos();
      $("#modalFormulario").modal("hide");
    }
    else{
      swal("Amigo editado", "Haz editado la información del usuario amigo de forma exitosa", "success");
      this.descarga_amigos();
      $("#modalFormulario").modal("hide");
    }
  }

  borrar_amigo(userId : string) : void{
    console.log("BORRAR AMIGO ACTIVADO!!!!");
    this.formularioAmigoService.borrarAmigo(userId).subscribe( r => {
      console.log("Respuesta del servicio de borrar amigo: "+this.formularioAmigoService.responseServer);
      if(this.formularioAmigoService.responseServer.Estatus==200){
        swal("Amigo eliminado", "Haz eliminado a tu amigo de forma exitosa", "success");
        this.descarga_amigos();
      }
      else{
        console.log('Servidor respondio con error :v');
        this.mensaje_swal_y_habilitar_boton("Atención",
        "Hubo un error en la comunicación con el servidor, favor de intentarlo más tarde.",
        "error",
        "Ok");
      }
    }, 
    (errorSever) => {
        console.log('Servidor respondio con error :v');
        console.log(errorSever);
        this.mensaje_swal_y_habilitar_boton("Atención",
        "Hubo un error en la comunicación con el servidor, favor de intentarlo más tarde.",
        "error",
        "Ok");
    });
  }



  mensaje_swal_y_habilitar_boton(titulo,mensaje,tipoMensaje,mensajeBoton){
    Swal.close();
    swal({
      title: titulo,
      text: mensaje,
      type: tipoMensaje,
      showCancelButton: false,
      confirmButtonClass: "btn-primary",
      confirmButtonText: mensajeBoton,
      closeOnConfirm: true,
      closeOnClickOutside: false
    }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { LoginService} from "../../services-injectables/service-login"
import { Router } from '@angular/router';
import { ServiceBloquearNavAtrasService } from 'src/app/services-injectables/service-bloquear-nav-atras.service';
import Swal from 'sweetalert2';

declare let swal: any; //para que el compilador de angular no se esté quejando de que no existe este metodo...
declare var jQuery:any; //para indicarle a angular que utilizaré jQuery..



@Component({//decorador
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit { //clase componente que puede ser exportada
  //al archivo app.modulte.ts y
  // hereda de onInit (importante para el ciclo de vida)
  texto_bienvenida:string = "¡Bienvenido al portal de amigos!";
  se_obtuvo_amigos:boolean;
  peticion_activa:boolean;

  usuarioMaster:string = "i_Emmanuel";
  passMaster:string = "twitch123.";

  constructor(private router:Router, //router lo recibes definiendolo en app.routes.ts...
    public loginService : LoginService,
    public bloqueoServicio: ServiceBloquearNavAtrasService) {
      this.se_obtuvo_amigos = false;
      this.peticion_activa = false;;
     }

  ngOnInit(): void {
    this.bloqueoServicio.bloquearAtras();
  
  }
  iniciarSesion(usuario:string, 
    password:string, 
    $event: MouseEvent)
  { //este se activa cuando el usuario presiona el boton "login".
    console.log(this.peticion_activa);
    if(!this.peticion_activa){
      ($event.target as HTMLButtonElement).disabled = true;  //deshabilitar boton para evitar que el usuario haga muchas peticiones...
      this.peticion_activa = true;
      console.log(usuario,password);
      if(usuario.trim()=="" || password.trim()=="" ){
        this.mensaje_swal_y_habilitar_boton("Atención",
        "Se requiere que mandes usuario y contraseña, favor de intentarlo nuevamente",
        "warning",
        "Ok, lo intentaré de nuevo",
        $event);
      }
      else{
        Swal.fire({
          title: 'Espere un momento..',
          html: '',
          allowOutsideClick: false,
          onBeforeOpen: () => {
              Swal.showLoading()
          },
        });

        this.loginService.login(usuario.trim(), password.trim()).subscribe( resp => {
        console.log(resp);
        //this.se_obtuvo_amigos = this.loginService.getListaDeAmigos(usuario,password);
        /*
        if(this.se_obtuvo_amigos){ 
          this.router.navigate(['/mostrarAmigos']); //la lista de amigos se va ver gracias al servicio LoginService que amigosComponent tambien consume n_n
              Swal.close();
        }
        */
        }, 
        (errorSever) => {
            console.log('Servidor respondio con error :v');
            console.log(errorSever);
            var json_error = errorSever.error;
            if(json_error.error=="ContraseniaCorreoInvalido"){
              this.mensaje_swal_y_habilitar_boton("Usuario/contraseña no válida",
              "Error al autenticar, favor de intentar nuevamente",
              "error",
              "Ok, lo intentaré de nuevo",
              $event);
            }
            else{
              this.mensaje_swal_y_habilitar_boton("Atención",
              "Hubo un error en la comunicación con el servidor, favor de intentarlo más tarde.",
              "error",
              "Ok",
              $event);
            }
        });
      }  
    }
  }
  mensaje_swal_y_habilitar_boton(titulo,mensaje,tipoMensaje,mensajeBoton, botonInicioSesion){
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
    (botonInicioSesion.target as HTMLButtonElement).disabled = false; //habilita de nuevo el boton
    this.peticion_activa = false;
  }
}
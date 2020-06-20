import { Component, OnInit } from '@angular/core';
import { LoginService} from "../../services-injectables/service-login"
import { Router } from '@angular/router';
import { ServiceLocalStorage } from 'src/app/services-injectables/service-Observador-LocalStorage';
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

  constructor(private router:Router, //router lo recibes definiendolo en app.routes.ts...
    public loginService : LoginService,
    public lsObservador : ServiceLocalStorage) {
      this.se_obtuvo_amigos = false;
      this.peticion_activa = false;
     }

  ngOnInit(): void {
  
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
        $event);
      }
      else{
        this.se_obtuvo_amigos = this.loginService.getListaDeAmigos(usuario,password);
        /*new Promise( (resolve, reject) => {
          this.loginService.getListaDeAmigos(usuario,password).subscribe(  //suscribe se utiliza para peticiones a servidor, si fuera un servicio generico no es necesario (para algun calculo o algo)
            plataformas => {
            console.log(plataformas);
            resolve(plataformas)
            }
          )
        })*/
        if(this.se_obtuvo_amigos){ 
          this.lsObservador.setSesionActiva("true");
                              //para evitar que le hagan back...(funciona en firefox)
                              window.history.pushState(null, "", window.location.href);
                              window.onpopstate = function () {
                                  window.history.pushState(null, "", window.location.href);
                              };
          this.router.navigate(['/mostrarAmigos']); //la lista de amigos se va ver gracias al servicio LoginService que amigosComponent tambien consume n_n
        }
        else{
          console.log(this.se_obtuvo_amigos);
          this.mensaje_swal_y_habilitar_boton("F",
          "No iniciaste sesión correctamente, favor de intentarlo nuevamente",
          "error",
          $event);  
        }
      }  

    }

  }
  mensaje_swal_y_habilitar_boton(titulo,mensaje,tipoMensaje, botonInicioSesion){
    swal({
      title: titulo,
      text: mensaje,
      type: tipoMensaje,
      showCancelButton: false,
      confirmButtonClass: "btn-primary",
      confirmButtonText: "Ok, lo intentaré de nuevo",
      closeOnConfirm: true,
      closeOnClickOutside: false
    }
    );
    (botonInicioSesion.target as HTMLButtonElement).disabled = false; //habilita de nuevo el boton
    this.peticion_activa = false;
  }
}
import { Component, OnInit } from '@angular/core';
import { LoginService} from "../../services-injectables/service-login"
import { Router } from '@angular/router';
declare let swal: any; //para que el compilador de angular no se esté quejando de que no existe este metodo...

@Component({//decorador
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit { //clase componente que puede ser exportada
  //al archivo app.modulte.ts y
  // hereda de onInit (importante para el ciclo de vida)
  texto_bienvenida:string = "¡Bienvenido al portal de amigos!";
  se_obtuvo_amigos:any;

  constructor(private router:Router, //router lo recibes definiendolo en app.routes.ts...
    public loginService : LoginService) { }

  ngOnInit(): void {
  }

  iniciarSesion(usuario:string, password:string){ //este se activa cuando el usuario presiona el boton "login".
  console.log(usuario,password);
  if(usuario.trim()=="" || password.trim()=="" ){
    swal("Atención","Se requiere que mandes usuario y contraseña, favor de intentarlo nuevamente","warning");

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
      this.router.navigate(['/mostrarAmigos']); //la lista de amigos se va ver gracias al servicio LoginService que amigosComponent tambien consume n_n
    }
    else{
      console.log(this.se_obtuvo_amigos);
      swal("F","No iniciaste sesión correctamente, favor de intentarlo nuevamente","info");
    }
  }

  
}

}

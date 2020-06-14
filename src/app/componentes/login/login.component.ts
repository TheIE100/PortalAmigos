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
  listaAmigosAsincrono:any;


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
    this.listaAmigosAsincrono = this.loginService.getListaDeAmigos(usuario,password);
    /*new Promise( (resolve, reject) => {
      this.loginService.getListaDeAmigos(usuario,password).subscribe(  //suscribe se utiliza para peticiones a servidor, si fuera un servicio generico no es necesario (para algun calculo o algo)
        plataformas => {
        console.log(plataformas);
        resolve(plataformas)
        }
      )
    })*/

    if(this.listaAmigosAsincrono[0].nombre != "efe_no_pudiste_iniciar_sesion_huehuehue_401"){ 

      this.router.navigate(['/mostrarAmigos']); //aqui es como usar el routerlink (te redirecciona) (r)     
    }
    else{
      console.log(this.listaAmigosAsincrono);
      swal("F","No iniciaste sesión correctamente, favor de intentarlo nuevamente","info");
    }

    /*this.router.params.subscribe(params => {
      this.respuestaLogin = this.loginService.getListaDeAmigos(usuario,password);
      if(this.respuestaLogin){
        alert("Inicio de sesión exitoso");          
      }
      else{
        alert("F: No iniciaste sesión correctamente");
      }
      console.log(this.respuestaLogin);
    })*/
  }

  
}

}

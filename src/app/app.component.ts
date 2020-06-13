import { Component, OnInit } from '@angular/core';
import { LoginService} from "./services-injectables/service-login"

@Component({ //decorador
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit{ //clase componente que puede ser exportada
                                              //al archivo app.modulte.ts y
                                              // hereda de onInit (importante para el ciclo de vida)
   texto_bienvenida:string = "¡Bienvenido al portal de amigos!";
   respuestaLogin:any;

   constructor(public loginService : LoginService) {

   }

  
    ngOnInit(){ 
    }

    iniciarSesion(usuario:string, password:string){ //este se activa cuando el usuario presiona el boton "login".
      console.log(usuario,password);
      this.respuestaLogin = this.loginService.getListaDeAmigos(usuario,password);
      if(this.respuestaLogin){
        alert("Inicio de sesión exitoso");          
      }
      else{
        alert("F: No iniciaste sesión correctamente");
      }
      console.log(this.respuestaLogin);
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
      //this.router.navigate(['/resconsolas', palabras]); //aqui es como usar el routerlink (te redirecciona) (r)
      
    }



}

import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AmigoModel } from 'src/app/models/amigoModel';
import { FormularioAmigosService } from 'src/app/services-injectables/formulario-amigos.service';
import Swal from 'sweetalert2';

declare let swal: any; //para que el compilador de angular no se esté quejando de que no existe este metodo...

@Component({
  selector: 'app-formulario-amigos',//selector que usaran los componente padre para comonuicarse con este componente... 
  templateUrl: './formulario-amigos.component.html',
  styleUrls: ['./formulario-amigos.component.scss']
})
export class FormularioAmigosComponent implements OnInit {
    /*Variables para el formulario de creacion y edicion*/
    formAmigo: FormGroup; //esta variable almacena el esqueleto del formulario del modal y se enviara al back-end
    @Input()
    formulario_alta: boolean; 
    @Input()
    esqueleto_amigo : AmigoModel; //el esqueleto_amigo que envia originalmente con la info que se va editar o simplemente un esqueleto vacio al momento de agregar, NOTA: ESTE SE EDITA AUTOMATICAMENTE AL MOMENTO DE CAMBIAR VALORES EN FRONT Y QUEDA LISTO PARA SER ENVIADO AL WEB SERVICE..


    //variable recibida del componente padre que indicara el tipo de formulario: true: alta de amigo, false: edicion de amigo
    @Output()
    respuesta_componente_hijo:EventEmitter<string> = new EventEmitter<string>();//variable que le enviamos al padre para que haga ciertas acciones (esta clase componente es el hijo)


  constructor(private fb: FormBuilder,     
    public formularioAmigoService : FormularioAmigosService) { 
  }

  ngOnInit(): void { //ngOnInit se activa al momento de que el componente es llamado en el componente padre mediante HTML
    this.flujo_inicializar_formulario();
  }

  ngOnChanges() : void{ //ESTE SE INVOCA CUANDO HAY UN CAMBIO EN EL INPUT DEL MODAL
    this.flujo_inicializar_formulario();
  }


   flujo_inicializar_formulario(): void{
      //console.log(`**Se mostrará un formulario de alta: ${this.formulario_alta}`);
        console.log(`**AmigoTarjeta : ${this.esqueleto_amigo.nombre} ${this.esqueleto_amigo.imagen} ${this.esqueleto_amigo.ligaTwitch} ${this.esqueleto_amigo.idAmigo}`);

        this.inicializar_formulario();
   }

  inicializar_formulario() : void{
    this.formAmigo = this.fb.group({
      nombreAmigo : ['', [Validators.required, this.noWhitespaceValidator]],
      ligaTwitchAmigo : ['', [Validators.required, this.noWhitespaceValidator]],
      imagenAmigo : ['', [Validators.required, this.noWhitespaceValidator]],
      idAmigo : ['', []] //no requiero validacion porque idamigo puede ser vacio cuando agregas un usuario. al momento de editar un usaurio siempre va tener un valor..

    });

  }



  guardar( $event: MouseEvent) : void{
    //Primero se valida que los campos cumplan con las reglas de validacion establecidas.
    if(this.formAmigo.invalid){
      console.log("entro a formulario invalido"); 
      //se procede a marcar en rojo los campos que no fueron validos...
      return Object.values(this.formAmigo.controls).forEach( control => {
        if(control instanceof FormGroup){
          Object.values( control.controls ).forEach(control => control.markAsTouched());
        }
        else{
          control.markAsTouched();
        }
      });
    }
    else if(this.formulario_alta){ //formulario valido, se procede con el envio al web service
        console.log("Se procede a insertar un nuevo amigo " + JSON.stringify(this.esqueleto_amigo));
        Swal.fire({
          title: 'Espere un momento..',
          html: '',
          allowOutsideClick: false,
          onBeforeOpen: () => {
              Swal.showLoading()
          },
        });

        this.formularioAmigoService.insertar_amigo(this.esqueleto_amigo).subscribe( r => {
          console.log("Respuesta del servicio de insertar amigo: "+this.formularioAmigoService.responseServer);
          if(this.formularioAmigoService.responseServer.Estatus==200){
            this.respuesta_componente_hijo.emit("Se ha logrado insertar el amigo correctamente en base de datos"); //se comunica a componante padre
          }
          else if(this.formularioAmigoService.responseServer.Estatus==300){
            this.mensaje_swal_y_habilitar_boton("Atención",
            "El usuario ya se encuentra repetido, favor de usar otro nombre de amigo",
            "info",
            "Ok",
            $event);

          }
          else{
            console.log('Servidor respondio con error :v');
            this.mensaje_swal_y_habilitar_boton("Atención",
            "Hubo un error en la comunicación con el servidor, favor de intentarlo más tarde.",
            "error",
            "Ok",
            $event);
          }
        }, 
        (errorSever) => {
            console.log('Servidor respondio con error :v');
            console.log(errorSever);
            this.mensaje_swal_y_habilitar_boton("Atención",
            "Hubo un error en la comunicación con el servidor, favor de intentarlo más tarde.",
            "error",
            "Ok",
            $event);
        });

    }
    else{ //formulario valido pero es un formulario de edicion.
      console.log("Se procede a la edicion del usuario: " + JSON.stringify(this.esqueleto_amigo));
      Swal.fire({
        title: 'Espere un momento..',
        html: '',
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading()
        },
      });//
      this.formularioAmigoService.editar_amigo(this.esqueleto_amigo,this.esqueleto_amigo.idAmigo).subscribe( r => {
        console.log("Respuesta del servicio de editar amigo: "+this.formularioAmigoService.responseServer);
        if(this.formularioAmigoService.responseServer.Estatus==200){
          this.respuesta_componente_hijo.emit("Se ha logrado editar el amigo correctamente en base de datos"); //se comunica a componante padre
        }
        else if(this.formularioAmigoService.responseServer.Estatus==300){
          this.mensaje_swal_y_habilitar_boton("Atención",
          "El usuario ya se encuentra repetido, favor de usar otro nombre de amigo",
          "info",
          "Ok",
          $event);

        }
        else{
          console.log('Servidor respondio con error :v');
          this.mensaje_swal_y_habilitar_boton("Atención",
          "Hubo un error en la comunicación con el servidor, favor de intentarlo más tarde.",
          "error",
          "Ok",
          $event);
        }
      }, 
      (errorSever) => {
          console.log('Servidor respondio con error :v');
          console.log(errorSever);
          this.mensaje_swal_y_habilitar_boton("Atención",
          "Hubo un error en la comunicación con el servidor, favor de intentarlo más tarde.",
          "error",
          "Ok",
          $event);
      });
    }

  }

  //**Validadores del formulario**/
  get validar_campo_nombre(){
    var campo = this.formAmigo.get('nombreAmigo');
    return this.validar_campo_no_vacio(campo);
  }

  get validar_campo_liga_twitch(){
    var campo = this.formAmigo.get('ligaTwitchAmigo');
    return this.validar_campo_no_vacio(campo);
  }

  get validar_campo_imagen(){
    var campo = this.formAmigo.get('imagenAmigo');
    return this.validar_campo_no_vacio(campo);
  }

  
  validar_campo_no_vacio(campo){
    var valor = campo.value === undefined ? '' : campo.value.trim();
    return (campo.invalid && campo.touched) || (valor.length == 0 && campo.touched);
  }


  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  mensaje_swal_y_habilitar_boton(titulo,mensaje,tipoMensaje,mensajeBoton, botonGuardar){
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
    (botonGuardar.target as HTMLButtonElement).disabled = false; //habilita de nuevo el boton
  }

}

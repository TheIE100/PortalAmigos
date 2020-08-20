import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalVariables } from '../../../Global';

@Component({
  selector: 'app-formulario-amigos',//selector que usaran los componente padre para comonuicarse con este componente... 
  templateUrl: './formulario-amigos.component.html',
  styleUrls: ['./formulario-amigos.component.scss']
})
export class FormularioAmigosComponent implements OnInit {
  @Input()
  formulario_alta: boolean; 
  identificador_amigo: string;
  //variable recibida del componente padre que indicara el tipo de formulario: true: alta de amigo, false: edicion de amigo
  @Output()
  respuesta_componente_hijo:EventEmitter<string> = new EventEmitter<string>();//variable que le enviamos al padre para que haga ciertas acciones (esta clase componente es el hijo)


  constructor() { }

  ngOnInit(): void { //ngOnInit se activa al momento de que el componente es llamado en el componente padre mediante HTML
    console.log(`**Se mostrará un formulario de alta: ${this.formulario_alta}`);
  }
}

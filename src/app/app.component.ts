import { Component, OnInit } from '@angular/core';
@Component({ //decorador
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


//Primer componente que lee Angular n_n, es utilizado para cargar los selectores princiapales
export class AppComponent implements OnInit{ 
  
   constructor() {

   }

  
    ngOnInit(){ 
    }
}

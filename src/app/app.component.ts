import { Component, OnInit } from '@angular/core';
import { LoginService} from "./services-injectables/service-login"
import { Router } from '@angular/router';


@Component({ //decorador
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit{ 
  
   constructor() {

   }

  
    ngOnInit(){ 
    }
}

import { RouterModule, Routes } from '@angular/router';

//Se tienen que importar todas los componentes que vamos a utilizar

import { LoginComponent } from './componentes/login/login.component';
import { AmigosComponent} from './componentes/amigos/amigos.component';


const APP_ROUTES: Routes = [

  //Se inicializan todas las rutas que vamos a utilizar.  (importante definir etiqueta router-outlet)
  
  { path: 'login', component: LoginComponent },
  { path: 'mostrarAmigos', component: AmigosComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'login' }

];

//Se tiene que importar APP_ROUTING en el archivo app.module.ts como un import,
//y dentro del arreglo de imports[]
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);

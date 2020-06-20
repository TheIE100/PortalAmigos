import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ServiceLocalStorage } from 'src/app/services-injectables/service-Observador-LocalStorage';

@Injectable()
export class PrivilegesGuard implements CanActivate {

    constructor(private router: Router, public lsService : ServiceLocalStorage) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log("Verificando sesión activa, GUARDIA");
        if (this.lsService.getSesionActiva() == "true") {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }

}
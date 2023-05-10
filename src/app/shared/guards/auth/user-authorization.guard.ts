import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {ROLE} from "../../constants/roles.constants";

@Injectable({
  providedIn: 'root'
})
export class UserAuthorizationGuard implements CanDeactivate<unknown> {
  constructor(
    private router: Router
  ){}
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if(currentUser){
      return true;
    }
    this.router.navigate([''])
    return false
  }

}

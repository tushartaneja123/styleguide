import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let MakerId = ["1001", "2001", "3001"];
    let assignmentId = localStorage["assignmentID"];
    if ((MakerId.indexOf(assignmentId) >= 0) && (localStorage["isModifying"] != 'true')) {
      // alert("You are not authorised to view the Page .")
      // this.router.navigateByUrl('/Main');
      return true;
    }
    else {

      this.router.navigateByUrl('/Login')
      return false;
    }

  }

}

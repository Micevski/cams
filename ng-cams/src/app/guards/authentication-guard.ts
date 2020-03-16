import {Injectable, OnInit} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {UserService} from "../service/user.service";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivateChild, OnInit {

  constructor(private router: Router, private _userService: UserService) {
  }

  isAuthenticated: boolean = false;

  ngOnInit(): void {
    this._userService.getAuthentication()
      .subscribe(() => {
        console.log('authenticaed')
        this.isAuthenticated = true
        },
        () => this.isAuthenticated = false);
  }

  /**
   * Check if the user is logged in before calling http
   *
   * @param route
   * @param state
   * @returns {boolean}
   */
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean> | Promise<boolean> | boolean {
    return this._userService.getAuthentication().pipe(
      map(e => {
        if (e) {
          return true;
        }
      }),
      catchError((err) => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );

  }
}

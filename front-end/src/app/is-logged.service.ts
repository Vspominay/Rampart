import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedService implements CanActivate{

  constructor(private router: Router,
    private authService:AuthService) { }

    canActivate(){
        return this.authService.isLoggedIn()
        .then(
            token => {
                return token ? true : (this.router.navigate(['auth']), false)
            }
        );
  }
}

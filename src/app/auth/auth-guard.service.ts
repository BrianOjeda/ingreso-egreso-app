import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public route:Router,public authService:AuthService) { }


  canActivate(){
    
    
    return this.authService.isAuth()
    
  }

}

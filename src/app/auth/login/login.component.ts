import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit,OnDestroy {

  subscripcion:Subscription;
  cargando:boolean;
  constructor(public store:Store<AppState>, public authService:AuthService) { }

  ngOnInit() {

    this.subscripcion=this.store.select('ui').subscribe(ui=>this.cargando=ui.isLoading);
  }
  ngOnDestroy(){

    this.subscripcion.unsubscribe();
  }
  login(data){
    
    this.authService.login(data.email,data.pass);

  }
}

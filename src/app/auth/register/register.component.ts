import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit,OnDestroy {
  
  subscripcion:Subscription;
  cargando:boolean;
  
  constructor(public store:Store<AppState>,public authService:AuthService) {

   }

  ngOnInit() {
    this.subscripcion=this.store.select('ui').subscribe(ui=>this.cargando=ui.isLoading);
  }

  ngOnDestroy(){

    this.subscripcion.unsubscribe();
  }

  onSubmit(data){
  
      console.log(data);
      this.authService.crearUsuario(data.nombre,data.email,data.pass);

  }
}

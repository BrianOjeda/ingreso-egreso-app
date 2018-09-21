import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction,DesactivarLoadingAction } from '../shared/ui.accions';
import { SetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';


@Injectable()

export class AuthService {
  
  public userSubscription:Subscription=new Subscription();

  constructor(public store:Store<AppState>,public afdb:AngularFirestore,public afAuth: AngularFireAuth,public route:Router) { }

  crearUsuario(nombre,email,pass){
    
    this.store.dispatch(new ActivarLoadingAction());

    this.afAuth.auth.createUserWithEmailAndPassword(email,pass)
    .then(resp=>{

          const user:User={
            uid:resp.user.uid,
            nombre:nombre,
            email:email
          };
          
          this.afdb.doc(`${ user.uid}/usuario`)
          .set(user)
         .then(()=>{
            this.route.navigate(['/']);
            this.store.dispatch(new DesactivarLoadingAction());
          });

    })
    .catch(error=>{
      this.store.dispatch(new DesactivarLoadingAction());
      console.error(error);
    })
  }

  login(email,pass){
    
    this.store.dispatch(new ActivarLoadingAction());

    this.afAuth.auth.signInWithEmailAndPassword(email,pass)
    .then(data=>{
      this.route.navigate(['/']);
      this.store.dispatch(new DesactivarLoadingAction());
    })
    .catch(error=>{
      this.store.dispatch(new DesactivarLoadingAction());
      console.error(error);
    })
  }

 logout(){
    
    this.route.navigate(['/login']);
    this.afAuth.auth.signOut();

 }

 initAuthListener(){//escucha cambios del usuario
  this.userSubscription= this.afAuth.authState.subscribe((fUser:firebase.User)=>{
    //console.log(fUser);
    if(fUser){
        this.afdb.doc(`${fUser.uid}/usuario`).valueChanges()
        .subscribe((usuarioObj:any)=>{
            
            const newUser=new User(usuarioObj);
            this.store.dispatch(new SetUserAction(newUser));
            console.log(newUser);
        })
    }else{

        this.userSubscription.unsubscribe();
    }
  })

 }

 isAuth(){//escucha cambios del usuario
  
  return this.afAuth.authState.pipe(
    map(fbUser=>{
      
      if(fbUser==null){
        this.route.navigate(['/login']);
      }
      return fbUser!=null
    })
  );

 }

}

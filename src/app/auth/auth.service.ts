import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable()

export class AuthService {

  constructor(public afdb:AngularFirestore,public afAuth: AngularFireAuth,public route:Router) { }

  crearUsuario(nombre,email,pass){

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
    
          });

    })
    .catch(error=>{
      console.error(error);
    })
  }

  login(email,pass){
    
    this.afAuth.auth.signInWithEmailAndPassword(email,pass)
    .then(data=>{
      this.route.navigate(['/']);
    })
    .catch(error=>{
      console.error(error);
    })
  }

 logout(){
    
    this.route.navigate(['/login']);
    this.afAuth.auth.signOut();

 }

 initAuthListener(){//escucha cambios del usuario
  this.afAuth.authState.subscribe((fUser:firebase.User)=>{
    console.log(fUser);
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

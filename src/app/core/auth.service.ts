import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';


@Injectable()
export class AuthService {

  errorCode = '';
  errorMessage = '';
  successMessage = '';

  constructor(
   public afAuth: AngularFireAuth
 ){}

  doFacebookLogin(){
    return new Promise((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  doTwitterLogin(){
    return new Promise((resolve, reject) => {
      let provider = new firebase.auth.TwitterAuthProvider();
      this.afAuth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  doGoogleLogin(){
    return new Promise((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  doRegister(value: any){
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogin(value:any){
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogout(){
    return new Promise<void>((resolve, reject) => {
      if(firebase.auth().currentUser){
        this.afAuth.signOut();
        resolve();
      }
      else{
        reject();
      }
    });
  }


  async forgotPassword() {
    let result = '';
    await firebase.auth().sendPasswordResetEmail("")
        .then(() => {
          alert('Verifique sua caixa de e-mail.')
          result = 'Verifique sua caixa de e-mail.'
            //navigator.navigate('tipoLogin')
        })
    .catch((error) => {
        this.errorCode = error.code;
        result = error.message;
         console.log(this.errorCode);
         console.log(this.errorMessage);
    });
    return result
}
}

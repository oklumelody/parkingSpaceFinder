import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Plugins } from '@capacitor/core'

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy{

 private _user = new BehaviorSubject<User>(null);
 private activeLogoutTimer: any;

  constructor(private http: HttpClient) { }

  signup(email, password){
    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBH2EwcMrhydxiw9z2NE7u92EiqAxZQ-Rg', {email: email, password: password, returnSecureToken: true})
    .pipe(tap(this.setUserData.bind(this)));
  }

  login(email, password) {
    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBH2EwcMrhydxiw9z2NE7u92EiqAxZQ-Rg', {email: email, password: password, returnSecureToken: true})
    .pipe(tap(this.setUserData.bind(this)));
  }

  logout() {
    if(this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this._user.next(null);
    Plugins.Storage.remove({key: 'authData'});
  }

  private setUserData(userData){
    const expirationTime = new Date(
      new Date().getTime() + +userData.expiresIn * 1000
    );
    let user = new User(userData.localId, userData.email, userData.idToken, expirationTime)
    this._user.next(user);
    console.log(user.tokenDuration);
    this.autoLogout(user.tokenDuration);
    this.storeAuthData(userData.localId, userData.idToken, expirationTime.toISOString(), userData.email);
  }

  private storeAuthData(userId: string, token: string, tokenExpirationDate: string, email: string){
    const data = JSON.stringify({
      userId: userId,
      token: token,
      tokenExpirationDate: tokenExpirationDate,
      email: email
    });
    Plugins.Storage.set({key: 'authData', value: data });
  }

  private autoLogout(duration: number) {
    if(this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this.activeLogoutTimer = setTimeout(() => {
      this.logout();
    }, duration)
  }


  autoLogin(){
   return from(Plugins.Storage.get({key: 'authData'})).pipe(map(storedData => {
     if(!storedData || !storedData.value){
       return null;
     }
     const Data = JSON.parse(storedData.value) as {token: string; tokenExperationDate: string; userId: string; email: string};
     const experationTime = new Date(Data.tokenExperationDate);
     if (experationTime <= new Date()){
       return null;
     }
     const user = new User(Data.userId, Data.email, Data.token, experationTime);
     return user;
   }), 
   tap(user => {
     if(user) {
       this._user.next(user);
       this.autoLogout(user.tokenDuration);
     }}
   ),
   map(user => {
     return !!user;
   })
   );
  }

  get userisAuth (){
    return this._user.asObservable().pipe(map(user => {
      if(user) {
       return !!user.token
      } else {
        return false;
      }
    }));
  }

  get userId (){
    return this._user.asObservable().pipe(map(user => {
      if(user) {
       return user.id
      } else {
        return null
      }

    }));
  }

  ngOnDestroy(){
    if(this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
  }
}

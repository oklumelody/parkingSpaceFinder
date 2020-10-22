import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userisAuth = true;
  private _userId = 'abc';

  constructor() { }

  login() {
    this._userisAuth = true;
  }

  logout() {
    this._userisAuth = false;
  }

  get userisAuth (){
    return this._userisAuth;
  }

  get userId (){
    return this._userId
  }
}

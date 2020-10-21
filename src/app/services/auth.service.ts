import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userisAuth = false;

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
}

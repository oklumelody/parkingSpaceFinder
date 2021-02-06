import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

import * as firebase from 'firebase';

// import * as firebase from 'firebase/app';


// import { registerWebPlugin } from '@capacitor/core';
// import { FacebookLogin } from '@capacitor-community/facebook-login';
// registerWebPlugin(FacebookLogin);

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isLoading = false;
  isLogin = true;

  // otpSent: boolean = false;
  // phoneNumber = null;
  // otp = null;
  // recaptchaVerifier;
  // confirmationResult;
  // user;


  // otpSent: boolean = false;
  // recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  // otpconfirmationResult: firebase.auth.ConfirmationResult;
  // phoneNumber:string = "";
  // confirmationResult;

  constructor(private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    // this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

    // this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
    //   'size': 'invisible'
    //   });
  }

  codeNumber(e){
    // console.log(e);
  }


  // sendOtp(){
  //   console.log('+355' + this.phoneNumber);
  //   firebase.auth().signInWithPhoneNumber('+' + this.phoneNumber, this.recaptchaVerifier)
  //   .then((confirmationResult) => {
  //   // SMS sent. Prompt user to type the code from the message, then sign the
  //   // user in with confirmationResult.confirm(code).
  //   this.confirmationResult = confirmationResult;
  //   console.log(this.confirmationResult);
  //   this.otpSent = true;
  //   }).catch(err => {
  //   console.log(err)
  //   })
  // }


  // signIn(){
  //   this.confirmationResult.confirm(this.otp).then(user=>{
  //     this.user = user;
  //     console.log(user);
  //     })
  // }

  // signIn(phoneNumber: number){
  //   const appVerifier = this.recaptchaVerifier;
  //   const phoneNumberString = "+" + phoneNumber;
  //   firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
  //     .then( async (confirmationResult) => {
  //       // SMS sent. Prompt user to type the code from the message, then sign the
  //       // user in with confirmationResult.confirm(code).
  //       let prompt = await this.alertCtrl.create({
  //       inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
  //       buttons: [
  //         { text: 'Cancel',
  //           handler: data => { console.log('Cancel clicked'); }
  //         },
  //         { text: 'Send',
  //           handler: data => {
  //             confirmationResult.confirm(data.confirmationCode)
  //             .then(function (result) {
  //               // User signed in successfully.
  //               console.log(result.user);
  //               // ...
  //             }).catch(function (error) {
  //               // User couldn't sign in (bad verification code?)
  //               // ...
  //             });
  //           }
  //         }
  //       ]
  //     });
  //     await prompt.present();
  //   })
  //   .catch(function (error) {
  //     console.error("SMS not sent", error);
  //   });
  
  // }

  // async facebookLogin(){
  //   const FACEBOOK_PERMISSIONS = ['email', 'user_birthday', 'user_photos', 'user_gender'];
  //   const result = await FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });
    
  //   if (result.accessToken) {
  //     console.log(result);
  //     // Login successful.
  //     console.log(`Facebook access token is ${result.accessToken.token}`);
  //   } else{

  //   }
  // }

  auth(email, password) {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<any>;
        if (this.isLogin){
          authObs = this.authService.login(email, password);
        }else {
          authObs = this.authService.signup(email, password)
        }
        authObs.subscribe(response => {
          // console.log(response);
          this.isLoading = false;
          loadingEl.dismiss();
          this.router.navigateByUrl('/verify');
        }, error => {
          loadingEl.dismiss();
          let code = error.error.error.message;
          let message = 'Somthing went Wrong';
          if(code === 'EMAIL_EXISTS') {
            message = 'This email already exists';
          }else if(code === 'EMAIL_NOT_FOUND') {
            message = 'Email not found';
          }else if(code === 'INVALID_PASSWORD'){
            message = 'This password is not correct';
          }
          this.showAlert(message);
        });
      });
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form?.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    console.log(email, password);

    this.auth(email, password);
    form.reset();
  }

  showAlert(message){
    this.alertCtrl.create({
      header: 'Authentication failed',
      message: message,
      buttons: ['Okay']
    }).then(alertEl =>{
      alertEl.present();
    });
  }

}

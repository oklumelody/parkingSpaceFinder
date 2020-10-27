import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

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

  constructor(private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
  }

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
          this.router.navigateByUrl('/places/tabs/discover');
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

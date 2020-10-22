import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Plugins, Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  dark = false;

  constructor(
    private platform: Platform,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeApp();
    const prefersColor = window.matchMedia('(prefers-color-scheme: light)');
    this.dark = prefersColor.matches;
    this.updateDarkMode();
    console.log(this.dark);
    prefersColor.addEventListener(
      'change',
      mediaQuery => {
        this.dark = mediaQuery.matches;
        this.updateDarkMode();
      }
    );
  }

  updateDarkMode() {
    document.body.classList.toggle('dark', this.dark);
  }

  initializeApp() {
    this.platform.ready().then(() => {
     if(Capacitor.isPluginAvailable('SplashScreen')) {
       Plugins.SplashScreen.hide();
     }
    });
  }

  onLogout(){
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}

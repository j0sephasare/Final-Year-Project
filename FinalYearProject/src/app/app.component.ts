// Import Capacitor's App object
import { App } from '@capacitor/app';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Handle the logic for when the app is opened with a deep link
      App.addListener('appUrlOpen', (event: { url: string }) => {
        // Example URL: com.FinalYearProject.app://callback?code=123
        const url = new URL(event.url);
        const pathname = url.pathname;
        // Assuming you have a route in your Angular app that corresponds
        // to the path in the deep link, navigate to it
        this.router.navigateByUrl(pathname);
      });
    });
  }
}

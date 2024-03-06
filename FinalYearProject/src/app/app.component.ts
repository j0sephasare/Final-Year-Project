// Import Capacitor's App object and Auth0 AuthService
import { App } from '@capacitor/app';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular'; // Import AuthService

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private router: Router,
    private auth: AuthService // Inject AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Handle deep links
      App.addListener('appUrlOpen', (event: { url: string }) => {
        const url = new URL(event.url);
        // Instead of directly navigating, check the authentication state
        this.checkAuthenticationState();
      });
    });
  }

  checkAuthenticationState() {
    // Check if user is authenticated
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        // Navigate to the home page if authenticated
        this.router.navigate(['/home']);
      } else {
        // Navigate to login if not authenticated
        this.router.navigate(['/login']);
      }
    });
  }
}

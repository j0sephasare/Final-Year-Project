import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private router: Router, public auth: AuthService) {}

  ngOnInit() {
    // Subscribe to authentication state changes
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        // If authenticated, navigate to the home page
        this.router.navigate(['/home']);
      }
    });
  }

  onLogin() {
    // Handle your login logic here, if needed
  }

  // Function to navigate to the registration page
  goToRegistrationPage() {
    this.router.navigate(['/registration']);
  }

  manualNavigateToHome() {
    this.router.navigate(['/home']);
  }
}

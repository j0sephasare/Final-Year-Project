import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Import the Router module

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.http.post('http://localhost:4000/login', { email: this.email, password: this.password })
      .subscribe(response => {
        console.log('Login success', response);
        this.router.navigate(['/home']);
      }, error => {
        console.error('Login error', error);
      });
  }

  // Function to navigate to the registration page
  goToRegistrationPage() {
    this.router.navigate(['/registration']);
  }
}

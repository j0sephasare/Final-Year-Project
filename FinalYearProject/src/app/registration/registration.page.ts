import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: 'registration.page.html',
  styleUrls: ['registration.page.scss']
})
export class RegistrationPage {
  username: string = ''; // Initialize the property
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  onRegister() {
    this.http.post('http://localhost:4000/register', { email: this.email, password: this.password, username: this.username })
      .subscribe(response => {
        console.log('Registration success', response);
        // Handle navigation or display a success message.
      }, error => {
        console.error('Registration error', error);
        // Handle errors, e.g., display an error message.
      });
  }
}

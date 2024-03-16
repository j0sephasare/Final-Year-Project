import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userProfile: any;
  constructor( private router: Router,private authService: AuthService) { }

  ngOnInit() {
    
  }
/*
  logout() {
    this.auth.logout({ returnTo: `${window.location.origin}/login` } as LogoutOptions);
  }
  */
  openSavedExerciseList() {
    this.router.navigate(['/saved-exercises']);
    console.log('Button clicked!');
  }
  FindLocalGyms() {
    this.router.navigate(['/local-gyms']);
    console.log('Button clicked!');
  }

  MacroCounter() {
    this.router.navigate(['/macroCounter']);
    console.log('Button clicked!');
  }
  logout() {
    this.authService.logout(); // Call your auth service logout method
    this.router.navigateByUrl('/login'); // Navigate to login or another appropriate page
  }
}

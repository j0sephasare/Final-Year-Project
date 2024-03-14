import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userProfile: any;
  constructor( private router: Router) { }

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
}

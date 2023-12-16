import { Component, OnInit } from '@angular/core';
import { AuthService, LogoutOptions } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userProfile: any;
  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth.user$.subscribe(
      (profile) => (this.userProfile = profile)
    );
  }

  logout() {
    this.auth.logout({ returnTo: `${window.location.origin}/login` } as LogoutOptions);
  }
  openSavedExerciseList() {
    this.router.navigate(['/saved-exercises']);
    console.log('Button clicked!');
  }
  FindLocalGyms() {
    this.router.navigate(['/local-gyms']);
    console.log('Button clicked!');
  }
}

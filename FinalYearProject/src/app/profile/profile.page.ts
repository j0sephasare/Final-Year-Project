import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userProfile: any;
  imageFile: File | null = null;
  newUsername: string = ''; 
  
  constructor( private router: Router,private authService: AuthService,  ) { }

  ngOnInit() {
    this.authService.getCurrentUser().pipe(
      switchMap(user => {
        if (user) {
          return this.authService.getUserProfile(user.uid);
        } else {
          throw new Error("No user data found!");
        }
      })
    ).subscribe(profile => {
      if (profile && !profile.uid) {
        console.error("UserProfile loaded without UID:", profile);
      }
      this.userProfile = profile;
      console.log("UserProfile loaded:", this.userProfile);
    }, error => {
      console.error("Error loading user data:", error);
    });
    
    
  }

  handleFileInput(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.imageFile = fileList[0];
    }
  }
  loadUserProfile() {
    const userId = this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.authService.getUserProfile(user.uid).subscribe(profile => {
          this.userProfile = profile;
        });
      } else {
        console.error("No user data found!");
      }
    }, error => {
      console.error("Error loading user data:", error);
    });
  }
  updateUsername(newUsername: string) {
    console.log('Attempting to update username with:', newUsername);
    console.log('Current userProfile:', this.userProfile);
  
    if (!this.userProfile) {
      console.error('UserProfile is not loaded');
      return;
    }
  
    if (!this.userProfile.uid) {
      console.error('User ID is missing in the userProfile object');
      return;
    }
  
    this.authService.updateUsername(this.userProfile.uid, newUsername)
      .then(() => {
        console.log('Username updated successfully');
        this.userProfile.username = newUsername;  // Update the local userProfile object
      })
      .catch((error) => {
        console.error('Error updating username:', error);
      });
  }
  uploadProfilePicture() {
    if (!this.userProfile) {
      console.error('UserProfile is not set. Cannot upload image.');
      return;
    }
  
    if (!this.imageFile) {
      console.error('ImageFile is not set. Cannot upload image.');
      return;
    }
  
    // Ensure you have the correct userId
    const userId = this.userProfile.uid;
    if (!userId) {
      console.error('UserID is undefined. Cannot upload image.');
      return;
    }
  
    console.log(`Uploading profile picture for user: ${userId}`);
    this.authService.uploadProfilePicture(this.imageFile, userId)
      .subscribe(downloadURL => {
        if (downloadURL) {
          this.authService.saveProfilePicture(userId, downloadURL)
            .then(() => console.log('Profile picture updated'))
            .catch(error => console.error('Error saving profile picture', error));
        } else {
          console.error('Failed to get download URL');
        }
      }, error => {
        
        console.error('Error uploading profile picture', error);
      });
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

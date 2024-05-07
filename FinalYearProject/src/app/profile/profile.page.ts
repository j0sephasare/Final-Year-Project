import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Import authentication service
import { switchMap } from 'rxjs/operators'; // Import switchMap operator
import { of } from 'rxjs'; // Import observable creation function

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userProfile: any; // Object to store user profile data
  imageFile: File | null = null; // Variable to store uploaded image file
  newUsername: string = ''; // Variable to store new username input

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    // Fetch user profile data when the component initializes
    this.authService.getCurrentUser().pipe(
      switchMap(user => {
        if (user) {
          return this.authService.getUserProfile(user.uid); // Fetch user profile based on user ID
        } else {
          throw new Error("No user data found!"); // Throw an error if no user is found
        }
      })
    ).subscribe(profile => {
      if (profile && !profile.uid) {
        console.error("UserProfile loaded without UID:", profile); // Log an error if the user profile doesn't contain a UID
      }
      this.userProfile = profile; // Store the user profile data
      console.log("UserProfile loaded:", this.userProfile); // Log the loaded user profile data
    }, error => {
      console.error("Error loading user data:", error); // Log an error if there's an issue loading user data
    });
  }

  // Function to handle file input for uploading profile picture
  handleFileInput(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.imageFile = fileList[0]; // Store the selected image file
    }
  }

  // Function to update user's username
  updateUsername(newUsername: string) {
    console.log('Attempting to update username with:', newUsername);
    console.log('Current userProfile:', this.userProfile);

    // Check if user profile is loaded and contains a UID
    if (!this.userProfile) {
      console.error('UserProfile is not loaded');
      return;
    }

    if (!this.userProfile.uid) {
      console.error('User ID is missing in the userProfile object');
      return;
    }

    // Call authService to update the username
    this.authService.updateUsername(this.userProfile.uid, newUsername)
      .then(() => {
        console.log('Username updated successfully');
        this.userProfile.username = newUsername;  // Update the local userProfile object with the new username
      })
      .catch((error) => {
        console.error('Error updating username:', error); // Log an error if there's an issue updating the username
      });
  }

  // Function to upload profile picture
  uploadProfilePicture() {
    if (!this.userProfile) {
      console.error('UserProfile is not set. Cannot upload image.');
      return;
    }

    if (!this.imageFile) {
      console.error('ImageFile is not set. Cannot upload image.');
      return;
    }

    const userId = this.userProfile.uid;
    if (!userId) {
      console.error('UserID is undefined. Cannot upload image.');
      return;
    }

    // Upload profile picture using authService
    console.log(`Uploading profile picture for user: ${userId}`);
    this.authService.uploadProfilePicture(this.imageFile, userId)
      .subscribe(downloadURL => {
        if (downloadURL) {
          // Save the download URL to the user's profile
          this.authService.saveProfilePicture(userId, downloadURL)
            .then(() => console.log('Profile picture updated'))
            .catch(error => console.error('Error saving profile picture', error));
        } else {
          console.error('Failed to get download URL');
        }
      }, error => {
        console.error('Error uploading profile picture', error); // Log an error if there's an issue uploading the profile picture
      });
  }

  // Function to navigate to saved exercises list page
  openSavedExerciseList() {
    this.router.navigate(['/saved-exercises']);
    console.log('Button clicked!');
  }

  // Function to navigate to local gyms page
  FindLocalGyms() {
    this.router.navigate(['/local-gyms']);
    console.log('Button clicked!');
  }

  // Function to navigate to macro counter page
  MacroCounter() {
    this.router.navigate(['/macroCounter']);
    console.log('Button clicked!');
  }

  // Function to logout user
  logout() {
    this.authService.logout(); // Call authService logout method
    this.router.navigateByUrl('/login'); // Navigate to login or another appropriate page
  }
}

import { Component, OnInit } from '@angular/core';
import { UserExerciseService } from '../user-exercise.service'; // Import your service

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  savedWorkouts: any[] = []; // Use a type here if you have one

  constructor(private userExerciseService: UserExerciseService, ) { } // Inject your service

  ngOnInit() {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
    /*
    this.fetchSavedWorkouts();
    */ // Fetch the workouts when the component loads
  }
/*
  fetchSavedWorkouts() {
    this.auth.user$.subscribe((user) => {
      if (user && user.sub) {
        // Call the service method to get saved exercises for the logged-in user
        this.userExerciseService.getSavedExercises(user.sub).subscribe({
          next: (workouts) => {
            this.savedWorkouts = workouts;
          },
          error: (error) => {
            console.error('Error fetching saved workouts:', error);
          }
        });
      }
    });
  }
 */
  updateDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString(); // Adjust format as needed
    const dateTimeElement = document.getElementById('currentDateTime');
  
    if (dateTimeElement) {
      dateTimeElement.innerText = dateTimeString;
    }
  }
  
}

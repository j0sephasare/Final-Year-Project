import { Component, OnInit } from '@angular/core';
import { UserExerciseService } from '../user-exercise.service';
import { SaveExerciseData } from 'models/SaveExercise.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // Array to hold saved workouts
  savedWorkouts: SaveExerciseData[] = [];

  constructor(
    private userExerciseService: UserExerciseService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // Fetch saved workouts and update date-time on component initialization
    this.fetchSavedWorkouts();
    this.updateDateTime();
    // Update date-time every second
    setInterval(() => this.updateDateTime(), 1000);
  }

  // Function to fetch saved workouts
  fetchSavedWorkouts() {
    this.authService.getCurrentUser().subscribe(user => {
      if (user?.uid) {
        this.userExerciseService.getSavedExercises(user.uid).subscribe({
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

  // Function to update date-time
  updateDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString();
    const dateTimeElement = document.getElementById('currentDateTime');

    if (dateTimeElement) {
      // Update current date-time in the DOM
      dateTimeElement.innerText = dateTimeString;
    }
  }
}

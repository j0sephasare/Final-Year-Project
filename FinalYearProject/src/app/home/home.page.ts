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

  savedWorkouts: SaveExerciseData[] = [];
  constructor(private userExerciseService: UserExerciseService,  private authService: AuthService  ) { } 

  ngOnInit() {
    this.fetchSavedWorkouts();
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
  
  }
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
  updateDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString(); 
    const dateTimeElement = document.getElementById('currentDateTime');
  
    if (dateTimeElement) {
      dateTimeElement.innerText = dateTimeString;
    }
  }
  
}

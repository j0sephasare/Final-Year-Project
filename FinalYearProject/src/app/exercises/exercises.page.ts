import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercises',
  templateUrl: 'exercises.page.html',
  styleUrls: ['exercises.page.scss']
})
export class ExercisesPage {

  constructor(private router: Router) {}

  // Method to navigate to WeightworkoutsPage
  startWeightWorkout() {
    // Navigate to the WeightworkoutsPage
    this.router.navigate(['/weightworkouts']);
  }

  // The rest of your existing code
}

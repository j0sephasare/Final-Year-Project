import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SelectedExerciseService } from '../selected-exercise.service';
import { TimerService } from '../timer.service';
import { Exercise, ExerciseData } from 'models/exercise.model';
import { Subscription } from 'rxjs';

import { UserExerciseService } from '../user-exercise.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-weightworkouts',
  templateUrl: './weightworkouts.page.html',
  styleUrls: ['./weightworkouts.page.scss'],
})
export class WeightworkoutsPage implements OnInit, OnDestroy {
  exercisesData: ExerciseData = { exercises: [] };
  selectedExercises: Exercise[] = [] as Exercise[];
  timerSubscription!: Subscription;
  timer: { minutes: number; seconds: number } = { minutes: 0, seconds: 0 };
  calculatedVolume: number = 0;
  totalSets: number = 0;

  constructor(
    private router: Router,
    private selectedExercisesService: SelectedExerciseService,
    private timerService: TimerService,
    private userExerciseService: UserExerciseService,
    private auth: AuthService  // Inject AuthService
  ) {
    this.selectedExercises = this.selectedExercisesService.getSelectedExercises();
  }

  ngOnInit() {
    this.timerSubscription = this.timerService.getTimer().subscribe((time) => {
      this.timer = time;
    });
  }

  ngOnDestroy() {
    this.timerSubscription.unsubscribe();
  }

  calculateVolume(): void {
    this.calculatedVolume = 0;
    this.totalSets = 0;

    for (const exercise of this.selectedExercises) {
      if (exercise.kg && exercise.reps) {
        const weight = exercise.kg * exercise.reps;
        this.calculatedVolume += weight;
        this.totalSets += exercise.setsCounter || 1;
      }
    }
  }

  addSet(selectedExercise: Exercise): void {
    // Duplicate the selected exercise
    const duplicatedExercise: Exercise = {
      id: selectedExercise.id,
      name: selectedExercise.name,
      description: selectedExercise.description,
      image: selectedExercise.image,

      difficulty: selectedExercise.difficulty,
      selected: selectedExercise.selected,
      kg: selectedExercise.kg,
      reps: selectedExercise.reps,
      setsCounter: (selectedExercise.setsCounter || 1) + 1,
    };

    // Add the duplicated exercise to the list
    this.selectedExercises.push(duplicatedExercise);

    // Reset the input values for the duplicated exercise
    selectedExercise.kg = 0;
    selectedExercise.reps = 0;

    // Recalculate the volume
    this.calculateVolume();
  }

  finishWorkout(): void {
    this.calculateVolume(); // Make sure volume and sets are calculated
  
    this.auth.user$.subscribe((user) => {
      if (user) {
        const navigationExtras: NavigationExtras = {
          state: {
            exercises: this.selectedExercises,
            totalVolume: this.calculatedVolume,
            totalSets: this.totalSets,
            duration: this.timer, // Pass the timer if you need to
            userId: user.sub // Include the userId in the state
          }
          
        };
        this.selectedExercises = [];
        this.calculatedVolume = 0;
        this.totalSets = 0;
        // Navigate to FinishWorkoutPage with the data
        this.router.navigate(['/finish-workout'], navigationExtras);
      } else {
        // Handle the case where the user is not logged in or the user data is not retrieved
        console.error('User information is not available.');
      }
    });
  }
  
  openExerciseList() {
    this.router.navigate(['/exercise-list']);
  }
  deleteExercise(exerciseIndex: number): void {
    // Confirm with the user before deleting
    if (window.confirm('Are you sure you want to delete this exercise?')) {
      this.selectedExercises.splice(exerciseIndex, 1);
      this.calculateVolume(); // Update the total volume if necessary
    }
  }
  
  
}

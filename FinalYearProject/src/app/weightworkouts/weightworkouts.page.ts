// Import necessary modules and services
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TimerService } from '../timer.service';
import { SelectedExerciseService } from '../selected-exercise.service';
import { Subscription } from 'rxjs';
import { Exercise } from 'models/exercise.model';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-weightworkouts',
  templateUrl: './weightworkouts.page.html',
  styleUrls: ['./weightworkouts.page.scss'],
})
export class WeightworkoutsPage implements OnInit, OnDestroy {
  // Array to store selected exercises
  selectedExercises: Exercise[] = [];
  // Subscription to the timer service
  timerSubscription!: Subscription;
  // Variables to store calculated volume and total sets
  calculatedVolume: number = 0;
  totalSets: number = 0;
  // Variable to store the user ID
  userId: string | undefined;
  // Timer object
  timer: { minutes: number; seconds: number } = { minutes: 0, seconds: 0 };
  // Workout title and description
  workoutTitle: string = '';
  description: string = '';
  // Subscription for resetting the workout
  private resetSubscription!: Subscription; 
  // Duration in string format
  duration: string = '';

  constructor(
    private router: Router,
    private selectedExercisesService: SelectedExerciseService,
    private auth: AuthService,
    private workoutService: WorkoutService,
    private timerService: TimerService
  ) {}

  ngOnInit() {
    // Subscribe to changes in selected exercises
    this.selectedExercisesService.selectedExercises$.subscribe(
      exercises => {
        this.selectedExercises = exercises;
        this.calculateVolumeAndTotalSets();
      }
    );
    this.loadSelectedExercises();
    this.subscribeToTimer();
    console.log('Selected exercises on init:', this.selectedExercises);
        
    // Get user ID from authentication service
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state?.['selectedExercises']) {
      this.selectedExercises = navigation.extras.state['selectedExercises'];
    }

    // Get the current user's ID
    this.auth.getCurrentUser().subscribe(user => {
      if (user) {
        this.userId = user.uid;
      } else {
        console.error('User is not logged in.');
      }
    });

    // Subscribe to reset workout event
    this.resetSubscription = this.workoutService.getResetWorkoutObservable().subscribe(shouldReset => {
      if (shouldReset) {
        this.resetPageState();
        this.workoutService.clearResetTrigger();
      }
    });
  }

  ngOnDestroy() {
    // Unsubscribe from timer service
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    // Reset page state
    this.resetPageState();
    // Unsubscribe from reset subscription
    if (this.resetSubscription) {
      this.resetSubscription.unsubscribe();
    }
  }

  // Load selected exercises
  loadSelectedExercises() {
    this.selectedExercises = this.selectedExercisesService.getSelectedExercises();
    console.log('Selected exercises on init:', this.selectedExercises);
  }

  // Subscribe to the timer service
  subscribeToTimer() {
    this.timerSubscription = this.timerService.getTimer().subscribe(timer => {
      this.timer = timer;
      // Format the duration each time the timer updates.
      this.duration = this.formatDuration(timer.minutes, timer.seconds);
    });
  }

  // Format the duration into a string
  formatDuration(minutes: number, seconds: number): string {
    // Protect against negative values just in case
    minutes = Math.max(0, minutes);
    seconds = Math.max(0, seconds);
    return `${minutes}min ${seconds}s`;
  }

  // Add a set to the selected exercises
  addSet(exercise: Exercise) {
    const newSet = { ...exercise, setsCounter: (exercise.setsCounter ?? 0) + 1 };
    this.selectedExercises.push(newSet);
    this.calculateVolumeAndTotalSets();
  }

  // Calculate total volume and sets
  calculateVolumeAndTotalSets() {
    this.calculatedVolume = 0;
    this.totalSets = 0;

    this.selectedExercises.forEach(exercise => {
      const safeKg = exercise.kg ?? 0;
      const safeReps = exercise.reps ?? 0;
      const safeSetsCounter = exercise.setsCounter ?? 1;

      this.calculatedVolume += safeKg * safeReps * safeSetsCounter;
      this.totalSets += safeSetsCounter;
    });

    console.log('Total volume:', this.calculatedVolume, 'Total sets:', this.totalSets);
  }

  // Reset the page state
  resetPageState() {
    this.selectedExercises = [];
    this.calculatedVolume = 0;
    this.totalSets = 0;
    this.timer = { minutes: 0, seconds: 0 };
    this.duration = '';
    this.workoutTitle = '';
    this.description = '';  
  }

  // Reset the workout
  resetWorkout() {
    this.resetPageState();
    this.timerService.resetTimer(); 
  }

  // Finish the workout
  finishWorkout() {
    if (!this.userId) {
      console.error('Cannot finish workout - user ID is not defined.');
      return;
    }

    console.log(`Navigating with timer data: ${this.duration}`);

    if (this.timer.minutes === undefined || this.timer.seconds === undefined) {
      console.error('Timer is not initialized.');
      return;
    }
    this.router.navigate(['/finish-workout'], {
      state: {
        userId: this.userId,
        workoutTitle: this.workoutTitle,
        description: this.description,
        volume: this.calculatedVolume,
        sets: this.totalSets,
        duration: this.duration, // Pass the formatted duration string
        exercises: this.selectedExercises.map(exercise => ({
          name: exercise.Name,
          sets: exercise.setsCounter ?? 0,
          reps: exercise.reps ?? 0
        }))
      }
    });
  }

  // Delete an exercise
  deleteExercise(index: number) {
    if (confirm('Are you sure you want to remove this set?')) {
      this.selectedExercises.splice(index, 1);
      this.calculateVolumeAndTotalSets();
    }
  }

  // Open the exercise list page
  openExerciseList() {
    this.router.navigate(['/exercise-list']);
  }
}

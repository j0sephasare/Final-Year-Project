import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectedExerciseService } from '../selected-exercise.service';
import { UserExerciseService } from '../user-exercise.service';
import { SaveExerciseData } from 'models/SaveExercise.model';
import { Exercise } from 'models/exercise.model';

@Component({
  selector: 'app-finish-workout',
  templateUrl: './finish-workout.page.html',
  styleUrls: ['./finish-workout.page.scss'],
})
export class FinishWorkoutPage implements OnInit {
  workoutTitle: string = '';
  description: string = '';
  duration: string = '';
  volume: number = 0;
  sets: number = 0;
  userId: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private selectedExercisesService: SelectedExerciseService,
    private userExerciseService: UserExerciseService
  ) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
  // Adjust the cast to SaveExerciseData since that's the interface you're using
  const state = navigation?.extras.state as SaveExerciseData | undefined;
  
  if (state) {
    // Provide default values if state properties are undefined
    this.volume = state.volume ?? 0; // Use nullish coalescing operator
    this.sets = state.sets ?? 0;
    this.duration = state.duration; // Since duration is a string, assign it directly
    this.userId = state.userId;
  } else {
    // Handle the case when state is undefined
    console.error('State object is missing in navigation extras.');
  }
  
  console.log('State object received:', state);
  }

  getCurrentTimestamp(): string {
    return new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  saveWorkout(): void {
    if (!this.userId || !this.workoutTitle) {
      console.error('User ID or Workout title is missing, cannot save workout.');
      return;
    }
  
    // Map the selected exercises to the format expected by SaveExerciseData
    const exercisesForSave: SaveExerciseData['exercises'] = this.selectedExercisesService.getSelectedExercises().map(exercise => ({
      name: exercise.Name,
      sets: exercise.setsCounter ?? 1, // Ensure there's a default value if undefined
      reps: exercise.reps ?? 0
    }));
  
    // Construct the full SaveExerciseData object
    const workoutData: SaveExerciseData = {
      userId: this.userId,
      workoutTitle: this.workoutTitle,
      description: this.description,
      duration: this.duration,
      volume: this.volume, // This assumes you calculate the volume elsewhere
      sets: this.sets, // This assumes you calculate the total sets elsewhere
      timestamp: this.getCurrentTimestamp(), // Get the current timestamp
      exercises: exercisesForSave
    };
  
    // Use the UserExerciseService to save the workout data to Firestore
    this.userExerciseService.saveWorkout(workoutData).then(() => {
      console.log('Workout saved successfully');
      this.router.navigate(['/home']);
    }).catch((error) => {
      console.error('Error saving workout:', error);
    });
  }
  discardWorkout(): void {
    if (window.confirm('Are you sure you want to discard this workout?')) {
      this.router.navigate(['/home']);
    }
  }
}

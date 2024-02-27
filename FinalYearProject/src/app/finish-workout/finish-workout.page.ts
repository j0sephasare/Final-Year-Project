import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectedExerciseService } from '../selected-exercise.service';
import { UserExerciseService } from '../user-exercise.service';
import { SaveExerciseData } from 'models/SaveExercise.model';

@Component({
  selector: 'app-finish-workout',
  templateUrl: './finish-workout.page.html',
  styleUrls: ['./finish-workout.page.scss'],
})
export class FinishWorkoutPage implements OnInit {
  workoutTitle: string = ''; // The title given by the user for the workout
  description: string = '';
  duration: string = '';
  volume: number = 0;
  sets: number = 0;
  reps: number = 0; // Defa
  userId: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private selectedExercisesService: SelectedExerciseService,
    private userExerciseService: UserExerciseService
  ) {}

  ngOnInit() {
    // Retrieve the state passed from the previous page
    this.route.queryParams.subscribe(() => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras.state) {
        const state = navigation.extras.state as {
          totalVolume: number,
          totalSets: number,
          duration: { minutes: number, seconds: number },
          userId: string
        };
        // Ensure duration is converted to a string
        this.duration = `${state.duration.minutes}min ${state.duration.seconds}s`;
        this.volume = state.totalVolume;
        this.sets = state.totalSets;
        this.userId = state.userId;
      }
    });
  }

  getCurrentTimestamp(): string {
    // Format: "31 Jan 2024, 12:34 PM"
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
    if (this.userId) {
      // Assume 'selectedExercises' is an array of exercises with name, sets, and reps
      const selectedExercises = this.selectedExercisesService.getSelectedExercises();

      // Prepare the data for saving
      selectedExercises.forEach(exercise => {
        const saveData: SaveExerciseData = {
          userId: this.userId,
          workoutTitle: this.workoutTitle,
          description: this.description,
          exerciseName: exercise.name, // Use the name from each selected exercise
          volume: this.volume,
          sets: exercise.setsCounter || 1, // Assume this property exists and is correct
          reps: exercise.reps, // Assume this property exists and is correct
          duration: this.duration,
          timestamp: this.getCurrentTimestamp() // Add the current timestamp
        };

        // Call the service to save each workout exercise to MongoDB
        this.userExerciseService.saveExercise(saveData).subscribe({
          next: (response) => {
            console.log('Workout saved successfully:', response);
            // If you want to navigate only after all exercises are saved, you need to handle this logic
          },
          error: (error) => {
            console.error('Error saving workout:', error);
          }
        });
      });

      // After saving, navigate to home or a confirmation page
      this.router.navigate(['/home']);
    } else {
      console.error('User ID is not available, cannot save workout.');
    }
  }
  

  discardWorkout(): void {
    if (window.confirm('Are you sure you want to discard this workout?')) {
      this.router.navigate(['/home']); // Navigate to home or the workouts list
    }
  }
}

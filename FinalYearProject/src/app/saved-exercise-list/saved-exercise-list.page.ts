// Import necessary modules and services
import { Component, OnInit } from '@angular/core';
import { UserExerciseService } from '../user-exercise.service';
import { Exercise } from 'models/exercise.model'; // Import Exercise model
import { SaveExerciseData } from 'models/SaveExercise.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-saved-exercise-list',
  templateUrl: './saved-exercise-list.page.html',
  styleUrls: ['./saved-exercise-list.page.scss'],
})
export class SavedExerciseListPage implements OnInit {
  // Array to store saved exercises
  savedExercises: SaveExerciseData[] = [];
  // Variable to store the index of the exercise being edited
  editModeIndex: number | null = null;
  // Variable to store the user ID
  userId: string = '';

  constructor(
    private userExerciseService: UserExerciseService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Subscribe to the current user's data to fetch saved exercises
    this.authService.getCurrentUser().subscribe(user => {
      if (user?.uid) {
        this.userId = user.uid; // Store the user ID
        this.fetchSavedExercises(); // Fetch saved exercises
      }
    });
  }

  // Function to fetch saved exercises for the current user
  fetchSavedExercises(): void {
    if (this.userId) {
      // Use the userExerciseService to get saved exercises for the user
      this.userExerciseService.getSavedExercises(this.userId).subscribe({
        next: (exercises) => {
          this.savedExercises = exercises; // Assign fetched exercises to savedExercises array
        },
        error: (error) => {
          console.error('Error fetching saved exercises:', error); // Log error if fetching fails
        }
      });
    }
  }

  // Function to enable edit mode for an exercise
  enableEditMode(index: number): void {
    console.log(`Enabling edit mode for index ${index}`);
    this.editModeIndex = index; // Set the editModeIndex to the index of the exercise
  }
  
  // Function to cancel edit mode
  cancelEditMode(): void {
    console.log(`Cancelling edit mode`);
    this.editModeIndex = null; // Reset editModeIndex to null
  }

  // Function to update an exercise
  updateExercise(exercise: SaveExerciseData): void {
    if (this.userId && exercise._id && exercise.exercises) {
      // Construct the update payload with only the exercises property
      const updatePayload: Partial<SaveExerciseData> = {
        exercises: exercise.exercises.map(e => ({
          name: e.name,
          sets: e.sets,
          reps: e.reps
        }))
      };

      // Call the userExerciseService to update the exercise
      this.userExerciseService.updateSavedExercise(this.userId, exercise._id, updatePayload).then(() => {
        console.log('Exercise updated successfully');
        this.cancelEditMode(); // Cancel edit mode
        this.fetchSavedExercises(); // Re-fetch saved exercises to reflect changes
      }).catch((error) => {
        console.error('Error updating exercise:', error); // Log error if updating fails
      });
    }
  }

  // Function to delete an exercise
  deleteExercise(exercise: SaveExerciseData): void {
    if (this.userId && exercise._id) {
      // Call the userExerciseService to delete the exercise
      this.userExerciseService.deleteSavedExercise(this.userId, exercise._id).then(() => {
        // Filter out the deleted exercise from the savedExercises array
        this.savedExercises = this.savedExercises.filter(ex => ex._id !== exercise._id);
        console.log('Exercise deleted successfully');
      }).catch((error) => {
        console.error('Error deleting exercise:', error); // Log error if deletion fails
      });
    }
  }
}

// saved-exercise-list.page.ts
import { Component, OnInit } from '@angular/core';
import { UserExerciseService } from '../user-exercise.service';
import { Exercise } from 'models/exercise.model'; // Import your Exercise model
import { SaveExerciseData } from 'models/SaveExercise.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-saved-exercise-list',
  templateUrl: './saved-exercise-list.page.html',
  styleUrls: ['./saved-exercise-list.page.scss'],
})
export class SavedExerciseListPage implements OnInit {
  savedExercises: SaveExerciseData[] = [];
  editModeIndex: number | null = null;
  userId: string = '';
  constructor(private userExerciseService: UserExerciseService,  private authService: AuthService ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      if (user?.uid) {
        this.userId = user.uid; // Store the user ID to use in update and delete methods
        this.fetchSavedExercises();
      }
    });
  }
  fetchSavedExercises(): void {
    if (this.userId) {
      this.userExerciseService.getSavedExercises(this.userId).subscribe({
        next: (exercises) => {
          this.savedExercises = exercises;
        },
        error: (error) => {
          console.error('Error fetching saved exercises:', error);
        }
      });
    }
  }

  enableEditMode(index: number): void {
    console.log(`Enabling edit mode for index ${index}`);
    this.editModeIndex = index;
  }
  
  cancelEditMode(): void {
    console.log(`Cancelling edit mode`);
    this.editModeIndex = null;
  }
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
  
      this.userExerciseService.updateSavedExercise(this.userId, exercise._id, updatePayload).then(() => {
        console.log('Exercise updated successfully');
        this.cancelEditMode();
        this.fetchSavedExercises(); // Re-fetch or update the local array to reflect the changes
      }).catch((error) => {
        console.error('Error updating exercise:', error);
      });
    }
  }
  deleteExercise(exercise: SaveExerciseData): void {
    if (this.userId && exercise._id) {
      this.userExerciseService.deleteSavedExercise(this.userId, exercise._id).then(() => {
        this.savedExercises = this.savedExercises.filter(ex => ex._id !== exercise._id);
        console.log('Exercise deleted successfully');
      }).catch((error) => {
        console.error('Error deleting exercise:', error);
      });
    }
  }
}

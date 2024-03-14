import { Component, OnInit } from '@angular/core';
import { UserExerciseService } from '../user-exercise.service';
import { SaveExerciseData } from 'models/SaveExercise.model'; // Update this path if necessary
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-saved-exercise',
  templateUrl: './saved-exercise.component.html',
  styleUrls: ['./saved-exercise.component.scss'],
})
export class SavedExercisesComponent implements OnInit {
  savedExercises: SaveExerciseData[] = []; // Assuming SaveExerciseData is the correct type
  currentUserId: string | null = null; // Hold the current user's ID
  constructor(private userExerciseService: UserExerciseService,  private authService: AuthService ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.currentUserId = user.uid; // Save the user ID for later use
      }
    });
  }

  enableEditMode(exercise: SaveExerciseData): void {
    exercise.isEditMode = true;
  }

  disableEditMode(exercise: SaveExerciseData): void {
    exercise.isEditMode = false;
  }

  updateExercise(exercise: SaveExerciseData): void {
    if (this.currentUserId && exercise._id) {
      this.userExerciseService.updateSavedExercise(this.currentUserId, exercise._id, exercise).then(() => {
        console.log('Exercise updated successfully');
        exercise.isEditMode = false;
      }).catch((error) => {
        console.error('Error updating exercise:', error);
      });
    }
  }

  deleteExercise(exercise: SaveExerciseData): void {
    if (this.currentUserId && exercise._id) {
      this.userExerciseService.deleteSavedExercise(this.currentUserId, exercise._id).then(() => {
        this.savedExercises = this.savedExercises.filter(ex => ex._id !== exercise._id);
        console.log('Exercise deleted successfully');
      }).catch((error) => {
        console.error('Error deleting exercise:', error);
      });
    }
  }
}

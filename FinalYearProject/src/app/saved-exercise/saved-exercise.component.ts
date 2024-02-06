import { Component, OnInit } from '@angular/core';
import { UserExerciseService } from '../user-exercise.service';
import { SaveExerciseData } from 'models/SaveExercise.model'; // Update this path if necessary
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-saved-exercise',
  templateUrl: './saved-exercise.component.html',
  styleUrls: ['./saved-exercise.component.scss'],
})
export class SavedExercisesComponent implements OnInit {
  savedExercises: SaveExerciseData[] = []; // Assuming SaveExerciseData is the correct type

  constructor(private userExerciseService: UserExerciseService, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      if (user) {
        const userId: string = user.sub || '';
        this.userExerciseService.getSavedExercises(userId).subscribe(
          (data) => {
            // Initialize editMode flag for each exercise
            this.savedExercises = data.map(exercise => ({ ...exercise, isEditMode: false }));
          },
          (error) => {
            console.error('Error fetching saved exercises:', error);
          }
        );
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
    if (exercise._id) {
      this.userExerciseService.updateSavedExercise(exercise._id, exercise).subscribe({
        next: (response) => {
          console.log('Exercise updated successfully', response);
          exercise.isEditMode = false;
        },
        error: (error) => {
          console.error('Error updating exercise:', error);
        }
      });
    }
  }

  deleteExercise(id: string | undefined): void {
    if (id) {
      this.userExerciseService.deleteSavedExercise(id).subscribe({
        next: () => {
          this.savedExercises = this.savedExercises.filter(exercise => exercise._id !== id);
          // Handle success
        },
        error: (error) => {
          // Handle error
          console.error('Error deleting exercise:', error);
        }
      });
    }
  }
}

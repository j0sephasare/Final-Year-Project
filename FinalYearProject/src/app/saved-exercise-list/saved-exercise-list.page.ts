// saved-exercise-list.page.ts
import { Component, OnInit } from '@angular/core';
import { UserExerciseService } from '../user-exercise.service';
import { Exercise } from 'models/exercise.model'; // Import your Exercise model
import { SaveExerciseData } from 'models/SaveExercise.model';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-saved-exercise-list',
  templateUrl: './saved-exercise-list.page.html',
  styleUrls: ['./saved-exercise-list.page.scss'],
})
export class SavedExerciseListPage implements OnInit {
  savedExercises: SaveExerciseData[] = [];
  editModeIndex: number | null = null;

  constructor(private userExerciseService: UserExerciseService, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      if (user && user.sub) {
        this.userExerciseService.getSavedExercises(user.sub).subscribe(
          (data) => {
            this.savedExercises = data;
          },
          (error) => {
            console.error('Error fetching saved exercises:', error);
          }
        );
      }
    });
  }

  enableEditMode(index: number): void {
    this.editModeIndex = index;
  }

  cancelEditMode(): void {
    this.editModeIndex = null;
  }

  updateExercise(exercise: SaveExerciseData): void {
    if (exercise._id) {
      this.userExerciseService.updateSavedExercise(exercise._id, exercise).subscribe({
        next: () => {
          console.log('Exercise updated successfully');
          this.cancelEditMode();
        },
        error: (error) => {
          console.error('Error updating exercise:', error);
        }
      });
    }
  }

  deleteExercise(id: string): void {
    this.userExerciseService.deleteSavedExercise(id).subscribe({
      next: () => {
        this.savedExercises = this.savedExercises.filter(ex => ex._id !== id);
        console.log('Exercise deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting exercise:', error);
      }
    });
  }
}

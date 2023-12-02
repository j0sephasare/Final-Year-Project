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

  constructor(private userExerciseService: UserExerciseService,private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      if (user) {
        const userId: string = user.sub!; // Use the non-null assertion operator (!)
        console.log('User ID:', userId);

        this.userExerciseService.getSavedExercises(userId).subscribe(
          (data) => {
            console.log('Received data:', data);
            this.savedExercises = data;
          },
          (error) => {
            console.error('Error fetching saved exercises:', error);
          }
        );
      }
    });
  }
}

// saved-exercises.component.ts

import { Component, OnInit } from '@angular/core';
import { UserExerciseService } from '../user-exercise.service';
import { Exercise, ExerciseData } from 'models/exercise.model';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-saved-exercise',
  templateUrl: './saved-exercise.component.html',
  styleUrls: ['./saved-exercise.component.scss'],
})
export class SavedExercisesComponent implements OnInit {
  savedExercises: any[] = []; // Update the type based on your data structure

  constructor(private userExerciseService: UserExerciseService,private auth: AuthService) {}
  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      if (user) {
        const userId: string = user.sub || '';
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

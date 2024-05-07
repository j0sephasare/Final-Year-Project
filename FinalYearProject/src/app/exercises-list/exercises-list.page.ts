import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, of, catchError } from 'rxjs';
import { ExerciseService } from '../exercise.service';
import { Exercise } from 'models/exercise.model';
import { Router } from '@angular/router';
import { SelectedExerciseService } from '../selected-exercise.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-exercises-list',
  templateUrl: './exercises-list.page.html',
  styleUrls: ['./exercises-list.page.scss'],
})
export class ExercisesListPage implements OnInit {
  // Observable to hold exercises
  exercises$!: Observable<Exercise[]>;// Specify the type here
   // User ID
  userId: string | undefined;
  // Array to hold selected exercises
  selectedExercises: Exercise[] = [];
  
  // Array to hold all exercises
  exercises: Exercise[] = [];

  constructor(
    private exerciseService: ExerciseService, private changeDetectorRef: ChangeDetectorRef,
    private selectedExercisesService: SelectedExerciseService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    console.log('ngOnInit - Fetching exercises...');
    console.log('ngOnInit - Fetching exercises...');
    // Fetch exercises and store them in a local array
    this.exerciseService.getExercises().subscribe(
      exercisesFromService => {
        console.log('Exercises received from service:', exercisesFromService);
        this.exercises = exercisesFromService;
      },
      error => {
        console.error('Error fetching exercises:', error);
      }
    );
    // Get current user information
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.userId = user.uid;
        console.log(`User ID: ${this.userId}`);
      } else {
        // Handle the case where there is no user logged in.
        console.error('User is not logged in.');

      }
    });
  }

  // Function to handle selection toggle
  toggleExerciseSelection(exercise: Exercise) {
    if (this.selectedExercises.includes(exercise)) {
        // If exercise is already selected, remove it
      this.selectedExercises = this.selectedExercises.filter(e => e !== exercise);
    } else {
        // If exercise is not selected, add it
      this.selectedExercises.push(exercise);
      console.log('Selected exercises after toggle:', this.selectedExercises);
    }
  }
  // Function to add selected exercises
  addSelectedExercises() {
    if (this.userId) {
       // Add each selected exercise to the service
      this.selectedExercises.forEach(exercise => {
        this.selectedExercisesService.addExercise(exercise);
      });

      // Navigate back to the weight workouts page after adding the exercises
      this.router.navigate(['/weightworkouts']);
    } else {
        // Handle error if user ID is undefined
      console.error('User ID is undefined. Cannot save selected exercises.');
    }
  }
}
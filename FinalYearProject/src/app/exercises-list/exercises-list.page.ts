import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
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
  exercises$!: Observable<Exercise[]>;// Specify the type here
  userId: string | undefined;
  selectedExercises: Exercise[] = [];
  exercises: Exercise[] = [];
  constructor(
    private exerciseService: ExerciseService,  private changeDetectorRef: ChangeDetectorRef,
    private selectedExercisesService: SelectedExerciseService,private router: Router,private authService:AuthService) {}

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
      this.selectedExercises = this.selectedExercises.filter(e => e !== exercise);
    } else {
      this.selectedExercises.push(exercise);
      console.log('Selected exercises after toggle:', this.selectedExercises);
    }
  }
 
  addSelectedExercises() {
    if(this.userId) {
      this.selectedExercises.forEach(exercise => {
        this.selectedExercisesService.addExercise(exercise);
      });

      // Navigate back to the weight workouts page after adding the exercises
      this.router.navigate(['/weightworkouts']);
    } else {
      console.error('User ID is undefined. Cannot save selected exercises.');
    }
  }
  }
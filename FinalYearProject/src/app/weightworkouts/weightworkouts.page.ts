import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SelectedExerciseService } from '../selected-exercise.service';
import { TimerService } from '../timer.service';
import { Exercise, ExerciseData } from 'models/exercise.model';
import { Subscription } from 'rxjs';
import { UserExerciseService } from '../user-exercise.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-weightworkouts',
  templateUrl: './weightworkouts.page.html',
  styleUrls: ['./weightworkouts.page.scss'],
})
export class WeightworkoutsPage implements OnInit, OnDestroy {
  exercisesData: ExerciseData = { exercises: [] };
  selectedExercises: Exercise[] = [] as Exercise[];
  timerSubscription!: Subscription;
  timer: { minutes: number; seconds: number } = { minutes: 0, seconds: 0 };
  calculatedVolume: number = 0;
  totalSets: number = 0;

  constructor(
    private router: Router,
    private selectedExercisesService: SelectedExerciseService,
    private timerService: TimerService,
    private userExerciseService: UserExerciseService,
    private auth: AuthService  // Inject AuthService
  ) {
    this.selectedExercises = this.selectedExercisesService.getSelectedExercises();
  }

  ngOnInit() {
    this.timerSubscription = this.timerService.getTimer().subscribe((time) => {
      this.timer = time;
    });
  }

  ngOnDestroy() {
    this.timerSubscription.unsubscribe();
  }

  calculateVolume(): void {
    this.calculatedVolume = 0;
    this.totalSets = 0;

    for (const exercise of this.selectedExercises) {
      if (exercise.kg && exercise.reps) {
        const weight = exercise.kg * exercise.reps;
        this.calculatedVolume += weight;
        this.totalSets += exercise.setsCounter || 1;
      }
    }
  }

  addSet(selectedExercise: Exercise): void {
    // Duplicate the selected exercise
    const duplicatedExercise: Exercise = {
      id: selectedExercise.id,
      name: selectedExercise.name,
      description: selectedExercise.description,
      image: selectedExercise.image,

      difficulty: selectedExercise.difficulty,
      selected: selectedExercise.selected,
      kg: selectedExercise.kg,
      reps: selectedExercise.reps,
      setsCounter: (selectedExercise.setsCounter || 1) + 1,
    };

    // Add the duplicated exercise to the list
    this.selectedExercises.push(duplicatedExercise);

    // Reset the input values for the duplicated exercise
    selectedExercise.kg = 0;
    selectedExercise.reps = 0;

    // Recalculate the volume
    this.calculateVolume();
  }

  finishWorkout(): void {
    // Assuming you want to save all selected exercises at once
    for (const exercise of this.selectedExercises) {
      if (exercise.kg && exercise.reps) {
        this.auth.user$.subscribe((user) => {
          if (user) {
            const data = {
              userId: user.sub, // User ID from Auth0
              exerciseName: exercise.name,
              volume: exercise.kg * exercise.reps,
              sets: exercise.setsCounter || 1,
              reps: exercise.reps,
            };

            // Save the exercise data to the backend
            this.userExerciseService.saveExercise(data).subscribe(
              (response) => {
                console.log('Exercise saved successfully:', response);
                // You can perform additional actions after saving the exercise if needed
              },
              (error) => {
                console.error('Error saving exercise:', error);
              }
            );
          }
        });
      }
    }

    // Optionally, you can reset the selected exercises after saving
    this.selectedExercises = [];
    this.calculatedVolume = 0;
    this.totalSets = 0;
  }

  openExerciseList() {
    this.router.navigate(['/exercise-list']);
  }
}

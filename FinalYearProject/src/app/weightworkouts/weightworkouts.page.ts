// weightworkouts.page.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SelectedExerciseService } from '../selected-exercise.service';
import { TimerService } from '../timer.service';
import { Exercise, ExerciseData } from 'models/exercise.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weightworkouts',
  templateUrl: './weightworkouts.page.html',
  styleUrls: ['./weightworkouts.page.scss'],
})
export class WeightworkoutsPage implements OnInit, OnDestroy {
  exercisesData: ExerciseData = { exercises: [] };
  selectedExercise: Exercise | null = null;
  kg: number | null = null;
  reps: number | null = null;
  selectedExercises: Exercise[] = [] as Exercise[];

  timerSubscription!: Subscription;
  timer: { minutes: number; seconds: number } = { minutes: 0, seconds: 0 }; // Add this line

  constructor(
    private router: Router,
    private selectedExercisesService: SelectedExerciseService,
    private timerService: TimerService
  ) {
    this.selectedExercises = this.selectedExercisesService.getSelectedExercises();
  }

  ngOnInit() {
    // Load exercises when the component initializes
    this.timerSubscription = this.timerService.getTimer().subscribe((time) => {
      this.timer = time;
    });
  }

  ngOnDestroy() {
    // Clear the timer when the component is destroyed
    this.timerSubscription.unsubscribe();
  }

  // This method will be called when the user clicks "Add Exercise"
  openExerciseList() {
    this.router.navigate(['/exercise-list']);
  }
}

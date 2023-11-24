// weightworkouts.page.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SelectedExerciseService } from '../selected-exercise.service';
import { TimerService } from '../timer.service';
import { Exercise, ExerciseData, ExerciseSet } from 'models/exercise.model';
import { Subscription } from 'rxjs';

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

  constructor(
    private router: Router,
    private selectedExercisesService: SelectedExerciseService,
    private timerService: TimerService
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

    for (const exercise of this.selectedExercises) {
      if (exercise.kg && exercise.reps) {
        const weight = exercise.kg * exercise.reps;
        this.calculatedVolume += weight;
      }
    }
  }

  

  openExerciseList() {
    this.router.navigate(['/exercise-list']);
  }
}

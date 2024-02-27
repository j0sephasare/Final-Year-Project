import { Injectable } from '@angular/core';
import { Exercise } from './exercises-list/exercises-list.page';
@Injectable({
  providedIn: 'root'
})
export class SelectedExerciseService {
  selectedExercises: Exercise[] = [];

  addExercise(exercise: Exercise) {
    this.selectedExercises.push(exercise);
  }

  getSelectedExercises() {
    return this.selectedExercises;
  }

  getWorkoutData() {
    let totalVolume = 0;
    let totalSets = 0;
    let totalDuration = { minutes: 0, seconds: 0 }; // Assuming duration is tracked elsewhere and passed here

    this.selectedExercises.forEach(exercise => {
      if (exercise.kg && exercise.reps && exercise.setsCounter) {
        totalVolume += exercise.kg * exercise.reps;
        totalSets += exercise.setsCounter;
      }
    });

    // Convert total duration to a displayable string if necessary
    const durationString = `${totalDuration.minutes}min ${totalDuration.seconds}s`;

    return {
      volume: totalVolume,
      sets: totalSets,
      duration: durationString
    };
  }

  clearSelectedExercises() {
    this.selectedExercises = [];
  }
  constructor() { }
}

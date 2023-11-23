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

  clearSelectedExercises() {
    this.selectedExercises = [];
  }
  constructor() { }
}

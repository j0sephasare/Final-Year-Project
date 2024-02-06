import { Component, OnInit } from '@angular/core';
import { BoxingExerciseService } from '../boxing-exercise.service';

export interface BoxingExercise {
  id: string; // Assuming the _id from MongoDB will be used
  title: string;
  description: string;
  duration: string;
  intensity: string;
  equipment: string[];
  type: string;
  selected?: boolean; // This property is used to track selection
}
@Component({
  selector: 'app-boxing-exercises',
  templateUrl: './boxing-exercises.page.html',
  styleUrls: ['./boxing-exercises.page.scss'],
})
export class BoxingExercisesPage implements OnInit {
  boxingExercises: any[] = [];
  constructor(private exerciseService: BoxingExerciseService) { }

  ngOnInit():  void {
    this.exerciseService.getBoxingExercises().subscribe(data => {
      this.boxingExercises = data;
    });
  }
  selectExercise(exercise: BoxingExercise): void {
    exercise.selected = !exercise.selected; // Toggle the selected state
    // ...any additional logic for when an exercise is selected...
  }

  areAnyExercisesSelected(): boolean {
    return this.boxingExercises.some(exercise => exercise.selected);
  }

  // Assuming you have a service to handle selected exercises like in your ExercisesListPage
  addSelectedExercises(): void {
    const selectedExercises = this.boxingExercises.filter(exercise => exercise.selected);
    // ...logic to handle selected exercises, such as adding to a workout...
  }
  
}

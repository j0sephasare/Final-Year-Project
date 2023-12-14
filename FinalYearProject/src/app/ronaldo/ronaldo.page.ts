import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ronaldo',
  templateUrl: './ronaldo.page.html',
  styleUrls: ['./ronaldo.page.scss'],
})
export class RonaldoPage implements OnInit {
  exercises = [
    { name: 'Exercise 1', done: false },
    { name: 'Exercise 2', done: false },
    // Add more exercises here
  ];

  constructor() { }

  ngOnInit() {
  }

  allExercisesDone() {
    return this.exercises.every(exercise => exercise.done);
  }

  completeExercises() {
    // Logic when all exercises are completed
    console.log('All exercises completed!');
  }
}

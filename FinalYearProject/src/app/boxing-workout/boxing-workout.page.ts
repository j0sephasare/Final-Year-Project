import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoxingExerciseService } from '../boxing-exercise.service';
@Component({
  selector: 'app-boxing-workout',
  templateUrl: './boxing-workout.page.html',
  styleUrls: ['./boxing-workout.page.scss'],
})
export class BoxingWorkoutPage implements OnInit {
  boxingExercises: any[] = [];

  constructor( private router: Router,private exerciseService: BoxingExerciseService) { }

  ngOnInit(): void {
    this.exerciseService.getBoxingExercises().subscribe(data => {
      this.boxingExercises = data;
    });
  }
  openExerciseList() {
    this.router.navigate(['/boxing-exercises']);
  }

}

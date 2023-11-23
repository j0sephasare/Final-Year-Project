import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import {  ExerciseData } from 'models/exercise.model';
import { NavController } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { SelectedExerciseService} from '../selected-exercise.service';
import { TimerService } from '../timer.service';

export class Exercise {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public image: string,
    public difficulty: string,
    public selected?: boolean
  ) {
  }
}

@Component({
  selector: 'app-exercises-list',
  templateUrl: './exercises-list.page.html',
  styleUrls: ['./exercises-list.page.scss'],
})
export class ExercisesListPage implements OnInit {
   exercises: Exercise[] = [];
 

  constructor(private exerciseService: ExerciseService, private Httpclient: HttpClient, private router: Router,private selectedExercisesService: SelectedExerciseService,private timerService: TimerService) {}

  ngOnInit() {
    this.loadExercises();
  }

  loadExercises() {
    this.Httpclient.get<any>('http://localhost:4000/exercises').subscribe(
    response => {
      console.log(response);
      this.exercises = response[0]?.exercises || [];
    }
  );

  }
  selectExercise(exercise: Exercise) {
    exercise.selected = !exercise.selected;
    if (exercise.selected) {
      this.selectedExercisesService.addExercise(exercise);
    } else {
      // Remove exercise if deselected
      const index = this.selectedExercisesService.getSelectedExercises().indexOf(exercise);
      if (index !== -1) {
        this.selectedExercisesService.getSelectedExercises().splice(index, 1);
      }
    }
  }

  areAnyExercisesSelected(): boolean {
    return this.exercises.some(e => e.selected);
  }

  addSelectedExercises() {
    const selectedExercises = this.exercises.filter(e => e.selected);
    console.log('Selected Exercises:', selectedExercises);
    
    this.router.navigate(['/weightworkouts']);
  }
 

 
}

 



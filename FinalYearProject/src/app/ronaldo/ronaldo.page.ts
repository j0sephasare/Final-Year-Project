import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ronaldo',
  templateUrl: './ronaldo.page.html',
  styleUrls: ['./ronaldo.page.scss'],
})
export class RonaldoPage implements OnInit {
  exercises = [
    { name: 'Exercise 1', done: false },
    { name: 'Exercise 2', done: false },
    { name: 'Exercise 3', done: false },
    // Add more exercises here
  ];

  constructor(private alertController: AlertController) {}

  ngOnInit() {}

  allExercisesDone() {
    return this.exercises.every((exercise) => exercise.done);
  }

  async completeTraining() {
    if (this.allExercisesDone()) {
      // Logic when all exercises are completed
      await this.showTrainingCompletedPopup();
    } else {
      console.log('Not all exercises are completed yet.');
    }
  }

  markExerciseAsCompleted(index: number) {
    this.exercises[index].done = true;
  }

  async showTrainingCompletedPopup() {
    const alert = await this.alertController.create({
      header: 'Training Completed',
      message: 'Congratulations! You have completed your training.',
      buttons: ['OK'],
    });

    await alert.present();
  }
}

import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular'; // Import AlertController for displaying alerts

@Component({
  selector: 'app-ronaldo',
  templateUrl: './ronaldo.page.html',
  styleUrls: ['./ronaldo.page.scss'],
})
export class RonaldoPage implements OnInit {
  // Array to store exercises with their completion status
  exercises = [
    { name: 'Exercise 1', done: false },
    { name: 'Exercise 2', done: false },
    { name: 'Exercise 3', done: false },
    // Add more exercises here
  ];

  constructor(private alertController: AlertController) {} // Inject AlertController

  ngOnInit() {}

  // Function to check if all exercises are completed
  allExercisesDone() {
    return this.exercises.every((exercise) => exercise.done); // Returns true if all exercises are done, otherwise false
  }

  // Function to handle completing the training session
  async completeTraining() {
    if (this.allExercisesDone()) {
      // If all exercises are completed, show a popup
      await this.showTrainingCompletedPopup();
    } else {
      console.log('Not all exercises are completed yet.'); // Log a message if not all exercises are completed
    }
  }

  // Function to mark an exercise as completed
  markExerciseAsCompleted(index: number) {
    this.exercises[index].done = true; // Set the 'done' property of the selected exercise to true
  }

  // Function to display a popup indicating that the training session is completed
  async showTrainingCompletedPopup() {
    const alert = await this.alertController.create({
      header: 'Training Completed',
      message: 'Congratulations! You have completed your training.', // Message displayed in the alert
      buttons: ['OK'], // Button to close the alert
    });

    await alert.present(); // Display the alert
  }
}

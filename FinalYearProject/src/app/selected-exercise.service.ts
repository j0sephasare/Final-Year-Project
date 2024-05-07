import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Exercise } from 'models/exercise.model'; // Import your Exercise model
import { Firestore, collection, doc, writeBatch } from '@angular/fire/firestore'; // Firestore imports

@Injectable({
  providedIn: 'root'
})
export class SelectedExerciseService {
  private selectedExercisesSubject = new BehaviorSubject<Exercise[]>([]); // Subject to hold selected exercises
  selectedExercises$ = this.selectedExercisesSubject.asObservable(); // Observable for selected exercises

  constructor(private firestore: Firestore) {} // Inject Firestore service

  // Method to add a new exercise to the selected list
  addExercise(exercise: Exercise) {
    console.log('Adding exercise:', exercise);
    const currentExercises = this.selectedExercisesSubject.value;
    this.selectedExercisesSubject.next([...currentExercises, exercise]); // Update the subject with the new exercise
    console.log('Current selected exercises:', this.selectedExercisesSubject.value);
  }

  // Method to save selected exercises to Firestore for a specific user
  saveSelectedExercisesToFirebase(userId: string, selectedExercises: Exercise[]) {
    // Get a reference to the user's exercises collection in Firestore
    const userExercisesRef = collection(this.firestore, `users/${userId}/savedExercises`);

    // Create a batch to perform all writes in a single  operation
    const batch = writeBatch(this.firestore);

    // Go through the selected exercises and prepare them for the batch operation
    selectedExercises.forEach((exercise) => {
      const exerciseRef = doc(userExercisesRef); // Create a new document reference
      batch.set(exerciseRef, {
        name: exercise.Name,
        description: exercise.Description,
        reps: exercise.reps,
        kg: exercise.kg,
  
      });
    });

    // Commit the batch
    return batch.commit().then(() => {
      console.log('All exercises saved successfully.');
    }).catch((error) => {
      console.error('Error saving exercises:', error);
    });

    // Clear the array after saving to Firestore
    this.clearSelectedExercises();
  }

  // Method to retrieve the currently selected exercises
  getSelectedExercises(): Exercise[] {
    return this.selectedExercisesSubject.value;
  }

  // Method to clear the selected exercises array
  clearSelectedExercises() {
    this.selectedExercisesSubject.next([]); // Set the subject to an empty array
  }
}

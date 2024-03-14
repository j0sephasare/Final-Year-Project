import { Injectable } from '@angular/core';
import { BehaviorSubject, from, map, Observable } from 'rxjs';
import { Exercise } from 'models/exercise.model';// Correct path to your Exercise model file
import { Firestore, collection, doc, getDoc, updateDoc, collectionData, deleteDoc, addDoc, query, where, getDocs} from '@angular/fire/firestore';
import { writeBatch } from 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class SelectedExerciseService {
  private selectedExercisesSubject = new BehaviorSubject<Exercise[]>([]);
  selectedExercises$ = this.selectedExercisesSubject.asObservable();

  constructor(private firestore: Firestore) {}

  addExercise(exercise: Exercise) {
    console.log('Adding exercise:', exercise);
    const currentExercises = this.selectedExercisesSubject.value;
    this.selectedExercisesSubject.next([...currentExercises, exercise]);
    console.log('Current selected exercises:', this.selectedExercisesSubject.value);
  }


  saveSelectedExercisesToFirebase(userId: string, selectedExercises: Exercise[]) {
    // Get a reference to the user's exercises collection in Firestore
    const userExercisesRef = collection(this.firestore, `users/${userId}/savedExercises`);
  
    // Create a batch to perform all writes in a single atomic operation
    const batch = writeBatch(this.firestore);
  
    // Go through the selected exercises and prepare them for the batch operation
    selectedExercises.forEach((exercise) => {
      const exerciseRef = doc(userExercisesRef); // Create a new document reference
      batch.set(exerciseRef, {
        name: exercise.Name,
        description: exercise.Description,
        reps: exercise.reps,
        kg: exercise.kg,
     
        // ...other properties you need to save
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
  

  getSelectedExercises(): Exercise[] {
    return this.selectedExercisesSubject.value;
  }

  clearSelectedExercises() {
    this.selectedExercisesSubject.next([]);
  }
}

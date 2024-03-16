import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercise } from 'models/exercise.model';
import { map } from 'rxjs/operators';
import { SaveExerciseData } from 'models/SaveExercise.model';
import { Firestore, collection, doc, getDoc, updateDoc, collectionData, deleteDoc, addDoc, query, where, getDocs,setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserExerciseService {
 

  constructor(private httpClient: HttpClient,private firestore: Firestore) {}

  getSavedExercises(userId: string): Observable<SaveExerciseData[]> {
    const userExercisesRef = collection(this.firestore, `users/${userId}/savedExercises`);
    return collectionData(userExercisesRef, { idField: '_id' }) as Observable<SaveExerciseData[]>;
  }

  // Update a specific saved exercise
  updateSavedExercise(userId: string, exerciseId: string, data: Partial<SaveExerciseData>): Promise<void> {
    const exerciseDocRef = doc(this.firestore, `users/${userId}/savedExercises/${exerciseId}`);
    return updateDoc(exerciseDocRef, data);
  }


  // Delete a specific saved exercise
  deleteSavedExercise(userId: string, exerciseId: string): Promise<void> {
    const exerciseDocRef = doc(this.firestore, `users/${userId}/savedExercises/${exerciseId}`);
    return deleteDoc(exerciseDocRef);
  }

  saveWorkout(workoutData: SaveExerciseData): Promise<void> {
    const userExercisesRef = collection(this.firestore, `users/${workoutData.userId}/savedExercises`);
    const exerciseRef = doc(userExercisesRef); // Create a new document reference for the workout
  
    return setDoc(exerciseRef, workoutData);
  }
  
}

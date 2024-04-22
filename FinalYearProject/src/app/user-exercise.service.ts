import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercise } from 'models/exercise.model';
import { map } from 'rxjs/operators';
import { SaveExerciseData } from 'models/SaveExercise.model';
import { Firestore, collection, doc, getDoc, updateDoc, collectionData, deleteDoc, addDoc, query, where, getDocs,setDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root',
})
export class UserExerciseService {
 

  constructor(private httpClient: HttpClient,private firestore: Firestore, private storage: Storage) {}

  getSavedExercises(userId: string): Observable<SaveExerciseData[]> {
    console.log(`Fetching saved exercises for user: ${userId}`);
    
    const userExercisesRef = collection(this.firestore, `users/${userId}/savedExercises`);
    return collectionData(userExercisesRef, { idField: '_id' }) as Observable<SaveExerciseData[]>;
  }

  updateSavedExercise(userId: string, exerciseId: string, data: Partial<SaveExerciseData>): Promise<void> {
    console.log(`Updating saved exercise for user: ${userId}, exerciseId: ${exerciseId}, with data:`, data);
    const exerciseDocRef = doc(this.firestore, `users/${userId}/savedExercises/${exerciseId}`);
    return updateDoc(exerciseDocRef, data);
  }

  deleteSavedExercise(userId: string, exerciseId: string): Promise<void> {
    console.log(`Deleting saved exercise for user: ${userId}, exerciseId: ${exerciseId}`);
    const exerciseDocRef = doc(this.firestore, `users/${userId}/savedExercises/${exerciseId}`);
    return deleteDoc(exerciseDocRef);
  }

  saveWorkout(workoutData: SaveExerciseData): Promise<void> {
    console.log(`Saving new workout for user: ${workoutData.userId}`, workoutData);
    const userExercisesRef = collection(this.firestore, `users/${workoutData.userId}/savedExercises`);
    const exerciseRef = doc(userExercisesRef); // Create a new document reference for the workout
    return setDoc(exerciseRef, workoutData);
  }
  async uploadImage(fileBlob: Blob, fileName: string): Promise<string> {
    // Generate a unique file path (e.g., 'uploads/image-<timestamp>.jpg')
    const filePath = `uploads/${Date.now()}_${fileName}`;
    const storageRef = ref(this.storage, filePath);

    // Upload the file to Firebase Storage
    await uploadBytes(storageRef, fileBlob);
    
    // Once upload is complete, get and return the download URL
    return await getDownloadURL(storageRef);
  }
}

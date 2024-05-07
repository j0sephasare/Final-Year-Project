import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercise } from 'models/exercise.model';
import { map } from 'rxjs/operators';
import { SaveExerciseData } from 'models/SaveExercise.model';
import { 
  Firestore, 
  collection, 
  doc, 
  getDoc, 
  updateDoc, 
  collectionData, 
  deleteDoc, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  setDoc // Import Firestore functionalities
} from '@angular/fire/firestore'; // Import Firestore functionalities
import { 
  Storage, 
  ref, 
  uploadBytes, 
  getDownloadURL // Import Storage functionalities
} from '@angular/fire/storage'; // Import Storage functionalities

@Injectable({
  providedIn: 'root',
})
export class UserExerciseService {
 
  constructor(
    private httpClient: HttpClient,
    private firestore: Firestore, // Inject Firestore
    private storage: Storage // Inject Storage
  ) {}

  // Retrieve saved exercises for a user
  getSavedExercises(userId: string): Observable<SaveExerciseData[]> {
    console.log(`Fetching saved exercises for user: ${userId}`);
    
    // Reference to the user's saved exercises collection
    const userExercisesRef = collection(this.firestore, `users/${userId}/savedExercises`);
    // Fetch data from Firestore as observable
    return collectionData(userExercisesRef, { idField: '_id' }) as Observable<SaveExerciseData[]>;
  }

  // Update a saved exercise for a user
  updateSavedExercise(userId: string, exerciseId: string, data: Partial<SaveExerciseData>): Promise<void> {
    console.log(`Updating saved exercise for user: ${userId}, exerciseId: ${exerciseId}, with data:`, data);
    // Reference to the specific exercise document
    const exerciseDocRef = doc(this.firestore, `users/${userId}/savedExercises/${exerciseId}`);
    // Update the document with new data
    return updateDoc(exerciseDocRef, data);
  }

  // Delete a saved exercise for a user
  deleteSavedExercise(userId: string, exerciseId: string): Promise<void> {
    console.log(`Deleting saved exercise for user: ${userId}, exerciseId: ${exerciseId}`);
    // Reference to the specific exercise document
    const exerciseDocRef = doc(this.firestore, `users/${userId}/savedExercises/${exerciseId}`);
    // Delete the document
    return deleteDoc(exerciseDocRef);
  }

  // Save a workout for a user
  saveWorkout(workoutData: SaveExerciseData): Promise<void> {
    console.log(`Attempting to save new workout for user: ${workoutData.userId}`);
    console.log(`Saving new workout for user: ${workoutData.userId}`, workoutData);
    // Reference to the user's saved exercises collection
    const userExercisesRef = collection(this.firestore, `users/${workoutData.userId}/savedExercises`);
    // Create a new document reference for the workout
    const exerciseRef = doc(userExercisesRef);
    // Set the document data
    return setDoc(exerciseRef, workoutData);
  }

  // Upload an image to Firebase Storage
  async uploadImage(fileBlob: Blob, fileName: string, userId: string): Promise<string> {
    console.log(`Starting upload for user: ${userId} with filename: ${fileName}`);
    const filePath = `uploads/${userId}/${fileName}`;
    console.log(`File path for upload: ${filePath}`);
  
    const storageRef = ref(this.storage, filePath); // Reference to the file in Storage
    try {
      console.log('Attempting to upload file to Firebase Storage');
      await uploadBytes(storageRef, fileBlob); // Upload the file
      console.log(`File uploaded successfully to: ${filePath}`);
  
      console.log('Attempting to retrieve download URL');
      const downloadURL = await getDownloadURL(storageRef); // Get the download URL
      console.log(`Download URL retrieved: ${downloadURL}`);
  
      return downloadURL;
    } catch (error) {
      console.error('Error occurred during upload to Firebase Storage:', error);
      throw error;
    }
  }  
}

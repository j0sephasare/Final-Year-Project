import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, map, Observable } from 'rxjs';
import { ExerciseData } from 'models/exercise.model';
import { Firestore, collection, doc, getDoc, updateDoc, collectionData, deleteDoc, addDoc, query, where, getDocs} from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Exercise } from 'models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  constructor(private firestore: Firestore) {}

  // Function to retrieve exercises from Firestore
  getExercises(): Observable<Exercise[]> {
    // Reference to the 'exercises' collection in Firestore
    const exercisesRef = collection(this.firestore, 'exercises');
    
    // Fetch exercises from Firestore and map them to Exercise objects
    return collectionData(exercisesRef, { idField: 'id' }) as Observable<Exercise[]>;
  }
}

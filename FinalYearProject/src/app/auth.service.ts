import { Injectable } from '@angular/core';
import {
  Auth, // Used to get the current user and subscribe to the auth state.
  createUserWithEmailAndPassword, onAuthStateChanged, // Used to create a user in Firebase auth.
  sendPasswordResetEmail, // Used to send a password reset email.
  signInWithEmailAndPassword, // Used to sign in a user with email and password.
  signOut, // Used to sign out a user.
} from '@angular/fire/auth';
import { doc, Firestore, setDoc,updateDoc,getDoc, collection, query, where, getDocs } from '@angular/fire/firestore'; // Used to interact with Firestore databse. We store user info in Firestore.
import { AngularFireStorage, } from '@angular/fire/compat/storage';
import { Observable, from,switchMap    } from 'rxjs';
import { finalize, take,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root', // This service is provided in the root injector (AppModule). This means that the service will be available to the entire application.
})
export class AuthService {
  
  // Inject Firestore service. We need it to create a user profile in Firestore.
  constructor(private auth: Auth, private firestore: Firestore,  private storage: AngularFireStorage ) {}
  getCurrentUser(): Observable<any> {
    return new Observable(subscriber => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        subscriber.next(user);
      }, (error) => {
        subscriber.error(error);
      });

      // Return the unsubscribe function
      return { unsubscribe };
    });
  }
  updateUserProfilePicture(uid: string, downloadUrl: string): Promise<void> {
    const ref = doc(this.firestore, `users/${uid}`);
    return setDoc(ref, { picture: downloadUrl }, { merge: true });
  }
  
  // Sign up with email/password. Creates user in Firebase auth and adds user info to Firestore database
  async register({ email, password }: { email: string; password: string }) {
    try {
      const credentials = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      // In case the user is created successfully, create a document in `users` collection
      const ref = doc(this.firestore, `users/${credentials.user.uid}`);
      setDoc(ref, { email }); // Set the document. Data is written to the database.
      return credentials;
    } catch (e) {
      console.log("Error in register: ", e);
      return null;
    }
  }
  isUsernameTaken(username: string): Observable<boolean> {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('username', '==', username));
    return from(getDocs(q)).pipe(
      take(1),
      map(querySnapshot => !querySnapshot.empty)
    );
  }
  // New method to update the user's username
  async updateUsername(uid: string, newUsername: string): Promise<void> {
    const usernameTaken = await this.isUsernameTaken(newUsername).pipe(take(1)).toPromise();
  
    if (!usernameTaken) {
      const userRef = doc(this.firestore, `users/${uid}`);
      return updateDoc(userRef, { username: newUsername });
    } else {
      throw new Error('Username is already taken.');
    }
  }
  // Sign in with email/password. We pass the email and password as parameters.
  async login({ email, password }: { email: string; password: string }) {
    try {
      // Sign in user. If successful, the user object is returned. Otherwise, null is returned.
      const credentials = await signInWithEmailAndPassword(
        this.auth, // <-- Injected AngularFireAuth service
        email, // <-- Email passed as parameter
        password // <-- Password passed as parameter
      );
      return credentials; // <-- Return the user object
    } catch (e) {
      console.log("Error in register: ", e);
      return null;
    }
  }
  uploadProfilePicture(file: File, userId: string): Observable<string | null> {
    console.log('Attempting to upload profile picture for user:', userId);
    const filePath = `profile_pictures/${userId}`; // The path in the storage bucket where the profile picture will be saved
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);

    // Return an observable that emits the download URL upon completion
    return new Observable<string | null>((subscriber) => {
      uploadTask.snapshotChanges().pipe(
        finalize(async () => {
          const downloadURL = await fileRef.getDownloadURL().toPromise();
          subscriber.next(downloadURL);
          subscriber.complete();
        })
      ).subscribe();
    });
  }
  getUserProfile(uid: string): Observable<any> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    return new Observable(subscriber => {
      getDoc(userDocRef)
        .then(docSnap => {
          if (docSnap.exists()) {
            let userData = docSnap.data();
            userData['uid'] = uid;  // Ensure uid is set
            subscriber.next(userData);
          } else {
            subscriber.next(null);  // Handle case where user data doesn't exist
          }
        })
        .catch(error => subscriber.error(error));
    });
  }
  async saveProfilePicture(userId: string, downloadURL: string) {
    const userDocRef = doc(this.firestore, `users/${userId}`);
    await setDoc(userDocRef, { profilePicture: downloadURL }, { merge: true });
  }
  
  resetPw(email: string) {
    // Pass in athentication private and email address
    return sendPasswordResetEmail(this.auth, email);
  }

  logout() {
    return signOut(this.auth);
  }
}
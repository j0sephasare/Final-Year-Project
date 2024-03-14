import { Injectable } from '@angular/core';
import {
  Auth, // Used to get the current user and subscribe to the auth state.
  createUserWithEmailAndPassword, onAuthStateChanged, // Used to create a user in Firebase auth.
  sendPasswordResetEmail, // Used to send a password reset email.
  signInWithEmailAndPassword, // Used to sign in a user with email and password.
  signOut, // Used to sign out a user.
} from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore'; // Used to interact with Firestore databse. We store user info in Firestore.
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root', // This service is provided in the root injector (AppModule). This means that the service will be available to the entire application.
})
export class AuthService {
  // Inject Firestore service. We need it to create a user profile in Firestore.
  constructor(private auth: Auth, private firestore: Firestore) {}
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

  resetPw(email: string) {
    // Pass in athentication private and email address
    return sendPasswordResetEmail(this.auth, email);
  }

  logout() {
    return signOut(this.auth);
  }
}
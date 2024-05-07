import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectedExerciseService } from '../selected-exercise.service';
import { UserExerciseService } from '../user-exercise.service';
import { SaveExerciseData } from 'models/SaveExercise.model';
import { Exercise } from 'models/exercise.model';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { WorkoutService } from '../workout.service';
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-finish-workout',
  templateUrl: './finish-workout.page.html',
  styleUrls: ['./finish-workout.page.scss'],
})
export class FinishWorkoutPage implements OnInit {
  // Properties to hold workout details
  workoutTitle: string = '';
  description: string = '';
  duration: string = '';
  volume: number = 0;
  sets: number = 0;
  userId: string | undefined;
  photo: Photo | null = null;
  imageUrl: string | null = null;
  photoPreview: string | ArrayBuffer | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private selectedExercisesService: SelectedExerciseService,
    private platform: Platform,
    private afAuth: AngularFireAuth,
    private workoutService: WorkoutService,
    private userExerciseService: UserExerciseService,
    private timerService: TimerService
  ) { }

  ngOnInit() {
    // Retrieve state from navigation extras
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as SaveExerciseData | undefined;

    if (state) {
      // Initialize properties with state data
      this.volume = state.volume ?? 0;
      this.sets = state.sets ?? 0;
      this.duration = state.duration;
      this.userId = state.userId;
    } else {
      console.error('State object is missing in navigation extras.');
    }

    console.log('State object received:', state);
  }

  // Utility function to get current timestamp
  getCurrentTimestamp(): string {
    return new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  // Function to save workout
  async saveWorkout(imageUrl?: string | null): Promise<void> {
    // Map selected exercises to the format expected by SaveExerciseData
    const exercisesForSave: SaveExerciseData['exercises'] = this.selectedExercisesService.getSelectedExercises().map(exercise => ({
      name: exercise.Name,
      sets: exercise.setsCounter ?? 1,
      reps: exercise.reps ?? 0
    }));

    // Construct SaveExerciseData object
    const workoutData: SaveExerciseData = {
      userId: this.userId,
      workoutTitle: this.workoutTitle,
      description: this.description,
      duration: this.duration,
      volume: this.volume,
      sets: this.sets,
      timestamp: this.getCurrentTimestamp(),
      exercises: exercisesForSave,
      photoURL: this.imageUrl ?? undefined
    };
    if (imageUrl) {
      workoutData.photoURL = imageUrl;
    }

    try {
      // Save workout data via the user exercise service
      await this.userExerciseService.saveWorkout(workoutData);
      console.log('Workout saved successfully');
  
      // Reset the workout state after saving
      this.workoutService.resetWorkoutState();
  
      // Reset the timer via the timer service (ensure it's injected in the constructor)
      this.timerService.resetTimer();
  
      // Navigate back to the home page
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error saving workout:', error);
    }
  }

  // Function to discard workout
  discardWorkout(): void {
    if (window.confirm('Are you sure you want to discard this workout?')) {
      this.router.navigate(['/home']);
    }
  }

 // Method to handle taking or selecting a photo
 async takeOrSelectPhoto() {
  console.log('takeOrSelectPhoto method called');
  if (!this.platform.is('hybrid')) {
    this.handleFileInput(); // Web platform
  } else {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
        quality: 90
      });
      console.log('Photo taken', photo);
      const imageUrl = await this.uploadPhoto(photo); // Upload the photo and retrieve URL
      if (imageUrl) {
        this.imageUrl = imageUrl; // Store the image URL for later
      }
    } catch (error) {
      console.error('Error taking or selecting photo:', error);
    }
  }
}

  // Function to handle file input for web platform
  handleFileInput() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        this.displaySelectedImage(file);
        // Upload file and then save workout
        const imageUrl = await this.uploadFileForWeb(file);
        if (imageUrl) {
          this.imageUrl = imageUrl;
        }
      }
    };
    input.click();
  }
  // Function to display selected image
  displaySelectedImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.photoPreview = e.target.result;
      this.photo = {
        format: file.type.split('/')[1],
        webPath: e.target.result,
        path: undefined,
        exif: undefined,
        saved: false
      };
    };
    reader.readAsDataURL(file);
  }

  async uploadFileForWeb(file: File): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    if (user) {
      try {
        const blob = file;
        const filename = `image-${new Date().getTime()}.${file.type.split('/')[1]}`;
        const imageUrl = await this.userExerciseService.uploadImage(blob, filename, user.uid);
        console.log(`Image uploaded, image URL: ${imageUrl}`);
        this.imageUrl = imageUrl;
        return imageUrl; // Return uploaded image URL
      } catch (error) {
        console.error('Error during image upload for web:', error);
        return null;
      }
    } else {
      console.error('No authenticated user found for image upload.');
      return null;
    }
  }
 // Updated photo upload method
async uploadPhoto(photo: Photo): Promise<string | null> {
  console.log('uploadPhoto method called');
  const user = await this.afAuth.currentUser;
  if (user) {
    console.log(`Authenticated user, UID: ${user.uid}`);
    try {
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();
      console.log('Blob created from the photo', blob);

      const filename = `image-${new Date().getTime()}.${photo.format}`;
      console.log(`Generated filename: ${filename}`);

      const imageUrl = await this.userExerciseService.uploadImage(blob, filename, user.uid);
      console.log(`Image uploaded, image URL: ${imageUrl}`);

      this.imageUrl = imageUrl;
      this.photoPreview = this.imageUrl;
      return imageUrl; // Return uploaded image URL
    } catch (error) {
      console.error('Error during photo upload:', error);
      return null;
    }
  } else {
    console.error('No authenticated user found for photo upload.');
    return null;
  }
}
}
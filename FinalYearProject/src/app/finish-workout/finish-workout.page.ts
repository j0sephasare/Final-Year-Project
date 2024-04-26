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
@Component({
  selector: 'app-finish-workout',
  templateUrl: './finish-workout.page.html',
  styleUrls: ['./finish-workout.page.scss'],
})
export class FinishWorkoutPage implements OnInit {
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
    private userExerciseService: UserExerciseService
  ) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    // Adjust the cast to SaveExerciseData since that's the interface you're using
    const state = navigation?.extras.state as SaveExerciseData | undefined;

    if (state) {
      // Provide default values if state properties are undefined
      this.volume = state.volume ?? 0; // Use nullish coalescing operator
      this.sets = state.sets ?? 0;
      this.duration = state.duration; // Since duration is a string, assign it directly
      this.userId = state.userId;
    } else {
      // Handle the case when state is undefined
      console.error('State object is missing in navigation extras.');
    }

    console.log('State object received:', state);
  }

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

  async saveWorkout(imageUrl?: string | null): Promise<void> {


    // Map the selected exercises to the format expected by SaveExerciseData
    const exercisesForSave: SaveExerciseData['exercises'] = this.selectedExercisesService.getSelectedExercises().map(exercise => ({
      name: exercise.Name,
      sets: exercise.setsCounter ?? 1,
      reps: exercise.reps ?? 0
    }));

    // Construct the full SaveExerciseData object
    const workoutData: SaveExerciseData = {
      userId: this.userId,
      workoutTitle: this.workoutTitle,
      description: this.description,
      duration: this.duration,
      volume: this.volume,
      sets: this.sets,
      timestamp: this.getCurrentTimestamp(), // Get the current timestamp
      exercises: exercisesForSave
    };
    if (imageUrl) {
      workoutData.photoURL = imageUrl;
    }

    // Now use workoutData with photoURL property to save to Firestore
    try {
      await this.userExerciseService.saveWorkout(workoutData);
      console.log('Workout saved successfully');
      this.router.navigate(['/home']).then(() => {

        this.workoutService.resetWorkoutState(); // Communicate to WeightworkoutsPage to reset
      });
    } catch (error) {
      console.error('Error saving workout:', error);
    }

  }
  discardWorkout(): void {
    if (window.confirm('Are you sure you want to discard this workout?')) {
      this.router.navigate(['/home']);
    }
  }

  async takeOrSelectPhoto() {
    console.log('takeOrSelectPhoto method called');
    if (!this.platform.is('hybrid')) {
      // For web platform
      this.handleFileInput();
    } else {
      // For native platform
      try {
        const photo = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          source: CameraSource.Prompt,
          quality: 90
        });
        console.log('Photo taken', photo);
        this.uploadPhoto(photo); // Ensure this line is present
      } catch (error) {
        console.error('Error taking or selecting photo:', error);
      }
    }
  }


  handleFileInput() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = () => {
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        this.displaySelectedImage(file); // Call a new method to handle the file
      }
    };
    input.click();
  }
  displaySelectedImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.photoPreview = e.target.result; // Use a new property 'photoPreview'
      // Update the photo object for later upload if needed
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

  async uploadPhoto(photo: Photo) {
    console.log('uploadPhoto method called');
    const user = await this.afAuth.currentUser;
    if (user) {
      console.log(`Authenticated user, UID: ${user.uid}`);
      try {
        console.log(`Photo path: ${photo.webPath}`);
        const response = await fetch(photo.webPath!);
        const blob = await response.blob();
        console.log('Blob created from the photo', blob);

        const filename = `image-${new Date().getTime()}.${photo.format}`;
        console.log(`Generated filename: ${filename}`);

        const imageUrl = await this.userExerciseService.uploadImage(blob, filename, user.uid);
        console.log(`Image uploaded, image URL: ${imageUrl}`);

        this.imageUrl = imageUrl;
        this.photoPreview = this.imageUrl;
      } catch (error) {
        console.error('Error during photo upload:', error);
      }
    } else {
      console.error('No authenticated user found for photo upload.');
    }
  }



}

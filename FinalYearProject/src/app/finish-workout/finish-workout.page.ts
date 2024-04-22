import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectedExerciseService } from '../selected-exercise.service';
import { UserExerciseService } from '../user-exercise.service';
import { SaveExerciseData } from 'models/SaveExercise.model';
import { Exercise } from 'models/exercise.model';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private selectedExercisesService: SelectedExerciseService,
    private userExerciseService: UserExerciseService
  ) {}

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

  async saveWorkout(imageUrl?: string): Promise<void> {
   
    
    // Map the selected exercises to the format expected by SaveExerciseData
    const exercisesForSave: SaveExerciseData['exercises'] = this.selectedExercisesService.getSelectedExercises().map(exercise => ({
      name: exercise.Name,
      sets: exercise.setsCounter ?? 1, // Ensure there's a default value if undefined
      reps: exercise.reps ?? 0
    }));
  
    // Construct the full SaveExerciseData object
    const workoutData: SaveExerciseData = {
      userId: this.userId,
      workoutTitle: this.workoutTitle,
      description: this.description,
      duration: this.duration,
      volume: this.volume, // This assumes you calculate the volume elsewhere
      sets: this.sets, // This assumes you calculate the total sets elsewhere
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
      this.router.navigate(['/home']);
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
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt, // prompt the user to pick or take a photo
        quality: 90 // high-quality photos
      });
      this.uploadPhoto(photo);
    } catch (error) {
      console.error('Error taking or selecting photo:', error);
    }
  }

  async uploadPhoto(photo: Photo) {
    try {
      // Fetch the photo file as a blob
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();
      // Generate a unique filename for the image, e.g., 'image-1629558904593.jpeg'
      const filename = `image-${new Date().getTime()}.${photo.format}`;
      // Pass both the blob and the filename to the uploadImage function
      const imageUrl = await this.userExerciseService.uploadImage(blob, filename);
      // After obtaining the imageUrl, you can now proceed to save the workout
      this.saveWorkout(imageUrl);
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  }

  
}

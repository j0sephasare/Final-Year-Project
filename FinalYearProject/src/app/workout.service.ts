import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  // Subject to trigger workout reset
  private resetWorkoutSubject = new BehaviorSubject<boolean>(false);

  // Additional properties to represent the workout state
  private currentWorkoutTitle = new BehaviorSubject<string>('');
  private currentExercises = new BehaviorSubject<any[]>([]);
  private currentVolume = new BehaviorSubject<number>(0);
  private currentSets = new BehaviorSubject<number>(0);
  private currentTimer = new BehaviorSubject<number>(0);

  constructor() {}

  // Method to trigger the reset of workout state
  resetWorkoutState() {
    this.resetWorkoutSubject.next(true); // Trigger reset observable
    // Reset individual properties to their initial values
    this.currentWorkoutTitle.next('');
    this.currentExercises.next([]);
    this.currentVolume.next(0);
    this.currentSets.next(0);
    this.currentTimer.next(0);
  }

  // Observable for the reset trigger
  getResetWorkoutObservable() {
    return this.resetWorkoutSubject.asObservable(); // Provide an observable to listen for reset trigger
  }

  // Observables for workout state properties
  getWorkoutTitleObservable() {
    return this.currentWorkoutTitle.asObservable();
  }

  getExercisesObservable() {
    return this.currentExercises.asObservable();
  }

  getVolumeObservable() {
    return this.currentVolume.asObservable();
  }

  getSetsObservable() {
    return this.currentSets.asObservable();
  }

  getTimerObservable() {
    return this.currentTimer.asObservable();
  }

  // Call this function to clear the reset trigger
  clearResetTrigger() {
    this.resetWorkoutSubject.next(false); // Clear the reset trigger
  }

  // Additional methods to modify state properties
  updateWorkoutTitle(title: string) {
    this.currentWorkoutTitle.next(title);
  }

  updateExercises(exercises: any[]) {
    this.currentExercises.next(exercises);
  }

  updateVolume(volume: number) {
    this.currentVolume.next(volume);
  }

  updateSets(sets: number) {
    this.currentSets.next(sets);
  }

  updateTimer(timer: number) {
    this.currentTimer.next(timer);
  }
}

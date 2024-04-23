// workout.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private resetWorkoutSubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  resetWorkoutState() {
    this.resetWorkoutSubject.next(true);
  }

  getResetWorkoutObservable() {
    return this.resetWorkoutSubject.asObservable();
  }

  // Call this function from the WeightworkoutsPage when the reset logic has been executed
  clearResetTrigger() {
    this.resetWorkoutSubject.next(false);
  }
}

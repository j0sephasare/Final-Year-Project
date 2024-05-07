import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private timer$: Observable<{ minutes: number; seconds: number }>; // Observable representing the timer
  private timerSubject: BehaviorSubject<{ minutes: number; seconds: number }>; // Subject to emit timer updates

  constructor() {
    // Initialize the BehaviorSubject with initial timer values
    this.timerSubject = new BehaviorSubject({ minutes: 0, seconds: 0 });

    // Create the timer observable using interval to emit every second
    this.timer$ = interval(1000).pipe(
      map((seconds) => {
        // Calculate minutes and remaining seconds
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return { minutes, seconds: remainingSeconds };
      })
    );

    // Subscribe to the timer observable to update the subject with timer values
    this.timer$.subscribe((time) => {
      this.timerSubject.next(time);
    });
  }

  // Function to reset the timer to 0:0
  resetTimer() {
    this.timerSubject.next({ minutes: 0, seconds: 0 });
  }

  // Function to get the timer as an observable
  getTimer(): Observable<{ minutes: number; seconds: number }> {
    return this.timerSubject.asObservable();
  }
}

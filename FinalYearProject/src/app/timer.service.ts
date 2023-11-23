// timer.service.ts
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private timer$: Observable<{ minutes: number; seconds: number }>;
  private timerSubject: BehaviorSubject<{ minutes: number; seconds: number }>;

  constructor() {
    this.timerSubject = new BehaviorSubject({ minutes: 0, seconds: 0 });

    this.timer$ = interval(1000).pipe(
      map((seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return { minutes, seconds: remainingSeconds };
      })
    );

    this.timer$.subscribe((time) => {
      this.timerSubject.next(time);
    });
  }

  getTimer(): Observable<{ minutes: number; seconds: number }> {
    return this.timerSubject.asObservable();
  }
}

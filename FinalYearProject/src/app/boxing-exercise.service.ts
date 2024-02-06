import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoxingExerciseService {
  private baseUrl = 'http://localhost:4000/BoxingExercises'; 

  constructor(private http: HttpClient) {}

  getBoxingExercises(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}

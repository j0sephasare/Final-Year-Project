import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercise } from 'models/exercise.model';
import { SaveExerciseData } from 'models/SaveExercise.model';
@Injectable({
  providedIn: 'root',
})
export class UserExerciseService {
  private apiUrl = 'http://localhost:4000/SavedExercises';

  constructor(private httpClient: HttpClient) {}

  saveExercise(data: SaveExerciseData): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(`${this.apiUrl}`, data, { observe: 'response' });
  }
}

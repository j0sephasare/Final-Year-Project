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

  getSavedExercises(userId: string): Observable<SaveExerciseData[]> {
    return this.httpClient.get<SaveExerciseData[]>(`${this.apiUrl}/${userId}`);
  }
  updateSavedExercise(id: string, data: SaveExerciseData): Observable<HttpResponse<any>> {
    return this.httpClient.put<HttpResponse<any>>(`${this.apiUrl}/${id}`, data, { observe: 'response' });
  }

  // Method to delete a saved exercise
  deleteSavedExercise(id: string): Observable<HttpResponse<any>> {
    return this.httpClient.delete<HttpResponse<any>>(`${this.apiUrl}/${id}`, { observe: 'response' });
  }
  
}

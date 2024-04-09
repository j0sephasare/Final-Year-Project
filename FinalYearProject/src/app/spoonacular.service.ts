import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpoonacularService {
  private apiKey = '34d71b21f34f4a8c8ae34b3df65dc431';
  private baseUrl = 'https://api.spoonacular.com';

  constructor(private http: HttpClient) { }

  getRecipesByMealTypeAndIngredients(ingredients: string[], mealType: string): Observable<any> {
    const params = {
      ingredients: ingredients.join(','),
      number: '5',
      type: mealType,
      apiKey: this.apiKey
    };
    return this.http.get(`${this.baseUrl}/recipes/complexSearch`, { params });
  }
  getRecipesByIngredients(ingredients: string[]) {
    const query = ingredients.join(',');
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&apiKey=34d71b21f34f4a8c8ae34b3df65dc431`;
    return this.http.get<any>(url); // Ensure to replace 'any' with the appropriate interface
  }

  getRecipeDetails(recipeId: number): Observable<any> {
    const params = {
      apiKey: this.apiKey
    };
    return this.http.get(`${this.baseUrl}/recipes/${recipeId}/information`, { params });
  }
}

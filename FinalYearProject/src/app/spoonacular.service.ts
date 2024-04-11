import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Query } from 'mongoose';
interface Recipe {
  id: number;
  title: string;
  image: string;
  // ... other properties of the recipe
}
interface SpoonacularSearchResponse {
  searchResults: Array<{
    name: string;
    results: Recipe[];
  }>;
  // ... other properties of the search response
}
interface RecipeSearchResponse {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
}
@Injectable({
  providedIn: 'root'
})

export class SpoonacularService {
  private apiKey = '34d71b21f34f4a8c8ae34b3df65dc431';
  private baseUrl = 'https://api.spoonacular.com';

  constructor(private http: HttpClient) { }

  getRecipesByMealTypeAndIngredients(ingredients: string[], mealType: string): Observable<RecipeSearchResponse> {
    const params = {
      ingredients: ingredients.join(','),
      number: '5',
      type: mealType,
      apiKey: this.apiKey
    };
    return this.http.get<RecipeSearchResponse>(`${this.baseUrl}/recipes/complexSearch`, { params });
  }
  
  getRecipesByIngredients(ingredients: string[]): Observable<RecipeSearchResponse> {
    const query = ingredients.join(',');
    const url = `${this.baseUrl}/recipes/findByIngredients?ingredients=${query}&apiKey=${this.apiKey}`;
    return this.http.get<RecipeSearchResponse>(url);
  }
  getRecipes(query: string): Observable<SpoonacularSearchResponse> {
    const url = `${this.baseUrl}/food/search?query=${query}&number=10&apiKey=${this.apiKey}`;
    return this.http.get<SpoonacularSearchResponse>(url);
  }

  getRecipeDetails(recipeId: number): Observable<any> {
    const params = {
      apiKey: this.apiKey
    };
    return this.http.get(`${this.baseUrl}/recipes/${recipeId}/information`, { params });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface defining the structure of a recipe
interface Recipe {
  id: number;
  title: string;
  image: string;
  // ... other properties of the recipe
}

// Interface defining the structure of the search response from Spoonacular
interface SpoonacularSearchResponse {
  searchResults: Array<{
    name: string;
    results: Recipe[];
  }>;
  // ... other properties of the search response
}

// Interface defining the structure of a recipe search response
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
  private apiKey = '34d71b21f34f4a8c8ae34b3df65dc431'; // Spoonacular API key
  private baseUrl = 'https://api.spoonacular.com'; // Spoonacular API base URL

  constructor(private http: HttpClient) { }

  // Function to get recipes by meal type and ingredients
  getRecipesByMealTypeAndIngredients(ingredients: string[], mealType: string): Observable<RecipeSearchResponse> {
    const params = {
      ingredients: ingredients.join(','), // Convert array of ingredients to comma-separated string
      number: '5', // Number of recipes to fetch
      type: mealType, // Type of meal
      apiKey: this.apiKey // API key
    };
    return this.http.get<RecipeSearchResponse>(`${this.baseUrl}/recipes/complexSearch`, { params });
  }
  
  // Function to get recipes by ingredients
  getRecipesByIngredients(ingredients: string[]): Observable<RecipeSearchResponse> {
    const query = ingredients.join(','); // Convert array of ingredients to comma-separated string
    const url = `${this.baseUrl}/recipes/findByIngredients?ingredients=${query}&apiKey=${this.apiKey}`;
    return this.http.get<RecipeSearchResponse>(url);
  }
  
  // Function to search for recipes
  getRecipes(query: string): Observable<SpoonacularSearchResponse> {
    const url = `${this.baseUrl}/food/search?query=${query}&number=10&apiKey=${this.apiKey}`;
    return this.http.get<SpoonacularSearchResponse>(url);
  }

  // Function to get details of a specific recipe
  getRecipeDetails(recipeId: number): Observable<any> {
    const params = {
      apiKey: this.apiKey
    };
    return this.http.get(`${this.baseUrl}/recipes/${recipeId}/information`, { params });
  }
}

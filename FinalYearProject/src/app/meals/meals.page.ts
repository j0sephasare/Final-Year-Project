import { Component } from '@angular/core';
import { SpoonacularService } from '../spoonacular.service';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
})
export class MealsPage {
  ingredients: string = '';
  breakfastRecipes: any[] = [];
  lunchRecipes: any[] = [];
  dinnerRecipes: any[] = [];
  selectedRecipeDetails: any = null;
  constructor(private spoonacularService: SpoonacularService) {}

  searchRecipes() {
    if (!this.ingredients) {
      console.error('No ingredients provided');
      return;
    }
  
    // Clear previous recipes before new search
    this.breakfastRecipes = [];
    this.lunchRecipes = [];
    this.dinnerRecipes = [];
  
    const ingredientsArray = this.ingredients.split(',').map(ingredient => ingredient.trim());
  
    this.spoonacularService.getRecipesByIngredients(ingredientsArray)
      .subscribe(data => {
        // Assuming data.results is an array of recipes
        const recipes = data.results;
  
        // You would need to categorize these recipes by meal type, if your API allows it.
        // For now, let's just put all recipes in the breakfast category as an example.
        this.breakfastRecipes = recipes;
        // If you have a way to distinguish meal types, you can separate them accordingly
        // this.lunchRecipes = separateByMealType(recipes, 'lunch');
        // this.dinnerRecipes = separateByMealType(recipes, 'dinner');
      });
  }
  
  getRecipeDetails(recipeId: number) {
    this.spoonacularService.getRecipeDetails(recipeId)
      .subscribe(data => {
        this.selectedRecipeDetails = data;
      });
  }
}

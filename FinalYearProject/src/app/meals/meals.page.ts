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
    ['breakfast', 'lunch', 'dinner'].forEach(mealType => {
      this.spoonacularService.getRecipesByMealTypeAndIngredients(this.ingredients.split(','), mealType)
        .subscribe(data => {
          if (mealType === 'breakfast') {
            this.breakfastRecipes = data.results;
          } else if (mealType === 'lunch') {
            this.lunchRecipes = data.results;
          } else if (mealType === 'dinner') {
            this.dinnerRecipes = data.results;
          }
        });
    });
  }
  getRecipeDetails(recipeId: number) {
    this.spoonacularService.getRecipeDetails(recipeId)
      .subscribe(data => {
        this.selectedRecipeDetails = data;
      });
  }
}

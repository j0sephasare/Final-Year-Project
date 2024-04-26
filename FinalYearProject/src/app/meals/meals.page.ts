import { Component } from '@angular/core';
import { SpoonacularService } from '../spoonacular.service';
import { RecipeSearchResponse } from 'models/search-response.model';

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
  recipes: any[] = [];



 searchRecipes() {
  if (!this.ingredients) {
    console.error('No ingredients provided');
    return;
  }

  this.spoonacularService.getRecipes(this.ingredients).subscribe(response => {
    // Find the 'Recipes' section in the response
    const recipesSection = response.searchResults.find(section => section.name === 'Recipes');
    if (recipesSection && recipesSection.results.length) {
      // Update the state with the new recipes
      this.recipes = recipesSection.results;

      // Log the recipes to the console
      console.log('RecipesSection Results:', recipesSection.results);

      // Log the title of each recipe to the console
      this.recipes.forEach((recipe, index) => {
        console.log(`Recipe ${index} Title:`, recipe.title);
      });
    } else {
      // Handle the case when no recipes are found or the section does not exist
      this.recipes = [];
      console.log('No recipes found for this query.');
    }
  }, error => {
    console.error('Error fetching recipes:', error);
  });



  this.spoonacularService.getRecipes(this.ingredients).subscribe(response => {
    // Find the 'Recipes' section in the response
    const recipesSection = response.searchResults.find(section => section.name === 'Recipes');
    if (recipesSection && recipesSection.results.length) {
      // Update the state with the new recipes
      this.recipes = recipesSection.results;
    } else {
      // Handle the case when no recipes are found or the section does not exist
      this.recipes = [];
      console.log('No recipes found for this query.');
    }
  }, error => {
    console.error('Error fetching recipes:', error);
  });
}

// ... rest of your code
searchForRecipes(query: string) {
  this.spoonacularService.getRecipes(query).subscribe(response => {
    const recipeSection = response.searchResults.find(section => section.name === "Recipes");
    if (recipeSection) {
      this.recipes = recipeSection.results;
    } else {
      console.log('No recipes found for this query.');
      this.recipes = [];
    }
  }, error => {
    console.error('Error fetching recipes:', error);
  });
}

  
  
  
getRecipeDetails(recipeId: number) {
  this.spoonacularService.getRecipeDetails(recipeId).subscribe(data => {
    this.selectedRecipeDetails = data;
    console.log('Selected Recipe Details:', this.selectedRecipeDetails);
  }, error => {
    console.error('Error fetching recipe details:', error);
  });
}
}

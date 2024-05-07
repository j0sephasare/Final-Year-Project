import { Component } from '@angular/core';
import { SpoonacularService } from '../spoonacular.service'; // Import Spoonacular service
import { RecipeSearchResponse } from 'models/search-response.model'; // Import model for search response

@Component({
  selector: 'app-meals',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
})
export class MealsPage {
  // Properties to store user inputs and recipe data
  ingredients: string = ''; // Ingredients input
  breakfastRecipes: any[] = []; // Array to store breakfast recipes
  lunchRecipes: any[] = []; // Array to store lunch recipes
  dinnerRecipes: any[] = []; // Array to store dinner recipes
  selectedRecipeDetails: any = null; // Details of the selected recipe
  recipes: any[] = []; // Array to store recipes

  constructor(private spoonacularService: SpoonacularService) {} // Inject Spoonacular service

  // Function to search for recipes based on ingredients
  searchRecipes() {
    // Check if ingredients input is provided
    if (!this.ingredients) {
      console.error('No ingredients provided');
      return;
    }

    // Call Spoonacular service to get recipes based on ingredients
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
  }

  // Function to search for recipes based on a query
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

  // Function to get details of a selected recipe
  getRecipeDetails(recipeId: number) {
    this.spoonacularService.getRecipeDetails(recipeId).subscribe(data => {
      this.selectedRecipeDetails = data;
      console.log('Selected Recipe Details:', this.selectedRecipeDetails);
    }, error => {
      console.error('Error fetching recipe details:', error);
    });
  }
}

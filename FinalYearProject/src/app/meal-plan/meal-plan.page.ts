import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface EdamamResponse {
  hints: Array<{
    food: {
      label: string;
      nutrients: {
        ENERC_KCAL?: number; // Calories
        PROCNT?: number; // Protein
        FAT?: number; // Fat
        CHOCDF?: number; // Carbs
        // Add other nutrients as needed
      };
      image: string; // Image URL
    };
  }>;
}

@Component({
  selector: 'app-meal-plan',
  templateUrl: './meal-plan.page.html',
  styleUrls: ['./meal-plan.page.scss']
})
export class MealPlanPage implements OnInit {
  breakfastMeals: any[] = [];
  lunchMeals: any[] = [];
  dinnerMeals: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Define queries for breakfast, lunch, and dinner
    const breakfastQuery = 'breakfast';
    const lunchQuery = 'lunch';
    const dinnerQuery = 'dinner';

    // Fetch meals for breakfast, lunch, and dinner
    this.fetchMeals(breakfastQuery, this.breakfastMeals);
    this.fetchMeals(lunchQuery, this.lunchMeals);
    this.fetchMeals(dinnerQuery, this.dinnerMeals);
  }

  fetchMeals(query: string, mealArray: any[]) {
    const appId = '31aea67a'; // Replace with your actual App ID
    const appKey = '1dec2191a79e5f0b037756564455b124'; // Replace with your actual App Key
 

    const url = `https://api.edamam.com/api/food-database/v2/parser?ingr=${query}&app_id=${appId}&app_key=${appKey}`;

    this.http.get<EdamamResponse>(url)
      .subscribe(data => {
        mealArray.push(
          ...data.hints.filter(hint => hint.food.image) // Filter out meals without images
            .map(hint => ({
              label: hint.food.label,
              image: hint.food.image,
              calories: hint.food.nutrients.ENERC_KCAL || 0,
              protein: hint.food.nutrients.PROCNT || 0,
              fat: hint.food.nutrients.FAT || 0,
              carbs: hint.food.nutrients.CHOCDF || 0,
              // Add other nutrients as needed
            }))
        );
      }, error => {
        console.error('Error fetching meals:', error);
      });
  }
}

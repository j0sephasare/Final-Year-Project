import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface EdamamResponse {
  hints: Array<{
    food: {
      label: string;
      nutrients: {
        ENERC_KCAL?: number; // Calories (made optional)
        PROCNT?: number; // Protein (made optional)
        // Add other nutrients as needed
      };
    };
  }>;
}

@Component({
  selector: 'app-meal-plan',
  templateUrl: './meal-plan.page.html',
  styleUrls: ['./meal-plan.page.scss']
})
export class MealPlanPage implements OnInit {
  meals: any[] = []; // This will hold the processed meal data

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchNutritionalMeals();
  }

  fetchNutritionalMeals() {
    const appId = '31aea67a';
    const appKey = '1dec2191a79e5f0b037756564455b124';
    const query = 'apple'; // Replace with your actual query

    const options = {
      headers: {
        'X-RapidAPI-Key': '1078899fe4mshd46dc715175878dp1a3a95jsna40193cb83aa',
        'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
      }
    };

    const url = `https://api.edamam.com/api/food-database/v2/parser?ingr=${query}&app_id=${appId}&app_key=${appKey}`;

    this.http.get<EdamamResponse>(url, options)
      .subscribe(data => {
        this.meals = data.hints.map(hint => {
          const label = hint.food.label;
          const nutrients = hint.food.nutrients || {}; // Ensure nutrients object exists

          // Check if specific properties exist or provide default values
          const calories = nutrients.ENERC_KCAL || 0;
          const protein = nutrients.PROCNT || 0;

          return {
            label: label,
            image: this.getImageForFood(label), // Get image URL based on the food label
            calories: calories,
            protein: protein,
            // Add other nutrients as needed
          };
        });
      }, error => {
        console.error(error);
      });
  }

  private getImageForFood(foodLabel: string): string {
    const foodImages: { [key: string]: string } = {
      'apple': 'assets/apple.jpg', // Replace with an actual image path or URL
      // Add more mappings as needed
    };

    return foodImages[foodLabel.toLowerCase()] || 'assets/apple.jpg'; // Replace with a default image path or URL
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-macro-counter',
  templateUrl: './macro-counter.page.html',
  styleUrls: ['./macro-counter.page.scss'],
})
export class MacroCounterPage implements OnInit {
  // Properties to store user inputs and calculated values
  age: number = 0;
  gender: string = '';
  height: number = 0;
  weight: number = 0;
  activityLevel: string = '';
  goal: string = '';
  totalCalories: number = 0;
  macros = { proteins: 0, carbs: 0, fats: 0 }; // Object to store macro distribution

  constructor() { }

  ngOnInit() {
    // Initialize component
  }

  // Function to calculate macros
  calculateMacros(): void {
    // Calculate basal metabolic rate (BMR)
    let bmr;
    if (this.gender === 'male') {
      bmr = 10 * this.weight + 6.25 * this.height - 5 * this.age + 5;
    } else {
      bmr = 10 * this.weight + 6.25 * this.height - 5 * this.age - 161;
    }

    // Calculate total daily energy expenditure (TDEE) based on activity level
    const activityMultiplier = this.getActivityMultiplier();
    this.totalCalories = bmr * activityMultiplier;

    // Adjust total calories based on goal (lose or gain weight)
    if (this.goal === 'lose') {
      this.totalCalories *= 0.9; // 10% calorie deficit
    } else if (this.goal === 'gain') {
      this.totalCalories *= 1.1; // 10% calorie surplus
    }

    // Calculate macros distribution based on total calories
    this.macros.proteins = Math.round((this.totalCalories * 0.3) / 4); // 30% of calories from protein
    this.macros.carbs = Math.round((this.totalCalories * 0.4) / 4); // 40% of calories from carbs
    this.macros.fats = Math.round((this.totalCalories * 0.3) / 9); // 30% of calories from fats
  }

  // Private method to get activity multiplier based on activity level
  private getActivityMultiplier(): number {
    switch (this.activityLevel) {
      case 'sedentary': return 1.2;
      case 'light': return 1.375;
      case 'moderate': return 1.55;
      case 'active': return 1.725;
      case 'veryActive': return 1.9;
      default: return 1.2; // Default multiplier for sedentary activity level
    }
  }
}

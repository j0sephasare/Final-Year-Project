// recipe-search-response.model.ts
export interface Recipe {
    id: number;
    title: string;
    image: string;
    // ... other properties of the recipe
  }
  
  export interface RecipeSearchResponse {
    results: Recipe[];
    offset: number;
    number: number;
    totalResults: number;
  }
  
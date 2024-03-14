export interface SaveExerciseData {
  _id?: string;
  userId?: string;
  volume?: number;
  sets?: number;
  isEditMode?: boolean;
  description: string; 
  duration: string;          
  timestamp: string;  
  workoutTitle: string;
  exercises: {
    name: string;
    sets: number;
    reps: number;
  }[]; // An array to hold the details of each exercise.
  totalVolume?: number; // Add this if it is different from 'volume'
  totalSets?: number; // Add this if it is different from 'sets
}
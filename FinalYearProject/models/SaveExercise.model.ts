export interface SaveExerciseData {
    _id?: string;
    userId?: string;
    exerciseName: string;
    volume: number;
    sets: number;
    reps: number;
    isEditMode?: boolean; 
    description: string;
    duration: string;          // Duration of the workout
    timestamp: string;  
    workoutTitle: string;
  }
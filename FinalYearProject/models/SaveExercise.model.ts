export interface SaveExerciseData {
    _id?: string;
    userId?: string;
    exerciseName: string;
    volume: number;
    sets: number;
    reps: number;
    isEditMode?: boolean; 
  }
export interface ExerciseSet {
  setNumber: number;
  kg: number;
  reps: number;
}


export class Exercise {
  constructor(
    // Make id optional if it can be undefined
    public Name: string,
    public Description: string,
    public Difficulty: string,
    public id?: string, 
    public selected?: boolean,
    public kg?: number,
    public reps?: number,
    public setsCounter?: number,
  ) {}
}

export interface ExerciseData {
  exercises: Exercise[];
}

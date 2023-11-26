export interface ExerciseSet {
  setNumber: number;
  kg: number;
  reps: number;
}


export class Exercise {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public image: string,

    public difficulty: string,
    public selected?: boolean,
    public kg: number = 0,  // Add kg property
    public reps: number = 0,
    public calculatedVolume?: number,
    public sets?: ExerciseSet[],
   
    public setsCounter: number = 1,
    
  ) {}
}

export interface ExerciseData {
  exercises: Exercise[];
}

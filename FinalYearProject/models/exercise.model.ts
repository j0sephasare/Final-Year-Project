export class Exercise {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public image: string,
    public difficulty: string,
    public selected?: boolean
  ) {}
}

export interface ExerciseData {
  exercises: Exercise[];
}

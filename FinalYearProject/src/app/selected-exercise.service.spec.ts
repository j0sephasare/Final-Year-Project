import { TestBed } from '@angular/core/testing';

import { SelectedExerciseService } from './selected-exercise.service';

describe('SelectedExerciseService', () => {
  let service: SelectedExerciseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedExerciseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { BoxingExerciseService } from './boxing-exercise.service';

describe('BoxingExerciseService', () => {
  let service: BoxingExerciseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoxingExerciseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

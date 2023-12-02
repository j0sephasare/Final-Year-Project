import { TestBed } from '@angular/core/testing';

import { UserExerciseServiceService } from './user-exercise-service.service';

describe('UserExerciseServiceService', () => {
  let service: UserExerciseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserExerciseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

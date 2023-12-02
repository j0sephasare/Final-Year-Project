import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedExerciseListPage } from './saved-exercise-list.page';

describe('SavedExerciseListPage', () => {
  let component: SavedExerciseListPage;
  let fixture: ComponentFixture<SavedExerciseListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SavedExerciseListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

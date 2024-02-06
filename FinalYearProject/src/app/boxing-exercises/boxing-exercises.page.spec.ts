import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoxingExercisesPage } from './boxing-exercises.page';

describe('BoxingExercisesPage', () => {
  let component: BoxingExercisesPage;
  let fixture: ComponentFixture<BoxingExercisesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BoxingExercisesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinishWorkoutPage } from './finish-workout.page';

describe('FinishWorkoutPage', () => {
  let component: FinishWorkoutPage;
  let fixture: ComponentFixture<FinishWorkoutPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FinishWorkoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

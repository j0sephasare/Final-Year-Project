import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoxingWorkoutPage } from './boxing-workout.page';

describe('BoxingWorkoutPage', () => {
  let component: BoxingWorkoutPage;
  let fixture: ComponentFixture<BoxingWorkoutPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BoxingWorkoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

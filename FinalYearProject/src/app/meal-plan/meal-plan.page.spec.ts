import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MealPlanPage } from './meal-plan.page';

describe('MealPlanPage', () => {
  let component: MealPlanPage;
  let fixture: ComponentFixture<MealPlanPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MealPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

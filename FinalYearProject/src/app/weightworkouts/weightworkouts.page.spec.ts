import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeightworkoutsPage } from './weightworkouts.page';

describe('WeightworkoutsPage', () => {
  let component: WeightworkoutsPage;
  let fixture: ComponentFixture<WeightworkoutsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WeightworkoutsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

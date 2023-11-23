import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExercisesListPage } from './exercises-list.page';

describe('ExercisesListPage', () => {
  let component: ExercisesListPage;
  let fixture: ComponentFixture<ExercisesListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExercisesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilePageExercisesPage } from './profile-page-exercises.page';

describe('ProfilePageExercisesPage', () => {
  let component: ProfilePageExercisesPage;
  let fixture: ComponentFixture<ProfilePageExercisesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProfilePageExercisesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

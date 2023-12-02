import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalgymsPage } from './localgyms.page';

describe('LocalgymsPage', () => {
  let component: LocalgymsPage;
  let fixture: ComponentFixture<LocalgymsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LocalgymsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

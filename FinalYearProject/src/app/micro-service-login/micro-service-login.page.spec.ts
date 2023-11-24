import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MicroServiceLoginPage } from './micro-service-login.page';

describe('MicroServiceLoginPage', () => {
  let component: MicroServiceLoginPage;
  let fixture: ComponentFixture<MicroServiceLoginPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MicroServiceLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

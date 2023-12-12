import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RonaldoPage } from './ronaldo.page';

describe('RonaldoPage', () => {
  let component: RonaldoPage;
  let fixture: ComponentFixture<RonaldoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RonaldoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

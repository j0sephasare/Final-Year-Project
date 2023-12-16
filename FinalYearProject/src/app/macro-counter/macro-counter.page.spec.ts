import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MacroCounterPage } from './macro-counter.page';

describe('MacroCounterPage', () => {
  let component: MacroCounterPage;
  let fixture: ComponentFixture<MacroCounterPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MacroCounterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

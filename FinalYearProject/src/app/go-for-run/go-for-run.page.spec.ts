import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoForRunPage } from './go-for-run.page';

describe('GoForRunPage', () => {
  let component: GoForRunPage;
  let fixture: ComponentFixture<GoForRunPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GoForRunPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

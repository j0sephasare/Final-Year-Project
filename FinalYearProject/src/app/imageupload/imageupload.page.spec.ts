import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageuploadPage } from './imageupload.page';

describe('ImageuploadPage', () => {
  let component: ImageuploadPage;
  let fixture: ComponentFixture<ImageuploadPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ImageuploadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

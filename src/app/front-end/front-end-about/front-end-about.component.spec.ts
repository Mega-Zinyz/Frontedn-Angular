import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontEndAboutComponent } from './front-end-about.component';

describe('FrontEndAboutComponent', () => {
  let component: FrontEndAboutComponent;
  let fixture: ComponentFixture<FrontEndAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrontEndAboutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontEndAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

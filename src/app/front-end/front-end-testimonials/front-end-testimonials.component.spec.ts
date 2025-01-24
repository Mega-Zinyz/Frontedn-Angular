import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontEndTestimonialsComponent } from './front-end-testimonials.component';

describe('FrontEndTestimonialsComponent', () => {
  let component: FrontEndTestimonialsComponent;
  let fixture: ComponentFixture<FrontEndTestimonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrontEndTestimonialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontEndTestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontEndFaqComponent } from './front-end-faq.component';

describe('FrontEndFaqComponent', () => {
  let component: FrontEndFaqComponent;
  let fixture: ComponentFixture<FrontEndFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrontEndFaqComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontEndFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

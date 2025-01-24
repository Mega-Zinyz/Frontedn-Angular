import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontEndPricingComponent } from './front-end-pricing.component';

describe('FrontEndPricingComponent', () => {
  let component: FrontEndPricingComponent;
  let fixture: ComponentFixture<FrontEndPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrontEndPricingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontEndPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

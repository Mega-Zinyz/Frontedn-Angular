import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontEndFeaturedServicesComponent } from './front-end-featured-services.component';

describe('FrontEndFeaturedServicesComponent', () => {
  let component: FrontEndFeaturedServicesComponent;
  let fixture: ComponentFixture<FrontEndFeaturedServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrontEndFeaturedServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontEndFeaturedServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

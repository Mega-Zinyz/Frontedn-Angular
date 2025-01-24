import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontEndPortfolioDetailComponent } from './front-end-portfolio-detail.component';

describe('FrontEndPortfolioDetailComponent', () => {
  let component: FrontEndPortfolioDetailComponent;
  let fixture: ComponentFixture<FrontEndPortfolioDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrontEndPortfolioDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontEndPortfolioDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

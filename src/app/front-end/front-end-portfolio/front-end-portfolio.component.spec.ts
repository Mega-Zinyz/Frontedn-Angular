import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontEndPortfolioComponent } from './front-end-portfolio.component';

describe('FrontEndPortfolioComponent', () => {
  let component: FrontEndPortfolioComponent;
  let fixture: ComponentFixture<FrontEndPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrontEndPortfolioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontEndPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontEndDashboardComponent } from './front-end-dashboard.component';

describe('FrontEndDashboardComponent', () => {
  let component: FrontEndDashboardComponent;
  let fixture: ComponentFixture<FrontEndDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrontEndDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontEndDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

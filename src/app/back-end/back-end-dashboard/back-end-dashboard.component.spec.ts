import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackEndDashboardComponent } from './back-end-dashboard.component';

describe('BackEndDashboardComponent', () => {
  let component: BackEndDashboardComponent;
  let fixture: ComponentFixture<BackEndDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackEndDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackEndDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

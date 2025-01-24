import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackEndNavbarComponent } from './back-end-navbar.component';

describe('BackEndNavbarComponent', () => {
  let component: BackEndNavbarComponent;
  let fixture: ComponentFixture<BackEndNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackEndNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackEndNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

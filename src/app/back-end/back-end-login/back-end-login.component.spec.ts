import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackEndLoginComponent } from './back-end-login.component';

describe('BackEndLoginComponent', () => {
  let component: BackEndLoginComponent;
  let fixture: ComponentFixture<BackEndLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackEndLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackEndLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

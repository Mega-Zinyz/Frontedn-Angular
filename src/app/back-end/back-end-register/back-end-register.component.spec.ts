import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackEndRegisterComponent } from './back-end-register.component';

describe('BackEndRegisterComponent', () => {
  let component: BackEndRegisterComponent;
  let fixture: ComponentFixture<BackEndRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackEndRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackEndRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

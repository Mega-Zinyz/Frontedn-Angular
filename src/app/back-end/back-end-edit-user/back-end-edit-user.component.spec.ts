import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackEndEditUserComponent } from './back-end-edit-user.component';

describe('BackEndEditUserComponent', () => {
  let component: BackEndEditUserComponent;
  let fixture: ComponentFixture<BackEndEditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackEndEditUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackEndEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

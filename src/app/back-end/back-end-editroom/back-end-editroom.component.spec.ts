import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackEndEditRoomComponent } from './back-end-editroom.component';

describe('BackEndEditroomComponent', () => {
  let component: BackEndEditRoomComponent;
  let fixture: ComponentFixture<BackEndEditRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackEndEditRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackEndEditRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

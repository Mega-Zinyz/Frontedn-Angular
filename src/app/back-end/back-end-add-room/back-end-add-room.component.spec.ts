import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackEndAddRoomComponent } from './back-end-add-room.component';

describe('BackEndAddRoomComponent', () => {
  let component: BackEndAddRoomComponent;
  let fixture: ComponentFixture<BackEndAddRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackEndAddRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackEndAddRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

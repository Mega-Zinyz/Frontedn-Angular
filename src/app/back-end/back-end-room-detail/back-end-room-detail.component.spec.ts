import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackEndRoomDetailComponent } from './back-end-room-detail.component';

describe('BackEndRoomDetailComponent', () => {
  let component: BackEndRoomDetailComponent;
  let fixture: ComponentFixture<BackEndRoomDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackEndRoomDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackEndRoomDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

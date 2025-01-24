import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackEndRoomsComponent } from './back-end-rooms.component';

describe('BackEndRoomsComponent', () => {
  let component: BackEndRoomsComponent;
  let fixture: ComponentFixture<BackEndRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackEndRoomsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackEndRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

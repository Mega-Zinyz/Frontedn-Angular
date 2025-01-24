import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackEndIntentsComponent } from './back-end-intents.component';

describe('BackEndIntentsComponent', () => {
  let component: BackEndIntentsComponent;
  let fixture: ComponentFixture<BackEndIntentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackEndIntentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackEndIntentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackEndRasaControlComponent } from './back-end-rasa-control.component';

describe('BackEndRasaControlComponent', () => {
  let component: BackEndRasaControlComponent;
  let fixture: ComponentFixture<BackEndRasaControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackEndRasaControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackEndRasaControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackEndProfilComponent } from './back-end-profil.component';

describe('BackEndProfilComponent', () => {
  let component: BackEndProfilComponent;
  let fixture: ComponentFixture<BackEndProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackEndProfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackEndProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

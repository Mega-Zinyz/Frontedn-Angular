import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackEndHeaderComponent } from './back-end-header.component';

describe('BackEndHeaderComponent', () => {
  let component: BackEndHeaderComponent;
  let fixture: ComponentFixture<BackEndHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackEndHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackEndHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

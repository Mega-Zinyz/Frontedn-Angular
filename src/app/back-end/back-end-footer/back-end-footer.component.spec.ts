import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackEndFooterComponent } from './back-end-footer.component';

describe('BackEndFooterComponent', () => {
  let component: BackEndFooterComponent;
  let fixture: ComponentFixture<BackEndFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackEndFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackEndFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

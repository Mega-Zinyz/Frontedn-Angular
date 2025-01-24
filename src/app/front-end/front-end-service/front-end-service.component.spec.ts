import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontEndServiceComponent } from './front-end-service.component';

describe('FrontEndServiceComponent', () => {
  let component: FrontEndServiceComponent;
  let fixture: ComponentFixture<FrontEndServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrontEndServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontEndServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

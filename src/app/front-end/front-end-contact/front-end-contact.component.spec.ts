import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontEndContactComponent } from './front-end-contact.component';

describe('FrontEndContactComponent', () => {
  let component: FrontEndContactComponent;
  let fixture: ComponentFixture<FrontEndContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrontEndContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontEndContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

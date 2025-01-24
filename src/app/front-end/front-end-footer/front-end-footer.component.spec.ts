import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontEndFooterComponent } from './front-end-footer.component';

describe('FrontEndFooterComponent', () => {
  let component: FrontEndFooterComponent;
  let fixture: ComponentFixture<FrontEndFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrontEndFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontEndFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

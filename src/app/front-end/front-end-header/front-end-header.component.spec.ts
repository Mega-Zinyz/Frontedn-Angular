import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontEndHeaderComponent } from './front-end-header.component';

describe('FrontEndHeaderComponent', () => {
  let component: FrontEndHeaderComponent;
  let fixture: ComponentFixture<FrontEndHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrontEndHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontEndHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

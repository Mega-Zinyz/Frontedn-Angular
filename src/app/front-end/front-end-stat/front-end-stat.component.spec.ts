import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontEndStatComponent } from './front-end-stat.component';

describe('FrontEndStatComponent', () => {
  let component: FrontEndStatComponent;
  let fixture: ComponentFixture<FrontEndStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrontEndStatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontEndStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

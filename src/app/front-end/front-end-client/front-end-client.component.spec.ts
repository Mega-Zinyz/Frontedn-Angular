import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontEndClientComponent } from './front-end-client.component';

describe('FrontEndClientComponent', () => {
  let component: FrontEndClientComponent;
  let fixture: ComponentFixture<FrontEndClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrontEndClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontEndClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

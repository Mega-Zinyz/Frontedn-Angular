import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontEndHeroComponent } from './front-end-hero.component';

describe('FrontEndHeroComponent', () => {
  let component: FrontEndHeroComponent;
  let fixture: ComponentFixture<FrontEndHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrontEndHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontEndHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

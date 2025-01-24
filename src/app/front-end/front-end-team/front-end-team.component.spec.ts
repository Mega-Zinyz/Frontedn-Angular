import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontEndTeamComponent } from './front-end-team.component';

describe('FrontEndTeamComponent', () => {
  let component: FrontEndTeamComponent;
  let fixture: ComponentFixture<FrontEndTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrontEndTeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontEndTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontEndSkillComponent } from './front-end-skill.component';

describe('FrontEndSkillComponent', () => {
  let component: FrontEndSkillComponent;
  let fixture: ComponentFixture<FrontEndSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrontEndSkillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontEndSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

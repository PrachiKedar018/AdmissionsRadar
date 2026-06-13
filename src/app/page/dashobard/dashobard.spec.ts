import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashobard } from './dashobard';

describe('Dashobard', () => {
  let component: Dashobard;
  let fixture: ComponentFixture<Dashobard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashobard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dashobard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
